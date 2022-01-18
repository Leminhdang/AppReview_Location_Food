import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {COLOR} from '../../../assets/color';
import styles from './style';
import {API_HOST, API_KEY} from '@env';
import {FlatList} from 'react-native';
import PostItem from './PostItem';
import {AuthContext} from '../../../Provider/AuthProvider';
import TabLoading from './TabLoading';
import {useNavigation, useIsFocused} from '@react-navigation/native';
const PostsSave = () => {
  const [loading, setLoading] = useState(true);

  //
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.message}>
          Bạn không thể xem được bài viết đã lưu của người khác
        </Text>
      </View>
    </View>
  );
};

export default React.memo(PostsSave);
