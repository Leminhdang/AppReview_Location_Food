import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {COLOR} from '../../../assets/color';
import styles from './style';
import {API_HOST, API_KEY} from '@env';
import {FlatList} from 'react-native';
import PostItem from './PostItem';
import TabLoading from './TabLoading';
import {AuthContext} from '../../../Provider/AuthProvider';
import {useNavigation} from '@react-navigation/native';

console.log(API_HOST);

const Posts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const {user} = useContext(AuthContext);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      axios({
        method: 'POST',
        url: `${API_HOST}post/getPostByUserId`,
        timeout: 5000,
        data: {id: user.id},
        headers: {
          Key: API_KEY,
        },
      })
        .then(response => {
          setLoading(false);
          setData(response.data.data);
        })
        .catch(err => console.log(err));
    });
    return unsubscribe;
  }, []);

  const Item = ({item}) => <PostItem {...{item}} />;
  return (
    <View style={styles.container}>
      {loading ? (
        <TabLoading />
      ) : (
        <View style={styles.container}>
          {data.length > 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={data}
              renderItem={Item}
              keyExtractor={item => item.id}
            />
          ) : (
            <Text style={styles.message}>Bạn chưa có bài viết nào</Text>
          )}
        </View>
      )}
    </View>
  );
};

export default React.memo(Posts);
