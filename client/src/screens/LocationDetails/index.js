import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  StatusBar,
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {HeaderComponent} from '../../components';
import styles from './style';
import {COLOR} from '../../assets/color';

import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import Item from './Item';
import {API_HOST} from '@env';
import FastImage from 'react-native-fast-image';

const LocationDetails = ({navigation, route}) => {
  const renderFood = ({item}) => {
    return <Item item={item} />;
  };

  const [dataDetail, setDataDetail] = useState([]);
  const [dataPost, setDataPost] = useState([]);
  const {id} = route.params;
  useEffect(() => {
    axios
      .post(API_HOST + 'location/getLocationById', {id})
      .then(res => {
        setDataDetail(res.data.data);
      })
      .catch(error => {
        console.log('error ' + error);
      });
  }, []);
  useEffect(() => {
    axios
      .post(API_HOST + 'post/getPostsByLocation', {id: id})
      .then(res => {
        setDataPost(res.data.data);
      })
      .catch(error => {
        console.log('error ' + error);
      });
  }, []);
  console.log(API_HOST);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle="default"
      />
      <HeaderComponent
        title="Chi tiết địa điểm"
        left={true}
        navigation={navigation}
      />
      <View style={{padding: 16}}>
        <View
          style={{
            backgroundColor: '#F0F0F0',
            borderRadius: 10,
          }}>
          <View style={{flexDirection: 'column'}}>
            <View style={{flexDirection: 'row', padding: 8}}>
              <FastImage
                style={styles.image}
                source={{uri: dataDetail[0]?.image_url}}
              />
              <View style={{marginLeft: 8}}>
                <Text style={{fontFamily: 'BeVietnam-Bold', fontSize: 24}}>
                  {dataDetail[0]?.name}
                </Text>
                <View style={{flexDirection: 'row', marginTop: 8}}>
                  <Ionicons
                    name="star"
                    size={20}
                    color={COLOR.YELLOW}
                    style={{marginRight: 6}}
                  />
                  <Text
                    style={{
                      fontFamily: 'BeVietnam-Medium',
                      fontSize: 16,
                      marginLeft: 5,
                    }}>
                    {dataDetail[0]?.rating}/5 điểm
                  </Text>
                </View>
              </View>
            </View>
            <View style={{padding: 8}}>
              <Text style={styles.text}>
                <Text style={{fontSize: 18, fontFamily: 'BeVietnam-Bold'}}>
                  Địa điểm:
                </Text>{' '}
                {dataDetail[0]?.address}
              </Text>
              <Text style={styles.text}>
                <Text style={{fontSize: 18, fontFamily: 'BeVietnam-Bold'}}>
                  Số điện thoại:
                </Text>{' '}
                {dataDetail[0]?.phone}
              </Text>
              <Text style={styles.text}>
                <Text style={{fontSize: 18, fontFamily: 'BeVietnam-Bold'}}>
                  Thời gian mở cửa:
                </Text>{' '}
                {dataDetail[0]?.opening_hours}
              </Text>
            </View>
          </View>
        </View>
        <Text
          style={{fontFamily: 'BeVietnam-Bold', fontSize: 20, marginTop: 16}}>
          Bài viết cùng địa điểm
        </Text>
      </View>
      {!dataPost ? (
        <View></View>
      ) : (
        <FlatList
          style={{
            marginTop: 8,
            paddingHorizontal: 8,
            backgroundColor: COLOR.WHITE,
          }}
          data={dataPost}
          renderItem={renderFood}
          keyExtractor={item => item.id}
        />
      )}
    </SafeAreaView>
  );
};

export default LocationDetails;
