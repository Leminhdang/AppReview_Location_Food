import React, {useState} from 'react';
import {View, Text, Image, StatusBar, ToastAndroid} from 'react-native';
import {COLOR} from '../../assets/color';
import {FormButton, TextInputCustom} from '../../components';
import styles from '../Login/style';
import {useFormik} from 'formik';
import axios from 'axios';
import {API_HOST, API_KEY} from '@env';
import Spinner from 'react-native-loading-spinner-overlay';
import {registerSchema} from '../../schema';
import FastImage from 'react-native-fast-image';

const initialValues = {
  email: '',
  password: '',
  passwordConfirmation: '',
};
const initialErrors = {
  email: true,
  password: true,
  passwordConfirmation: true,
};

const RegisterScreen = ({navigation}) => {
  const [spinner, setSpinner] = useState(false);

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
    initialErrors,
    validationSchema: registerSchema,
    onSubmit: val => {
      setSpinner(true);
      axios({
        method: 'POST',
        url: `${API_HOST}account/register`,
        timeout: 5000,
        data: val,
        headers: {
          Key: API_KEY,
        },
      })
        .then(function (response) {
          if (response.data.success) {
            setSpinner(false);
            ToastAndroid.show('Đăng ký thành công', ToastAndroid.SHORT);
            navigation.replace('Login');
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
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <Spinner
        visible={spinner}
        textContent={'Đang đăng ký...'}
        size="large"
        textStyle={{color: '#fff'}}
      />
      <View style={styles.imgContainer}>
        <FastImage
          source={require('../../assets/images/logo.png')}
          style={styles.img}
        />
      </View>
      <Text style={styles.title}>Đăng ký khoản của bạn</Text>
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
      <TextInputCustom
        placeholder="Nhập lại mật khẩu"
        name="passwordConfirmation"
        isPassword
        value={values.passwordConfirmation}
        {...{handleChange, handleBlur, errors, touched}}
      />
      <View style={{marginTop: 20}}>
        <FormButton title="Đăng ký" {...{isValid, handleSubmit}} />
      </View>
      <View style={styles.register}>
        <Text style={styles.registerLabel}>Đã có tài khoản ?</Text>
        <Text
          style={[styles.registerLabel, {color: COLOR.YELLOW}]}
          onPress={() => navigation.replace('Login')}>
          Đăng nhập ngay
        </Text>
      </View>
    </View>
  );
};

export default RegisterScreen;
