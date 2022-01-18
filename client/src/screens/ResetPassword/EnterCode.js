import React, {useEffect, useRef, useState} from 'react';
import {ToastAndroid} from 'react-native';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {COLOR} from '../../assets/color';
import {Countdown, HeaderComponent} from '../../components';
import {API_HOST, API_KEY} from '@env';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import axios from 'axios';

const CELL_COUNT = 6;
const EnterCode = ({navigation, route}) => {
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [spinner, setSpinner] = useState(false);
  const {id} = route.params.data;

  useEffect(() => {
    if (value.length === 6) {
      handleSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleSubmit = () => {
    setSpinner(true);
    axios({
      method: 'POST',
      url: `${API_HOST}account/verify-code`,
      timeout: 5000,
      data: {id, code: value},
      headers: {
        Key: API_KEY,
      },
    }).then(response => {
      if (response.data.success) {
        setSpinner(false);
        navigation.navigate('ResetPassword', {id: id});
      } else {
        setSpinner(false);
        ToastAndroid.show(response.data.msg, ToastAndroid.SHORT);
      }
    });
  };

  return (
    <View style={styles.container}>
      <HeaderComponent left title="Quên mật khẩu" {...{navigation}} />
      <Spinner
        visible={spinner}
        textContent={'Đang kiểm tra...'}
        size="large"
        textStyle={{color: '#fff'}}
      />
      <View style={styles.body}>
        <Text style={styles.title}>Nhập mã OTP được gửi về email của bạn</Text>
        <CodeField
          ref={ref}
          {...props}
          // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          textContentType="oneTimeCode"
          autoCapitalize="characters"
          renderCell={({index, symbol, isFocused}) => (
            <View key={index} style={styles.inputContainer}>
              <Text
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
              <View style={styles.underline} />
            </View>
          )}
        />
        <Countdown />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
  },
  body: {
    alignItems: 'center',
    marginTop: 32,
  },
  title: {
    fontSize: 18,
    fontFamily: 'BeVietnam-Bold',
  },
  root: {flex: 1, padding: 20},
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 20,
    fontFamily: 'BeVietnam-Medium',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
  underline: {
    width: 30,
    backgroundColor: COLOR.BLACK,
    height: 1,
  },
  inputContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
});

export default EnterCode;
