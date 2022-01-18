import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {COLOR} from '../../../assets/color';
import {windowWidth} from '../../../components';

const LocationLoading = () => {
  return (
    <SkeletonPlaceholder>
      <View style={styles.container}>
        <View style={[styles.largeItem, styles.height]} />
        <View style={[styles.smallItem, styles.height]} />
      </View>
    </SkeletonPlaceholder>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  largeItem: {
    width: windowWidth / 1.5,
    borderRadius: 10,
  },
  smallItem: {
    width: windowWidth - windowWidth / 1.5 - 48,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  height: {
    height: windowWidth / 2.5,
  },
});

export default LocationLoading;
