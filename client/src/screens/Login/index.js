import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import styles from './style';
import {useFormik} from 'formik';
import TextInputCustom from '../../components/TextInput';
import {loginSchema} from '../../schema';
import {FormButton} from '../../components';

import {COLOR} from '../../assets/color';
import axios from 'axios';
import {API_HOST, API_KEY} from '@env';
import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from '../../Provider/AuthProvider';
import FastImage from 'react-native-fast-image';
import messaging from '@react-native-firebase/messaging';

GoogleSignin.configure({
  webClientId:
    '847313454303-2s1s97t6dp3o3ouvq57vm3b7lgjflu7j.apps.googleusercontent.com',
});

const initialValues = {
  email: '',
  password: '',
};
const initialErrors = {
  email: true,
  password: true,
};

const LoginScreen = ({navigation, route}) => {
  const {user, dispatch} = useContext(AuthContext);
  const {
    handleChange,
    handleBlur,
    setFieldValue,
    isValid,
    handleSubmit,
    values,
    errors,
    touched,
  } = useFormik({
    initialValues,
    validationSchema: loginSchema,
    initialErrors,
    onSubmit: async val => {
      setSpinner(true);
      axios({
        method: 'POST',
        url: `${API_HOST}account/login`,
        timeout: 5000,
        data: val,
        headers: {
          Key: API_KEY,
        },
      })
        .then(function (response) {
          if (response.data.success) {
            messaging()
              .subscribeToTopic(`${response.data.data.id}`)
              .then(() => console.log('Subscribed to topic!'));
            console.log(response.data.data);
            dispatch({type: 'LOGIN', payload: response.data.data});
            setSpinner(false);
            ToastAndroid.show('Đăng nhập thành công', ToastAndroid.SHORT);
            navigation.goBack();
          } else {
            setSpinner(false);
            ToastAndroid.show(response.data.msg, ToastAndroid.SHORT);
          }
        })
        .catch(function (error) {
          setSpinner(false);
          ToastAndroid.show('Vui lòng thử lại sau', ToastAndroid.SHORT);
          console.log(error);
        });
    },
  });
  const [spinner, setSpinner] = useState(false);

  const createUserProfile = async (uid, fullname, image_url, method) => {
    axios({
      method: 'POST',
      url: `${API_HOST}account/social-auth`,
      timeout: 5000,
      data: {uid, fullname, image_url, method},
      headers: {
        Key: API_KEY,
      },
    })
      .then(response => {
        setSpinner(false);
        if (response.data.success) {
          messaging()
            .subscribeToTopic(`${response.data.data.id}`)
            .then(() => console.log('Subscribed to topic!'));
          dispatch({type: 'LOGIN', payload: response.data.data});
          navigation.goBack();
        }
      })
      .catch(function (error) {
        setSpinner(false);
        ToastAndroid.show('Vui lòng thử lại sau', ToastAndroid.SHORT);
      });
  };

  const onFacebookButtonPress = async () => {
    setSpinner(true);
    await LoginManager.logInWithPermissions(['public_profile', 'email'])
      .then(res => {
        if (res.isCancelled) {
          setSpinner(false);
          console.log('User cancelled the login process');
          return;
        }
      })
      .catch(err => {
        setSpinner(false);
        ToastAndroid.show('Vui lòng thử lại sau', ToastAndroid.SHORT);
        console.log(err);
      });
    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );
    const user = await auth().signInWithCredential(facebookCredential);
    if (user) {
      const {displayName, uid, photoURL} = user.user;
      createUserProfile(uid, displayName, photoURL, 'facebook');
    } else {
      setSpinner(false);
      ToastAndroid.show('Đăng nhập thất bại', ToastAndroid.SHORT);
    }
  };
  //

  const onGoogleButtonPress = async () => {
    setSpinner(true);
    try {
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const user = await auth().signInWithCredential(googleCredential);
      if (user) {
        const {displayName, uid, photoURL} = user.user;
        createUserProfile(uid, displayName, photoURL, 'google');
      } else {
        setSpinner(false);
        ToastAndroid.show('Đăng nhập thất bại', ToastAndroid.SHORT);
      }
    } catch (error) {
      setSpinner(false);
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <Spinner
        visible={spinner}
        textContent={'Đang đăng nhập...'}
        size="large"
        textStyle={{color: '#fff'}}
      />
      <View style={styles.imgContainer}>
        <FastImage
          source={require('../../assets/images/logo.png')}
          style={styles.img}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
      <Text style={styles.title}>Đăng nhập với tài khoản của bạn</Text>
      <TextInputCustom
        placeholder="Email"
        name="email"
        value={values.email}
        {...{handleChange, handleBlur, errors, touched, setFieldValue}}
      />
      <TextInputCustom
        placeholder="Mật khẩu"
        name="password"
        isPassword
        value={values.password}
        {...{handleChange, handleBlur, errors, touched}}
      />
      <View style={styles.forgotPasswordContainer}>
        <Text
          style={[styles.text, styles.forgotPassword]}
          onPress={() => navigation.navigate('EnterEmail')}>
          Quên mật khẩu ?
        </Text>
      </View>
      <FormButton title="Đăng nhập" {...{isValid, handleSubmit}} />
      <Text style={styles.or}>Hoặc</Text>
      <View style={styles.socialAuth}>
        <TouchableOpacity
          style={styles.facebookButton}
          activeOpacity={1}
          onPress={onFacebookButtonPress}>
          <FastImage
            source={require('../../assets/images/fb.png')}
            style={styles.logo}
          />
          <Text style={[styles.label, styles.textColor]}>Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.googleButton}
          activeOpacity={1}
          onPress={onGoogleButtonPress}>
          <FastImage
            source={require('../../assets/images/gg.png')}
            style={styles.logoGG}
          />
          <Text style={styles.label}>Google</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.register}>
        <Text style={styles.registerLabel}>Chưa có tài khoản ?</Text>
        <Text
          style={[styles.registerLabel, {color: COLOR.YELLOW}]}
          onPress={() => navigation.replace('Register')}>
          Đăng ký ngay
        </Text>
      </View>
    </View>
  );
};

export default LoginScreen;
