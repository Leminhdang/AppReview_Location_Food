import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {windowWidth} from '../../../components';

const HeaderLoading = () => {
  return (
    <SkeletonPlaceholder>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.avatar} />
          <View>
            <View style={[styles.name, styles.size]} />
            <View style={[styles.size, styles.level]} />
          </View>
        </View>
        <View style={[styles.size, styles.margin16]} />
        <View style={[styles.size, styles.margin16, {marginBottom: 32}]} />
      </View>
    </SkeletonPlaceholder>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatar: {
    width: windowWidth * 0.22,
    height: windowWidth * 0.22,
    borderRadius: windowWidth * 0.19,
  },
  size: {
    height: 30,
    borderRadius: 5,
  },
  name: {
    width: (windowWidth - windowWidth * 0.22 - 40) / 1.5,
    marginBottom: 16,
  },
  level: {
    width: windowWidth - windowWidth * 0.22 - 40,
  },
  margin8: {
    marginTop: 8,
  },
  margin16: {
    marginTop: 16,
  },
  margin24: {
    marginTop: 24,
  },
});

export default React.memo(HeaderLoading);
