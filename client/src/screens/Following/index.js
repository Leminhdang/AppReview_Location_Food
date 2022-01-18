import React, {useEffect, useState, useContext} from 'react';
import {
  Text,
  SafeAreaView,
  ToastAndroid,
  TouchableOpacity,
  Image,
  View,
  FlatList,
} from 'react-native';
import styles from './style';
import {AuthContext} from '../../Provider/AuthProvider';
import {API_HOST, API_KEY} from '@env';
import {HeaderComponent} from '../../components';

import axios from 'axios';
const index = ({navigation}) => {
  const {user} = useContext(AuthContext);
  const [data, setData] = useState([]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      axios({
        method: 'POST',
        url: `${API_HOST}user/getFollower`,
        timeout: 5000,
        data: {user_id: user?.id},
        headers: {
          Key: API_KEY,
        },
      })
        .then(response => {
          if (response.data.success) {
            setData(response.data?.data);
          }
        })
        .catch(err => {
          console.log(err);
          ToastAndroid.show(
            'Đã xảy ra lỗi vui lòng thử lại',
            ToastAndroid.SHORT,
          );
        });
    });
    return unsubscribe;
  }, [navigation]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <HeaderComponent left={true} title="Following" {...{navigation}} />
        <View style={{flex: 1, paddingTop: 16}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={data}
            renderItem={({item}) => (
              <View style={{alignItems: 'center', marginTop: 8}}>
                <TouchableOpacity
                  activeOpacity={1}
                  style={styles.information}
                  onPress={() =>
                    navigation.navigate('ProfileOtherScreen', {
                      user_id: item?.follower_id,
                    })
                  }>
                  <View style={styles.imgContainer}>
                    <Image style={styles.img} source={{uri: item?.avatar}} />
                  </View>
                  <View style={styles.content}>
                    <Text style={styles.fullname}>{item?.fullname}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={item => item.id}
            horizontal={false}
            numColumns={3}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default index;
