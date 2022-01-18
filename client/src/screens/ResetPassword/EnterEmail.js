import React, {useRef, useState} from 'react';
import {View, Text, StyleSheet, TextInput, ToastAndroid} from 'react-native';
import {COLOR} from '../../assets/color';
import {FormButton, HeaderComponent} from '../../components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import {API_KEY, API_HOST} from '@env';
import Spinner from 'react-native-loading-spinner-overlay';

const EnterEmail = ({navigation}) => {
  const isValid = useRef();
  const [spinner, setSpinner] = useState(false);
  const [email, setEmail] = useState('');
  const validate = text => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text.trim()) === false) {
      setEmail(text);
      isValid.current = false;
    } else {
      setEmail(text);
      isValid.current = true;
    }
  };

  const handleSubmit = async () => {
    setSpinner(true);
    try {
      const result = await axios({
        method: 'POST',
        url: `${API_HOST}account/send-email`,
        timeout: 5000,
        data: {email},
        headers: {
          Key: API_KEY,
        },
      });
      if (result.data.success) {
        setSpinner(false);
        ToastAndroid.show(result.data.msg, ToastAndroid.SHORT);
        navigation.navigate('EnterCode', {data: result.data.data});
      } else {
        setSpinner(false);
        ToastAndroid.show(result.data.msg, ToastAndroid.SHORT);
      }
    } catch (error) {
      setSpinner(false);
      ToastAndroid.show('Vui lòng thử lại sau', ToastAndroid.SHORT);
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Spinner
        visible={spinner}
        textContent={'Đang gửi mã...'}
        size="large"
        textStyle={{color: '#fff'}}
      />
      <HeaderComponent title="Nhập email của bạn" left {...{navigation}} />
      <View style={styles.inputContainer}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name="email-outline" size={25} />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Nhập email của bạn"
          autoCapitalize="none"
          value={email}
          onChangeText={text => validate(text)}
        />
      </View>
      {isValid.current === false && email !== '' && (
        <Text style={styles.error}>Địa chỉ email không hợp lệ</Text>
      )}
      {email === '' && isValid.current === false && (
        <Text style={styles.error}>Vui lòng nhập thông tin</Text>
      )}
      <FormButton
        title="Gửi mã xác nhận về email"
        {...{handleSubmit}}
        isValid={isValid.current}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.WHITE,
    flex: 1,
  },
  input: {
    width: '80%',
    fontFamily: 'BeVietnam-Medium',
    fontSize: 16,
  },
  iconContainer: {
    alignItems: 'center',
    width: '10%',
  },
  inputContainer: {
    borderRadius: 5,
    borderColor: COLOR.BLACK,
    paddingHorizontal: 8,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    maxHeight: 50,
    marginTop: 16,
    marginHorizontal: 16,
  },
  error: {
    color: 'red',
    fontFamily: 'BeVietnam-Regular',
    marginHorizontal: 16,
    fontSize: 14,
  },
});

export default EnterEmail;
