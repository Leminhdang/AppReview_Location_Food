/**
 * @format
 */
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Reanimated 2']);
import { AppRegistry } from 'react-native';
import App from './src/navigation/index';
import { name as appName } from './app.json';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";

AppRegistry.registerComponent(appName, () => App);

PushNotification.configure({

  onNotification: function (notification) {
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,
  requestPermissions: true,
});