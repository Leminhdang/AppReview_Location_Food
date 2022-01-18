import React, { useContext } from 'react';
import { Image, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { COLOR } from '../../../assets/color';
import { windowHeight, windowWidth } from '../../../components';
import number_processing from '../../../helpers/numberProcessing';
import { formatDate } from '../../../helpers/formatDate';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../../Provider/AuthProvider';

const PostItem = ({ item }) => {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={() => navigation.navigate('PostDetailScreen', { item: { user_id: user.id, post_id: item?.post_id } })}>
      <View style={styles.imgContainer}>
        <FastImage source={{ uri: item.image_url }} style={styles.img} />
      </View>
      <View style={styles.details}>
        <View style={styles.text}>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.content} numberOfLines={2}>
            {item.content}
          </Text>
        </View>
        <View style={styles.iconContainer}>
          <View style={styles.heart}>
            <FontAwesome name="heart" size={18} color="#e61809" />
            <Text style={styles.label}>
              {number_processing(item.TotalLikes == null ? 0 : item.TotalLikes)}
            </Text>
          </View>
          <View style={styles.date}>
            <Text style={styles.label}>
              {moment(item.create_at).format('l')}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: windowWidth - 30,
    height: windowWidth / 3,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: COLOR.WHITE,
    shadowColor: '#52006A',
    marginVertical: 6,
    marginLeft: 3,
  },
  imgContainer: {
    position: 'relative',
    width: windowWidth / 2.5,
    height: '100%',
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
  details: {
    width: windowWidth - windowWidth / 2.5 - 32,
    height: '100%',
    paddingLeft: 16,
    paddingVertical: 12,
    paddingRight: 3,
  },
  text: {
    height: '70%',
  },
  title: {
    fontFamily: 'BeVietnam-Bold',
    fontSize: 16,
  },
  content: {
    fontFamily: 'BeVietnam-Medium',
    fontSize: 14,
    marginTop: 6,
  },
  iconContainer: {
    justifyContent: 'flex-end',
    height: '30%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  label: {
    fontFamily: 'BeVietnam-Medium',
    fontSize: 14,
    marginLeft: 8,
    color: COLOR.GREY,
  },
  date: {
    justifyContent: 'flex-end',
  },
});

export default React.memo(PostItem);
