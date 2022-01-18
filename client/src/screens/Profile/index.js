import React, {useState, createRef, useContext} from 'react';
import {View, SafeAreaView} from 'react-native';
import {
  HeaderComponent,
  LogoutDialog,
  SignInToContinue,
} from '../../components';
import styles from './style';
import HeaderProfile from './components/Header';
import BottomSheet from './components/BottomSheet';
import TabLayout from './components/TabLayout';
import {AuthContext} from '../../Provider/AuthProvider';

const actionSheetRef = createRef();
const ProfileScreen = ({navigation}) => {
  const [dialogVisible, setDialogVisible] = useState(false);
  const openBottomSheet = () => {
    actionSheetRef.current?.setModalVisible();
  };
  const closeBottomSheet = () => {
    actionSheetRef.current?.hide();
  };

  const closeDialog = () => setDialogVisible(!dialogVisible);

  const {user} = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container}>
      {user ? (
        <View style={styles.container}>
          <HeaderComponent
            title="Trang cá nhân"
            type={'menu'}
            {...{openBottomSheet}}
            {...{navigation}}
          />
          <View style={{flex: 1, paddingTop: 16}}>
            <HeaderProfile />
            <TabLayout />
            <BottomSheet {...{closeBottomSheet, actionSheetRef, closeDialog}} />
            <LogoutDialog {...{dialogVisible, closeDialog, closeBottomSheet}} />
          </View>
        </View>
      ) : (
        <SignInToContinue />
      )}
    </SafeAreaView>
  );
};
export default ProfileScreen;
