import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {windowWidth} from '../../../components';

const TabLoading = () => {
  return (
    <SkeletonPlaceholder>
      <View style={[styles.item, styles.margin24]}>
        <View style={styles.image} />
        <View style={styles.content}>
          <View style={[styles.size, styles.line]} />
          <View style={[styles.size, styles.line]} />
          <View style={[styles.size, styles.line]} />
        </View>
      </View>
      <View style={[styles.item, styles.margin24]}>
        <View style={styles.image} />
        <View style={styles.content}>
          <View style={[styles.size, styles.line]} />
          <View style={[styles.size, styles.line]} />
          <View style={[styles.size, styles.line]} />
        </View>
      </View>
      <View style={[styles.item, styles.margin24]}>
        <View style={styles.image} />
        <View style={styles.content}>
          <View style={[styles.size, styles.line]} />
          <View style={[styles.size, styles.line]} />
          <View style={[styles.size, styles.line]} />
        </View>
      </View>
    </SkeletonPlaceholder>
  );
};
const styles = StyleSheet.create({
  size: {
    height: 30,
    borderRadius: 5,
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
  item: {
    flexDirection: 'row',
    height: windowWidth / 3,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  image: {
    marginRight: 8,
    width: windowWidth / 2.5,
    height: '100%',
    borderRadius: 10,
  },
  content: {
    width: windowWidth - windowWidth / 2.5 - 40,
    height: '100%',
    justifyContent: 'space-between',
  },
  line: {
    width: '100%',
    height: 35,
  },
});

export default React.memo(TabLoading);
