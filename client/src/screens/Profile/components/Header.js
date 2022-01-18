import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {API_HOST, API_KEY} from '@env';
import {windowWidth} from '../../../components';
import {COLOR} from '../../../assets/color';
import {TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from '../../../Provider/AuthProvider';
import HeaderLoading from './HeaderLoading';
import {useNavigation} from '@react-navigation/native';
import AddIntro from './AddIntro';
import FastImage from 'react-native-fast-image';

const HeaderProfile = () => {
  const [profile, setProfile] = useState(null);
  const [count, setCount] = useState(null);
  const {user} = useContext(AuthContext);
  const [information, setInformation] = useState(null);
  const setValue = text => setInformation(text);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      axios
        .all([
          axios({
            method: 'POST',
            url: `${API_HOST}user/getUserById`,
            timeout: 5000,
            data: {id: user.id},
            headers: {
              Key: API_KEY,
            },
          }),
          axios({
            method: 'POST',
            url: `${API_HOST}user/getCount`,
            timeout: 5000,
            data: {id: user.id},
            headers: {
              Key: API_KEY,
            },
          }),
        ])
        .then(
          axios.spread((data1, data2) => {
            setProfile(data1.data.data);
            setInformation(data1.data.data.information);
            setCount(data2.data.data);
          }),
        )
        .catch(err => console.log(err));
    });
    return unsubscribe;
  }, [navigation]);
  console.log(API_HOST);
  return (
    <View>
      {count && profile ? (
        <View style={styles.container}>
          <View style={styles.informationContainer}>
            <View style={styles.imageContainer}>
              <View style={styles.circle}>
                <FastImage style={styles.img} source={{uri: profile.avatar}} />
              </View>
            </View>
            <View style={styles.information}>
              <Text style={styles.fullname}>{profile.fullname}</Text>
              <TouchableOpacity
                style={styles.levelContainer}
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Member')}>
                <Text style={styles.label}>Cấp độ {profile.level}</Text>
                <TouchableOpacity
                  style={styles.icon}
                  activeOpacity={1}
                  onPress={() => navigation.navigate('EditProfile', {profile})}>
                  <MaterialCommunityIcons
                    name="account-edit-outline"
                    size={25}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.countContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Following')}>
              <Text style={styles.countLabel}>Theo dõi</Text>
              <Text style={styles.countNumber}>{count?.followCount}</Text>
            </TouchableOpacity>
            <View>
              <Text style={styles.countLabel}>Bài viết</Text>
              <Text style={styles.countNumber}>{count?.postsCount}</Text>
            </View>
            <View>
              <Text style={styles.countLabel}>Hình ảnh</Text>
              <Text style={styles.countNumber}>{count?.imageCount}</Text>
            </View>
          </View>
          {information ? (
            <View style={styles.infoContainer}>
              <Text style={[styles.countLabel, {marginTop: 16}]}>
                {information}
              </Text>
              <AddIntro {...{setValue}} value={information} />
            </View>
          ) : (
            <AddIntro update {...{setValue}} value={information} />
          )}
        </View>
      ) : (
        <HeaderLoading />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  informationContainer: {
    width: '100%',
    flexDirection: 'row',
  },
  imageContainer: {
    width: '30%',
  },
  circle: {
    height: windowWidth * 0.22,
    width: windowWidth * 0.22,
    borderWidth: 1,
    borderRadius: windowWidth * 0.2,
    borderColor: COLOR.YELLOW,
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: windowWidth * 0.2,
  },
  information: {
    width: '70%',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  fullname: {
    fontFamily: 'BeVietnam-Bold',
    fontSize: 18,
  },
  label: {
    backgroundColor: COLOR.YELLOW,
    width: '60%',
    borderRadius: 10,
    textAlign: 'center',
    paddingVertical: 8,
    fontFamily: 'BeVietnam-Bold',
    color: COLOR.WHITE,
  },
  countContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  countLabel: {
    fontFamily: 'BeVietnam-Medium',
    fontSize: 14,
  },
  countNumber: {
    textAlign: 'center',
    fontFamily: 'BeVietnam-Bold',
  },
  levelContainer: {
    flexDirection: 'row',
  },
  icon: {
    backgroundColor: COLOR.LIGHTGREY,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 2,
    marginLeft: 16,
    borderRadius: 10,
  },
  description: {
    width: '50%',
    alignItems: 'center',
    borderWidth: 0.5,
    paddingVertical: 5,
    borderRadius: 8,
    marginTop: 16,
  },
  infoContainer: {
    width: windowWidth - 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

export default React.memo(HeaderProfile);
