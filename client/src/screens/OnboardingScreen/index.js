import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Onboarding from 'react-native-onboarding-swiper';
import {windowHeight, windowWidth} from '../../components';

const Dots = ({selected}) => {
  let backgroundColor;
  backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';

  return (
    <View
      style={[
        styles.dots,
        {
          backgroundColor: backgroundColor,
        },
      ]}
    />
  );
};

const Skip = ({...props}) => (
  <TouchableOpacity style={styles.button} {...props}>
    <Text style={styles.text}>Bỏ qua</Text>
  </TouchableOpacity>
);

const Next = ({...props}) => (
  <TouchableOpacity style={styles.button} {...props}>
    <Text style={styles.text}>Tiếp</Text>
  </TouchableOpacity>
);

const Done = ({...props}) => (
  <TouchableOpacity style={styles.button} {...props}>
    <Text style={styles.text}>Xong</Text>
  </TouchableOpacity>
);

const OnboardingScreen = ({navigation}) => {
  const saveStatusOnboarding = async () => {
    try {
      await AsyncStorage.setItem('checkOnboardingScreen', 'success');
    } catch (e) {
      console.log('Save status failed: ' + e.message);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />
      <Onboarding
        SkipButtonComponent={Skip}
        NextButtonComponent={Next}
        DoneButtonComponent={Done}
        DotComponent={Dots}
        onSkip={() => {
          saveStatusOnboarding();
          navigation.replace('Bottom');
        }}
        onDone={() => {
          saveStatusOnboarding();
          navigation.replace('Bottom');
        }}
        pages={[
          {
            backgroundColor: '#F3EFE6',
            image: (
              <ImageBackground
                source={require('../../assets/images/onboarding-img1.png')}
                style={styles.image}
              />
            ),
            title: '',
            subtitle: '',
          },
          {
            backgroundColor: '#C9E165',
            image: (
              <ImageBackground
                source={require('../../assets/images/onboarding-img2.png')}
                style={styles.image}
              />
            ),
            title: '',
            subtitle: '',
          },
          {
            backgroundColor: '#9FDBD0',
            image: (
              <ImageBackground
                source={require('../../assets/images/onboarding-img3.png')}
                style={styles.image}
              />
            ),
            title: '',
            subtitle: '',
          },
        ]}
      />
    </SafeAreaView>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dots: {
    width: 6,
    height: 6,
    marginHorizontal: 3,
  },
  button: {
    marginHorizontal: 10,
  },
  text: {
    fontSize: 16,
    fontFamily: 'BeVietnamPro-Medium',
  },
  image: {
    width: '100%',
    height: windowHeight,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
