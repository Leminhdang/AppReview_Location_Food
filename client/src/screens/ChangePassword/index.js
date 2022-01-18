import React, {useEffect, useMemo, useRef} from 'react';
import {ToastAndroid, View} from 'react-native';
import {COLOR} from '../../assets/color';
import {FormButton, HeaderComponent, TextInputCustom} from '../../components';
import {useFormik} from 'formik';
import {changePasswordSchema} from '../../schema';
import axios from 'axios';
import {API_HOST, API_KEY} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialValues = {
  oldPassword: '',
  password: '',
  passwordConfirmation: '',
};
const initialErrors = {
  oldPassword: true,
  password: true,
  passwordConfirmation: true,
};

const ChangePasswordScreen = ({navigation}) => {
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
    validationSchema: changePasswordSchema,
    initialErrors,
    onSubmit: val => onSubmit(val),
  });

  const getMyId = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('data');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // read error
    }
  };

  const onSubmit = async val => {
    let data = await getMyId();
    axios({
      method: 'POST',
      url: `${API_HOST}account/change-password`,
      timeout: 5000,
      data: {
        id: data.id,
        oldPassword: val.oldPassword,
        newPassword: val.password,
      },
      headers: {
        Authorization: 'Bearer ' + data.token,
        Key: API_KEY,
      },
    })
      .then(response => {
        if (response.data.success) {
          ToastAndroid.show('Mật khẩu đã được thay đổi', ToastAndroid.SHORT);
          navigation.goBack();
        } else {
          ToastAndroid.show(response.data.msg, ToastAndroid.SHORT);
        }
      })
      .catch(error => {
        ToastAndroid.show('Vui lòng thử lại sau', ToastAndroid.SHORT);
        console.log(error);
      });
  };

  return (
    <View
      style={{
        backgroundColor: COLOR.WHITE,
        flex: 1,
      }}>
      <HeaderComponent title="Đổi mật khẩu" left {...{navigation}} />
      <View style={{paddingHorizontal: 16}}>
        <TextInputCustom
          placeholder="Mật khẩu cũ"
          name="oldPassword"
          isPassword
          value={values.oldPassword}
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
          <FormButton title="Lưu thay đổi" {...{isValid, handleSubmit}} />
        </View>
      </View>
    </View>
  );
};

export default ChangePasswordScreen;
