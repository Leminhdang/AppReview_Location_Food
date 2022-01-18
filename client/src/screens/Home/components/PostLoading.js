import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {windowWidth} from '../../../components';

const PostLoading = () => {
  return (
    <SkeletonPlaceholder>
      <View style={[styles.item, styles.margin16]}>
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
  container: {
    paddingHorizontal: 16,
  },
  size: {
    height: 30,
    borderRadius: 5,
  },
  margin16: {
    marginTop: 16,
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

export default React.memo(PostLoading);
