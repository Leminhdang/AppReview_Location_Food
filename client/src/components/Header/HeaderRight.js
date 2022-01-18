import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {COLOR} from '../../assets/color';
const HeaderRight = props => {
  const {type, label, navigation, openBottomSheet, onPress} = props;
  return (
    <View style={styles.container}>
      {type === 'menu' ? (
        <Feather name="more-vertical" size={25} onPress={openBottomSheet} />
      ) : (
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={1}
          style={[
            styles.button,
            type === true ? styles.enable : styles.disable,
          ]}>
          <Text style={{fontFamily: 'BeVietnam-Medium', paddingHorizontal: 8}}>
            {label}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '30%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  button: {
    height: 25,
    width: 'auto',
    paddingHorizontal: 8,
    borderRadius: 5,
    justifyContent: 'center',
  },
  enable: {
    backgroundColor: COLOR.YELLOW,
  },
  disable: {
    backgroundColor: COLOR.GREY,
  },
});

export default React.memo(HeaderRight);
