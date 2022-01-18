import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {COLOR} from '../assets/color';
import FastImage from 'react-native-fast-image';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Comment = item => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        marginTop: 8,
        padding: 8,
        elevation: 6,
        borderRadius: 10,
        backgroundColor: COLOR.WHITE,
        marginBottom: 8,
      }}>
      <View style={{flex: 2, flexDirection: 'row'}}>
        <FastImage
          resizeMode={'cover'}
          source={{uri: item.avatar}}
          style={{
            width: 50,
            height: 50,
            borderRadius: 75,
          }}
        />
        <View
          style={{
            flex: 10,
            flexDirection: 'column',
            marginLeft: 4,
          }}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <Text
                style={{
                  fontFamily: 'BeVietnam-Medium',
                  fontSize: 14,
                  color: COLOR.BLACK,
                }}>
                {item.name}
              </Text>
            </View>

            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                flexDirection: 'row',
              }}>
              <MaterialCommunityIcons name="thumb-up" size={20} />
              <Text style={styles.number}>{item.like}</Text>
              <MaterialCommunityIcons name="thumb-down" size={20} />
              <Text style={styles.number}>{item.dislike}</Text>
            </View>
          </View>

          <Text
            style={{
              fontFamily: 'BeVietnam-Regular',
              fontSize: 14,
              color: COLOR.GREY,
            }}>
            {item.content}
          </Text>
          <Text
            style={{
              fontFamily: 'BeVietnam-Regular',
              fontSize: 12,
              color: COLOR.GREY,
            }}>
            {item.creact_at}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default React.memo(Comment);

const styles = StyleSheet.create({
  number: {
    fontFamily: 'BeVietnam-Regular',
    fontSize: 12,
    marginRight: 8,
    marginLeft: 8,
    color: COLOR.BLACK,
  },
});
