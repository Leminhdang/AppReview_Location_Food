import React, {useContext, useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import VideoPlayer from 'react-native-video-controls';
import {formatDate} from '../../helpers/formatDate';
import {AuthContext} from '../../Provider/AuthProvider';
import styles from './style';
const RenderItem = ({item, visibleItem, index}) => {
  const [more, setMore] = useState(false);
  const {user} = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container}>
      {/* Avatar + ten + ngay */}

      <View style={styles.wrapHeader}>
        <FastImage
          source={{
            uri: item.avatar,
          }}
          style={styles.avatar}
        />
        <View style={styles.information}>
          <Text style={styles.name}>{item.name_user}</Text>
          {/* tên người dùng*/}
          <Text style={styles.date}>{formatDate(item.create_at)}</Text>
        </View>
      </View>

      {/* Video */}

      <View style={styles.wrapVideo}>
        <VideoPlayer
          style={styles.video}
          paused={index !== visibleItem}
          source={{uri: item.video_post}}
          repeat={true}
        />
      </View>

      {/* Title + content */}
      <View
        style={{flexDirection: 'column', marginTop: 16, paddingHorizontal: 8}}>
        <Text style={styles.title}>{item.title_post}</Text>
        <Text numberOfLines={more ? undefined : 2} style={styles.content}>
          {item.content_post}
        </Text>
        <Text style={styles.more} onPress={() => setMore(!more)}>
          {more ? 'Thu gọn' : 'Xem thêm'}
        </Text>
      </View>
      {/* Icon */}
      {/* <View style={{flexDirection: 'row', marginTop: 8, paddingHorizontal: 8}}>
        <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
          <FeatherIcon name="heart" size={26} />
          <Text style={styles.heartCount}>
            {numberProcessing(item.number_of_heart)}
          </Text>
        </View>
        <View style={styles.wrapIcon}>
          <MaterialIcon name="message-text-outline" size={26} />
          <FeatherIcon name="bookmark" size={26} style={{marginLeft: 8}} />
        </View>
      </View> */}
    </SafeAreaView>
  );
};

export default RenderItem;
