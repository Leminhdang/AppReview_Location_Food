import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {windowHeight, windowWidth} from '../../components';

const RenderItem = () => {
  return (
    <View style={styles.Item}>
      <FastImage
        source={require('../../assets/images/coinBG.jpg')}
        style={styles.img}
      />
      <View>
        <Text>U là trời gà gì mà ngon quá trời</Text>
        <AntDesign name="heart" size={20} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  Item: {
    width: windowWidth / 2,
    marginLeft: 8,
  },
  img: {
    height: windowWidth / 2,
    width: '100%',
  },
});

export default RenderItem;
