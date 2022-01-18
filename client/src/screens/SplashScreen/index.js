import React, {useContext, useEffect} from 'react';
import {Image, View} from 'react-native';
import styles from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FastImage from 'react-native-fast-image';


const Index = ({navigation}) => {

  useEffect(() => {
    const directionalNavigation = async () => {
      const check = await AsyncStorage.getItem('checkOnboardingScreen');
      setTimeout(() => {
        if (check === null) {
          navigation.replace('OnboardingScreen');
        } else {
          navigation.replace('Bottom');
        }
      }, 2000);
    };
    directionalNavigation();
    return () => clearTimeout();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{width: 250, height: 174}}>
        <FastImage
          style={styles.img}
          source={require('../../assets/images/logo.png')}></FastImage>
      </View>
    </View>
  );
};

export default Index;
