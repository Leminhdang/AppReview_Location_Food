import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLOR} from '../../assets/color';
import styles from './style';

const Item = ({item}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.push('PostDetailScreen', {
          item: {
            user_id: item.user_id,
            post_id: item.id,
          },
        })
      }
      activeOpacity={0.8}>
      <View style={styles.cardFood}>
        <FastImage source={{uri: item.image_post}} style={styles.img} />
        <View style={{flexDirection: 'column', flex: 1, marginLeft: 8}}>
          <View style={{flexDirection: 'column'}}>
            <Text
              numberOfLines={1}
              style={{
                fontFamily: 'BeVietnam-Bold',
                fontSize: 18,
                marginBottom: 8,
              }}>
              {item.title_post}
            </Text>
          </View>
          <Text
            numberOfLines={2}
            style={{fontFamily: 'BeVietnam-Medium', fontSize: 14}}>
            {item.content}
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flex: 2,

                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <FastImage
                source={{uri: item.avatar}}
                style={{width: 25, height: 25, borderRadius: 20}}
              />
              <Text
                style={{
                  fontFamily: 'BeVietnam-Bold',
                  fontSize: 14,
                  marginLeft: 8,
                }}>
                {item.name_user}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
              }}>
              <Icon name="heart-outline" size={18} style={{marginRight: 2}} />
              <Text>{item.TotalLikes}</Text>
            </View>
          </View>
        </View>
        <View style={{width: 20, height: 20, marginLeft: 8}}>
          <Icon name="bookmark-outline" size={20} color={COLOR.DARK} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Item;
