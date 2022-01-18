import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {windowHeight, windowWidth} from '../../components';
import {HeaderComponent} from '../../components';
import {Avatar, Button, Tab, TabView} from 'react-native-elements';
import {COLOR} from '../../assets/color';
import TabLayout from './components/TabLayout';

const Index = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLOR.WHITE}}>
      <View>
        <HeaderComponent title="Ví Voucher" left={true} right={false} />
      </View>
      <View style={{flex: 8, backgroundColor: COLOR.WHITE}}>
        <TabLayout />
      </View>
    </SafeAreaView>
  );
};

export default Index;
