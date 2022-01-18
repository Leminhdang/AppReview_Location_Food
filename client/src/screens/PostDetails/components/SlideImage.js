import React from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {windowWidth} from '../../../components';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const SlideImage = ({data}) => {
  const navigation = useNavigation();
  console.log('data', data);
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() =>
          navigation.navigate('ImageFullScreen', {
            url: item.url,
            type: item.thumbnail ? 'video' : 'image',
          })
        }>
        <FastImage
          source={{uri: item?.thumbnail ? item?.thumbnail : item?.url}}
          style={styles.image}
          resizeMode={FastImage.resizeMode.contain}
        />
        {item?.thumbnail && (
          <AntDesign
            name="play"
            size={30}
            style={styles.icon}
            color="#A9A9A9"
          />
        )}
        <Text style={styles.count}>
          {index + 1}/{data.length}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <FlatList
      renderItem={renderItem}
      data={data}
      keyExtractor={(_, index) => `${index}`}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
    />
  );
};
const styles = StyleSheet.create({
  image: {
    width: windowWidth,
    height: 250,
  },
  count: {
    position: 'absolute',
    right: '5%',
    bottom: 0,
    fontFamily: 'BeVietnam-Medium',
  },
  icon: {
    position: 'absolute',
    top: 125,
    left: windowWidth / 2 - 15,
  },
});

export default SlideImage;
