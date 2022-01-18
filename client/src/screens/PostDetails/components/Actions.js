import axios from 'axios';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {FlatList, ToastAndroid} from 'react-native';
import {View, Text, StyleSheet, Image, TextInput} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLOR} from '../../../assets/color';
import {API_HOST, API_KEY} from '@env';
import CommentItem from './CommentItem';
import number_processing from '../../../helpers/numberProcessing';
import {AuthContext} from '../../../Provider/AuthProvider';
import {useNavigation} from '@react-navigation/native';
import debounce from 'lodash/debounce';

const renderItem = ({item}) => <CommentItem item={item} />;
let initialStatus;

const Actions = ({post_id, receiver_id}) => {
  const [comment, setComment] = useState('');
  const [listComment, setListComment] = useState([]);
  const [likes, setLikes] = useState(0);
  const {user} = useContext(AuthContext);
  const navigation = useNavigation();
  const [likeStatus, setLikeStatus] = useState(false);

  useEffect(() => {
    const getData = () => {
      axios
        .all([
          axios({
            method: 'POST',
            url: `${API_HOST}comment/getCommentByPostId`,
            timeout: 5000,
            data: {id: post_id},
            headers: {
              Key: API_KEY,
            },
          }),
          axios({
            method: 'POST',
            url: `${API_HOST}like/getCount`,
            timeout: 5000,
            data: {id: post_id, user_id: user ? user.id : -1},
            headers: {
              Key: API_KEY,
            },
          }),
        ])
        .then(
          axios.spread((data1, data2) => {
            setListComment(data1.data.data);
            setLikes(data2.data.data.count);
            setLikeStatus(data2.data.data.status);
            initialStatus = data2.data.data.status;
          }),
        )
        .catch(err => console.log(err));
    };
    getData();
  }, []);

  const addComment = async () => {
    if (user) {
      setComment('');
      axios({
        method: 'POST',
        url: `${API_HOST}comment/addComment`,
        timeout: 5000,
        data: {
          post_id,
          user_id: user?.id,
          content: comment,
        },
        headers: {
          Key: API_KEY,
        },
      })
        .then(function (response) {
          if (response.data.success) {
            axios({
              method: 'POST',
              url: `${API_HOST}mission/updateRateOfProgress`,
              data: {mission_id: 5, user_id: user?.id},
              timeout: 5000,
              headers: {
                Key: API_KEY,
              },
            });
            setListComment([
              ...listComment,
              {
                user_id: user?.id,
                content: comment,
                create_at: Date.now(),
                fullname: user.fullname,
                avatar: user.avatar,
              },
            ]);
            ToastAndroid.show(response.data.msg, ToastAndroid.SHORT);
          }
        })
        .catch(err => {
          console.log(err);
          ToastAndroid.show('Vui lòng thử lại sau', ToastAndroid.SHORT);
        });
      // send notification
      try {
        await axios({
          method: 'POST',
          url: `${API_HOST}notify/sendNotify`,
          timeout: 5000,
          data: {
            sender_id: user.id,
            receiver_id,
            type: 'comment',
            posts_id: post_id,
          },
          headers: {
            Key: API_KEY,
          },
        });
      } catch (error) {}
    } else navigation.navigate('Login');
  };

  const addLike = () => {
    if (user?.id) {
      if (likeStatus) {
        setLikeStatus(false);
        setLikes(likes - 1);
        debounceUpdate(false, 'deleteLikePosts');
      } else {
        setLikeStatus(true);
        setLikes(likes + 1);
        debounceUpdate(true, 'likePosts');
      }
    } else {
      navigation.navigate('Login');
    }
  };

  const debounceUpdate = useCallback(
    debounce((state, url) => updateLikes(state, url), 1000),
    [],
  );

  const updateLikes = async (state, url) => {
    if (state !== initialStatus) {
      axios({
        method: 'POST',
        url: `${API_HOST}like/${url}`,
        timeout: 5000,
        data: {
          post_id,
          sender_id: user.id,
          receiver_id,
        },
        headers: {
          Key: API_KEY,
        },
      })
        .then(function (response) {
          if (response.data.success && url === 'deleteLikePosts')
            initialStatus = false;
          else if (response.data.success && url === 'likePosts')
            initialStatus = true;
        })
        .catch(err => {
          console.log(err);
          ToastAndroid.show('Đã xảy ra lỗi', ToastAndroid.SHORT);
        });
      if (state === true) {
        try {
          await axios({
            method: 'POST',
            url: `${API_HOST}notify/sendNotify`,
            timeout: 5000,
            data: {
              sender_id: user.id,
              receiver_id,
              type: 'like',
              posts_id: post_id,
            },
            headers: {
              Key: API_KEY,
            },
          });
        } catch (error) {}
      }
    }
  };
  console.log(API_HOST);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.heartContainer}>
          {likeStatus ? (
            <Ionicons
              name="heart"
              size={22}
              color="#F34336"
              onPress={addLike}
            />
          ) : (
            <Ionicons name="heart-outline" size={22} onPress={addLike} />
          )}
          <Text style={[styles.headerTitle, {marginLeft: 5, marginBottom: 3}]}>
            {number_processing(likes)} luợt yêu thích
          </Text>
        </View>
        <Text style={[styles.headerTitle, {marginLeft: 5, marginBottom: 3}]}>
          {number_processing(listComment.length)} bình luận
        </Text>
      </View>
      <Text style={styles.commentTitle}>Bình luận</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Nhập bình luận..."
          value={comment}
          onChangeText={text => setComment(text)}
          multiline
          style={styles.inputComment}
        />
        {comment.trim().length > 0 && (
          <Ionicons
            onPress={addComment}
            name="ios-send"
            size={20}
            style={styles.sendIcon}
            color={COLOR.ORANGE}
          />
        )}
      </View>
      <FlatList
        style={styles.list}
        data={listComment}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {marginTop: 8},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heartContainer: {
    alignItems: 'center',
    width: '60%',
    flexDirection: 'row',
  },
  headerTitle: {
    fontFamily: 'BeVietnam-Regular',
  },
  heartIcon: {
    width: 18,
    height: 18,
    marginRight: 8,
  },
  commentTitle: {
    fontFamily: 'BeVietnam-Bold',
    marginVertical: 16,
  },
  inputContainer: {
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'flex-end',
  },
  inputComment: {
    width: '90%',
    fontFamily: 'BeVietnam-Medium',
    fontSize: 15,
  },
  sendIcon: {
    marginBottom: 12,
  },
  separator: {
    height: 10,
  },
  list: {
    marginTop: 16,
  },
});

export default React.memo(Actions);
