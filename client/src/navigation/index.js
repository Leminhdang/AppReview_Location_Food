import React, { useEffect, useCallback } from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import BottomTab from './BottomTab';
import {
  LoginScreen,
  OnboardingScreen,
  PostsScreen,
  ChangePasswordScreen,
  NewAddress,
  PostDetailScreen,
  Mission,
  Report,
  SearchLocationScreen,
  Member,
  VoucherDetails,
  VoucherWallet,
  VoucherWalletDetails,
  TermsService,
  HomeSearch,
  EditProfile,
  LocationDetails,
  RegisterScreen,
  EnterEmail,
  EnterCode,
  ResetPassword,
  SplashScreen,
  Locations,
  ProfileOtherScreen,
  CategoryHashTagScreen,
  EditPost,
  Following,
} from '../screens';

import AuthContextProvider from '../Provider/AuthProvider';
import ImageFullScreen from '../screens/PostDetails/components/ImageFullScreen';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
const Stack = createNativeStackNavigator();

const IndexRouter = () => {
  const onMessageReceived = async message => {
    // console.log(message);
    const { type, sender, post_id } = message.data;
    if (type === 'comment') {
      PushNotification.createChannel({
        channelId: 'comment', // (required)
        channelName: 'Bình luận', // (required)
      });
      PushNotification.localNotification({
        channelId: 'comment',
        message: `${sender} đã bình luận về bài viết của bạn`,
        title: 'Thông báo',
      });
    }
    if (type === 'like') {
      PushNotification.createChannel({
        channelId: 'like', // (required)
        channelName: 'Yêu thích', // (required)
      });
      PushNotification.localNotification({
        channelId: 'like',
        message: `${sender} đã thích bài viết của bạn`,
        title: 'Thông báo',
        // userInfo: {
        //   user_id: sender_id,
        //   post_id
        // }
      });
    }
    if (type === 'report') {
      PushNotification.createChannel({
        channelId: 'report', // (required)
        channelName: 'Báo cáo', // (required)
      });
      PushNotification.localNotification({
        channelId: 'report',
        message: `${sender} đã báo cáo bài viết của bạn`,
        title: 'Thông báo',
      });
    }
  };

  useEffect(() => {
    messaging().onMessage(onMessageReceived);
    messaging().setBackgroundMessageHandler(onMessageReceived);
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification:'
      );
      // navigation.navigate(remoteMessage.data.type);
    });
    messaging().getInitialNotification(remoteMessage => {
      console.log(remoteMessage);
    })
  }, []);
  return (
    <AuthContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="SplashScreen">
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
          <Stack.Screen name="Bottom" component={BottomTab} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Posts" component={PostsScreen} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen
            name="ProfileOtherScreen"
            component={ProfileOtherScreen}
          />
          <Stack.Screen name="EditPost" component={EditPost} />
          <Stack.Screen name="Following" component={Following} />
          <Stack.Screen
            name="CategoryHashTagScreen"
            component={CategoryHashTagScreen}
          />
          <Stack.Screen name="TermsService" component={TermsService} />
          <Stack.Screen name="PostDetailScreen" component={PostDetailScreen} />
          <Stack.Screen name="VoucherWallet" component={VoucherWallet} />
          <Stack.Screen name="Member" component={Member} />
          <Stack.Screen name="VoucherDetails" component={VoucherDetails} />
          <Stack.Screen name="Locations" component={Locations} />
          <Stack.Screen
            name="VoucherWalletDetails"
            component={VoucherWalletDetails}
          />
          <Stack.Screen
            name="SearchLocationScreen"
            component={SearchLocationScreen}
          />
          <Stack.Screen name="NewAddress" component={NewAddress} />
          <Stack.Screen name="Mission" component={Mission} />
          <Stack.Screen name="Report" component={Report} />
          <Stack.Screen
            name="ChangePassword"
            component={ChangePasswordScreen}
          />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="HomeSearch" component={HomeSearch} />
          <Stack.Screen name="LocationDetails" component={LocationDetails} />
          <Stack.Screen name="EnterEmail" component={EnterEmail} />
          <Stack.Screen name="EnterCode" component={EnterCode} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
          <Stack.Screen name="ImageFullScreen" component={ImageFullScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContextProvider>
  );
};

export default IndexRouter;
