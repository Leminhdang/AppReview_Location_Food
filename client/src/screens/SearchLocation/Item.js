import React from 'react';
import {View, Text, Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';
import {COLOR} from '../../assets/color';
import styles from './style';

const Item = ({item}) => {
  return (
    <TouchableOpacity style={styles.containerItem} activeOpacity={1}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
        }}>
        <FastImage
          style={{width: 75, height: 75, borderRadius: 10}}
          source={{
            uri: item.image_url,
          }}
        />
        <View style={{flexDirection: 'column'}}>
          <Text
            style={{fontSize: 22, fontFamily: 'BeVietnam-Bold', marginLeft: 8}}>
            {item.name}
          </Text>
          <View style={{marginLeft: 8, flexDirection: 'row'}}>
            <Text style={{fontSize: 14, fontFamily: 'BeVietnam-Regular'}}>
              {item.address}
            </Text>
          </View>
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginLeft: 8}}>
            <Entypo
              name="star"
              size={20}
              color={COLOR.YELLOW}
              style={{marginRight: 8}}
            />
            <Text style={{fontSize: 14, fontFamily: 'BeVietnam-Regular'}}>
              {item.rating} / 5 điểm
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Item;
