import axios from 'axios';
import {useFormik} from 'formik';
import React, {useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  ToastAndroid,
  KeyboardAvoidingView,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {COLOR} from '../../assets/color';
import {resetPasswordSchema} from '../../schema';
import {API_HOST, API_KEY} from '@env';
import {FormButton, HeaderComponent, TextInputCustom} from '../../components';

const initialValues = {
  password: '',
  passwordConfirmation: '',
};
const initialErrors = {
  password: true,
  passwordConfirmation: true,
};
const ResetPassword = ({navigation, route}) => {
  const {id} = route.params;
  const {
    handleChange,
    handleBlur,
    isValid,
    handleSubmit,
    values,
    errors,
    touched,
  } = useFormik({
    initialValues,
    initialErrors,
    validationSchema: resetPasswordSchema,
    onSubmit: val => {
      axios({
        method: 'POST',
        url: `${API_HOST}account/reset-password`,
        timeout: 5000,
        data: {id: id, password: val.password},
        headers: {
          Key: API_KEY,
        },
      })
        .then(function (response) {
          if (response.data.success) {
            ToastAndroid.show(response.data.msg, ToastAndroid.SHORT);
            navigation.replace('Login');
          } else {
            ToastAndroid.show(response.data.msg, ToastAndroid.SHORT);
          }
        })
        .catch(function (error) {
          ToastAndroid.show('Vui lòng thử lại sau', ToastAndroid.SHORT);
          console.log(error);
        });
    },
  });

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar hidden={true} />
      <HeaderComponent title="Đổi mật khẩu" left {...{navigation}} />
      <View style={styles.form}>
        <Text style={styles.title}>Thay đổi mật khẩu</Text>
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
          <FormButton title="Lưu thay đổi" {...{isValid, handleSubmit}} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
  },
  title: {
    fontFamily: 'BeVietnam-Bold',
    fontSize: 21,
    width: '100%',
    textAlign: 'center',
    marginBottom: 16,
    marginTop: 50,
  },
  or: {
    fontFamily: 'BeVietnam-Medium',
    width: '100%',
    textAlign: 'center',
    marginVertical: 16,
    fontSize: 16,
  },
  socialAuth: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  facebookButton: {
    backgroundColor: '#4a6da7',
    flexDirection: 'row',
    width: '40%',
    maxHeight: 50,
    borderRadius: 8,
    paddingBottom: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 3,
  },
  label: {
    fontFamily: 'BeVietnam-Medium',
    fontSize: 16,
    marginVertical: 10,
    marginRight: 3,
  },
  logoGG: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  googleButton: {
    flexDirection: 'row',
    width: '40%',
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 2,
    borderColor: COLOR.BLACK,
  },
  textColor: {
    color: COLOR.WHITE,
  },
  forgotPasswordContainer: {
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 20,
  },
  checkboxContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  forgotPassword: {
    flex: 1,
    textAlign: 'right',
  },
  text: {
    marginLeft: 8,
    fontFamily: 'BeVietnam-Medium',
  },
  form: {
    paddingHorizontal: 16,
  },
});

export default ResetPassword;
