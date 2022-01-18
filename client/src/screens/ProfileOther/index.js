import React, {
  useState,
  createRef,
  useLayoutEffect,
  useEffect,
  useRef,
  useContext,
} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ToastAndroid,
  Image,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  HeaderComponent,
  LogoutDialog,
  SignInToContinue,
} from '../../components';

import styles from './style';

import HeaderProfile from './components/Header';
import TabLayout from './components/TabLayout';
const ProfileOtherScreen = ({navigation, route}) => {
  const {user_id} = route.params;

  return (
    <SafeAreaView style={styles.container}>
      {user_id ? (
        <View style={styles.container}>
          <HeaderComponent
            left={true}
            title="Trang cá nhân"
            {...{navigation}}
          />
          <View style={{flex: 1, paddingTop: 16}}>
            <HeaderProfile {...{user_id}} />
            <TabLayout {...{user_id}} />
          </View>
        </View>
      ) : (
        <SignInToContinue />
      )}
    </SafeAreaView>
  );
};
export default ProfileOtherScreen;
