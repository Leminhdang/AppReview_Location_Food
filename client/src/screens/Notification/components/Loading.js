import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {windowWidth} from '../../../components';
const Loading = () => {
  return (
    <View>
      {Array(12)
        .fill()
        .map((_, index) => (
          <SkeletonPlaceholder key={index}>
            <View style={[styles.item, styles.margin24]}>
              <View style={styles.image} />
              <View style={styles.content}>
                <View style={[styles.size, styles.line]} />
                <View style={[styles.size, styles.line]} />
              </View>
            </View>
          </SkeletonPlaceholder>
        ))}
    </View>
  );
};
const styles = StyleSheet.create({
  size: {
    height: 25,
    borderRadius: 5,
  },
  margin24: {
    marginTop: 8,
  },
  item: {
    flexDirection: 'row',
    height: windowWidth / 10,
    paddingHorizontal: 16,
    height: 70,
    alignItems: 'center',
  },
  image: {
    marginRight: 8,
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  content: {
    width: windowWidth - 120,
    height: '100%',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  line: {
    width: '100%',
    height: 23,
  },
});

export default Loading;
