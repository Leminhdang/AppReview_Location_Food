import React, {useContext} from 'react';
import {View, Text, Modal, StyleSheet, TouchableOpacity} from 'react-native';
import {COLOR} from '../../assets/color';
import {AuthContext} from '../../Provider/AuthProvider';
import messaging from '@react-native-firebase/messaging';

const LogoutDialog = ({dialogVisible, closeDialog, closeBottomSheet}) => {
  const {user, dispatch} = useContext(AuthContext);
  return (
    <Modal transparent visible={dialogVisible} animationType="fade">
      <View style={styles.container}>
        <View style={styles.modal}>
          <Text style={styles.content}>Bạn có muốn đăng xuất</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.btn, {borderRightWidth: 0.25}]}
              activeOpacity={0.7}
              onPress={async () => {
                dispatch({type: 'LOGOUT'});
                messaging()
                  .unsubscribeFromTopic(`${user?.id}`)
                  .then(() => console.log('Unsubscribed fom the topic!'));
                closeDialog();
                closeBottomSheet();
              }}>
              <Text style={styles.label}>Có</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn, {borderLeftWidth: 0.25}]}
              onPress={() => {
                closeDialog();
                closeBottomSheet();
              }}
              activeOpacity={0.7}>
              <Text style={styles.label}>Không</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: '5%',
  },
  modal: {
    backgroundColor: COLOR.WHITE,
    height: '15%',
    borderRadius: 10,
    alignItems: 'center',
  },
  content: {
    fontSize: 18,
    textAlignVertical: 'center',
    fontFamily: 'BeVietnam-Medium',
    flex: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    flex: 1,
    borderColor: '#000',
    borderWidth: 0.5,
    width: '100%',
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontFamily: 'BeVietnam-Medium',
    fontSize: 14,
  },
});

export default React.memo(LogoutDialog);
