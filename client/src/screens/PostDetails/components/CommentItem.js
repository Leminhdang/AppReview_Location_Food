import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';

const CommentItem = ({item}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <FastImage source={{uri: item.avatar}} style={styles.image} />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.fullname}>{item.fullname}</Text>
        <Text style={styles.content}>{item.content}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  fullname: {
    fontFamily: 'BeVietnam-Bold',
    fontSize: 15,
  },
  content: {
    fontFamily: 'BeVietnam-Regular',
  },
  contentContainer: {
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 10,
    width: '85%',
  },
  imgContainer: {
    width: '15%',
  },
});

export default React.memo(CommentItem);
