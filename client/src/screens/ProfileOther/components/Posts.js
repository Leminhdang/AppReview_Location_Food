import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {COLOR} from '../../../assets/color';
import styles from './style';
import {API_HOST, API_KEY} from '@env';
import {FlatList} from 'react-native';
import PostItem from './PostItem';
import TabLoading from './TabLoading';
import {useNavigation, useIsFocused} from '@react-navigation/native';

const Posts = ({user_id}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();
  const isFocused = useIsFocused();
  useEffect(() => {
    const getData = () => {
      if (isFocused) {
        axios({
          method: 'POST',
          url: `${API_HOST}post/getPostByUserId`,
          timeout: 5000,
          data: {id: user_id},
          headers: {
            Key: API_KEY,
          },
        })
          .then(response => {
            setLoading(false);
            setData(response.data.data);
          })
          .catch(err => console.log(err));
      }
    };
    getData();
  }, [isFocused]);
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
            <Text style={styles.message}>Chưa có bài viết nào</Text>
          )}
        </View>
      )}
    </View>
  );
};

export default React.memo(Posts);
