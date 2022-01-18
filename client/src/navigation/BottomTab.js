import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppState, Platform, View } from 'react-native';

import {
  HomeScreen,
  NotificationScreen,
  ProfileScreen,
  VideoScreen,
  EmptyScreen,
  PostsScreen,
} from '../screens';
import { COLOR } from '../assets/color';
import { windowWidth } from '../components';
import Feather from 'react-native-vector-icons/Feather';
import IonIcon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const BottomTab = props => {
  const data = useRef(props.route.params?.token);
  const heightBottom = Platform.OS === 'ios' ? 75 : 60;

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLOR.ORANGE,
        tabBarInactiveTintColor: COLOR.GREY,
        showLabel: false,
        tabBarStyle: {
          height: heightBottom,
          width: windowWidth,
          backgroundColor: COLOR.WHITE,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
        tabBarLabel: () => {
          return null;
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <IonIcon name="home-outline" size={25} color={color} />
          ),
        }}
        initialParams={{ token: data }}
      />
      <Tab.Screen
        name="Video"
        component={VideoScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name={'tv'} size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <View
              style={{
                backgroundColor: COLOR.ORANGE,
                width: 40,
                height: 40,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Feather name="plus" size={25} color="#fff" />
            </View>
          ),
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <IonIcon name={'notifications-outline'} color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <IonIcon name="person-outline" color={color} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
