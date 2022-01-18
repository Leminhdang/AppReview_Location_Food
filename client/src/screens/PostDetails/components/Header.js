import React, { useEffect, useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { COLOR } from '../../../assets/color';
import { formatDate } from '../../../helpers/formatDate';
import axios from 'axios';
import { API_HOST, API_KEY } from '@env';
import FastImage from 'react-native-fast-image';
import { AuthContext } from '../../../Provider/AuthProvider';

const Header = ({ user_id, openBottomSheet, detail }) => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const getData = () => {
      axios({
        method: 'POST',
        url: `${API_HOST}user/getUserById`,
        timeout: 5000,
        data: { id: user_id },
        headers: {
          Key: API_KEY,
        },
      })
        .then(response => setUserData(response.data.data))
        .catch(err => {
          console.log(err);
        });
    };
    getData();
  }, []);
  console.log(API_HOST);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.icon}>
        <Ionicons
          name="chevron-back"
          size={25}
          onPress={() => navigation.goBack()}
        />
      </View>
      <TouchableOpacity
        style={styles.information}
        onPress={() => {
          user_id !== user.id &&
            navigation.navigate('ProfileOtherScreen', {user_id: userData?.id});
        }}>
        <View style={styles.imgContainer}>
          <FastImage style={styles.img} source={{ uri: userData?.avatar }} />
        </View>
        <View style={styles.content}>
          <Text style={styles.fullname}>{userData?.fullname}</Text>
          <Text style={styles.date}>{formatDate(detail?.create_at)}</Text>
        </View>
      </TouchableOpacity>
      {user?.id ? (
        <View style={styles.icon}>
          <MaterialCommunityIcons
            name="dots-horizontal"
            size={25}
            onPress={openBottomSheet}
          />
        </View>
      ) : (
        <View style={styles.icon}></View>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingTop: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  icon: {
    width: '7%',
  },
  information: {
    width: '86%',
    flexDirection: 'row',
  },
  imgContainer: {
    width: 40,
    height: 40,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#F0AB1E',
    marginLeft: 8,
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
    resizeMode: 'cover',
  },
  content: {
    marginLeft: 12,
  },
  fullname: {
    fontSize: 15,
    fontFamily: 'BeVietnam-Bold',
  },
  date: {
    fontSize: 13,
    fontFamily: 'BeVietnam-Medium',
    color: COLOR.GREY,
  },
});

export default Header;
