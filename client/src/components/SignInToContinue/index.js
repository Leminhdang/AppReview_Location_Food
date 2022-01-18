import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {COLOR} from '../../assets/color';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

const index = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={{width: 250, height: 174}}>
        <FastImage
          style={{width: '100%', height: '100%', resizeMode: 'contain'}}
          source={require('../../assets/images/logo.png')}
        />
      </View>

      <TouchableOpacity
        style={styles.buttonLogin}
        activeOpacity={1}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.textLogin}> Đăng nhập ngay</Text>
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(index);

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.WHITE,
    flex: 1,
    height: '100%',
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLogin: {
    flex: 1,
    marginTop: 20,
    width: '70%',
    maxHeight: 50,
    backgroundColor: COLOR.YELLOW,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  textLogin: {
    fontSize: 18,
    fontFamily: 'BeVietnam-Medium',
    marginVertical: 10,
  },
});
