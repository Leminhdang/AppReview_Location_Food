import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {AuthContext} from '../../Provider/AuthProvider';
import {HeaderComponent} from '../../components';
import {COLOR} from '../../assets/color';
import axios from 'axios';
import {API_HOST, API_KEY} from '@env';

import styles from './styles';

import Ionicons from 'react-native-vector-icons/Ionicons';
import number_processing from '../../helpers/numberProcessing';

const CategoryHashTag = ({navigation, route}) => {
  const [posts, serDataPost] = useState([]);
  const {title} = route.params;
  useEffect(() => {
    axios({
      method: 'POST',
      url: `${API_HOST}post/searchPost`,
      data: {value: title},
      timeout: 5000,
      headers: {
        Key: API_KEY,
      },
    })
      .then(response => {
        serDataPost(response?.data.data);
      })
      .catch(err => console.log(err));
  }, []);
  console.log(API_HOST);
  const renderPost = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.postItem}
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate('PostDetailScreen', {
            item,
          })
        }>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: item.image_url,
            }}
            style={styles.postImage}
          />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.postTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.postContent} numberOfLines={2}>
            {item.content}
          </Text>
          <View style={styles.heartContainer}>
            <Image
              source={{
                uri: item.avatar,
              }}
              style={styles.postAvatar}
            />
            <View style={[styles.heartContainer, {alignItems: 'flex-end'}]}>
              <Ionicons name="heart-outline" size={20} />
              <Text style={styles.countHeart}>
                {number_processing(item.TotalLikes)}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.save}>
          <Ionicons name="bookmark-outline" size={20} />
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <StatusBar hidden />
        <HeaderComponent title={title} left={true} navigation={navigation} />
        {posts.length > 0 ? (
          <FlatList
            contentContainerStyle={{paddingBottom: 12}}
            style={styles.flatlist}
            data={posts}
            renderItem={renderPost}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => <View style={styles.postSeparator} />}
          />
        ) : (
          <View>
            <Text style={styles.message}>
              Hiện tai chưa có bài viết nào phù hợp với thể loại này
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default CategoryHashTag;
