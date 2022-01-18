import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import React, {useState} from 'react';
import {COLOR} from '../../../assets/color';
import {useNavigation} from '@react-navigation/native';

const BottomSheet = ({actionSheetRef, closeBottomSheet, closeDialog}) => {
  const navigation = useNavigation();
  return (
    <ActionSheet
      ref={actionSheetRef}
      containerStyle={styles.bottomSheetContainer}
      overlayColor="rgba(0, 0, 0, 0.7)"
      elevation={0}
      defaultOverlayOpacity={1}>
      <View style={styles.body}>
        <TouchableOpacity
          style={{width: '100%'}}
          onPress={() => navigation.navigate('TermsService')}>
          <Text style={[styles.label, styles.line]}>Điều khoản và dịch vụ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{width: '100%'}}
          onPress={() => navigation.navigate('ChangePassword')}>
          <Text style={[styles.label]}>Đổi mật khẩu</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[styles.body, {marginTop: 12}]}
        onPress={() => {
          closeDialog();
          closeBottomSheet();
        }}>
        <Text style={[styles.label]}>Đăng xuất</Text>
      </TouchableOpacity>
    </ActionSheet>
  );
};
const styles = StyleSheet.create({
  bottomSheetContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 16,
    paddingHorizontal: 32,
  },
  label: {
    fontFamily: 'BeVietnam-Medium',
    fontSize: 16,
    paddingVertical: 5,
  },
  color: {
    color: 'red',
  },
  bottomSheetContainer: {
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
  },
  body: {
    backgroundColor: COLOR.WHITE,
    borderRadius: 12,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontFamily: 'BeVietnam-Medium',
    lineHeight: 60,
    textAlign: 'center',
  },
  line: {
    width: '100%',
    borderBottomWidth: 0.5,
    borderBottomColor: COLOR.GREY,
  },
});

export default React.memo(BottomSheet);
