import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, ToastAndroid} from 'react-native';
import {API_HOST, API_KEY} from '@env';
import {windowWidth} from '../../../components';
import {COLOR} from '../../../assets/color';
import {TouchableOpacity} from 'react-native';
import {AuthContext} from '../../../Provider/AuthProvider';
import HeaderLoading from './HeaderLoading';
import {useNavigation} from '@react-navigation/native';

const HeaderProfile = ({user_id}) => {
  const [profile, setProfile] = useState(null);
  const [count, setCount] = useState(null);
  const [information, setInformation] = useState(null);
  const navigation = useNavigation();
  const [status, setStatus] = useState(false);
  const {user} = useContext(AuthContext);
  const deleteFollowers = () => {
    axios({
      method: 'POST',
      url: `${API_HOST}user/deleteFollower`,
      data: {follower_id: user_id, user_id: user.id},
      timeout: 5000,
      headers: {
        Key: API_KEY,
      },
    })
      .then(response => {
        if (response.data?.success) {
          ToastAndroid.show('Huỷ follow thành công', ToastAndroid.SHORT);
          setStatus(false);
        }
      })
      .catch(err => console.log(err));
  };
  const addFollower = () => {
    axios({
      method: 'POST',
      url: `${API_HOST}user/addFollower`,
      data: {follower_id: user_id, user_id: user.id},
      timeout: 5000,
      headers: {
        Key: API_KEY,
      },
    })
      .then(response => {
        if (response.data?.success) {
          axios({
            method: 'POST',
            url: `${API_HOST}mission/updateRateOfProgress`,
            data: {mission_id: 10, user_id: user.id},
            timeout: 5000,
            headers: {
              Key: API_KEY,
            },
          });
          ToastAndroid.show('Follow success', ToastAndroid.SHORT);
          setStatus(true);
        }
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      axios
        .all([
          axios({
            method: 'POST',
            url: `${API_HOST}user/getUserById`,
            timeout: 5000,
            data: {id: user_id},
            headers: {
              Key: API_KEY,
            },
          }),
          axios({
            method: 'POST',
            url: `${API_HOST}user/getCount`,
            timeout: 5000,
            data: {id: user_id},
            headers: {
              Key: API_KEY,
            },
          }),
          axios({
            method: 'POST',
            url: `${API_HOST}user/checkFollower`,
            timeout: 5000,
            data: {follower_id: user_id, user_id: user.id},
            headers: {
              Key: API_KEY,
            },
          }),
        ])
        .then(
          axios.spread((data1, data2, data3) => {
            setProfile(data1.data.data);
            setInformation(data1.data.data.information);
            setCount(data2.data.data);
            setStatus(data3.data?.success);
          }),
        )
        .catch(err => console.log(err));
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View>
      {count && profile ? (
        <View style={styles.container}>
          <View style={styles.informationContainer}>
            <View style={styles.imageContainer}>
              <View style={styles.circle}>
                <Image style={styles.img} source={{uri: profile.avatar}} />
              </View>
            </View>
            <View style={styles.information}>
              <Text style={styles.fullname}>{profile.fullname}</Text>
              {status ? (
                <View>
                  <TouchableOpacity
                    style={styles.levelContainer}
                    activeOpacity={0.8}
                    onPress={() => deleteFollowers()}>
                    <Text style={styles.label}>Huỷ Follow</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View>
                  <TouchableOpacity
                    style={styles.levelContainer}
                    activeOpacity={0.8}
                    onPress={() => addFollower()}>
                    <Text style={styles.label}>Folow</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
          <View style={styles.countContainer}>
            <View>
              <Text style={styles.countLabel}>Theo dõi</Text>
              <Text style={styles.countNumber}>{count?.followCount}</Text>
            </View>
            <View>
              <Text style={styles.countLabel}>Bài viết</Text>
              <Text style={styles.countNumber}>{count?.postsCount}</Text>
            </View>
            <View>
              <Text style={styles.countLabel}>Hình ảnh</Text>
              <Text style={styles.countNumber}>{count?.imageCount}</Text>
            </View>
          </View>
          {information && (
            <View style={styles.infoContainer}>
              <Text style={[styles.countLabel, {marginTop: 16}]}>
                {information}
              </Text>
            </View>
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
