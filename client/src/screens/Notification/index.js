import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {COLOR} from '../../assets/color';
import {API_HOST, API_KEY} from '@env';
import {HeaderComponent, SignInToContinue} from '../../components';
import {AuthContext} from '../../Provider/AuthProvider';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesigns from 'react-native-vector-icons/AntDesign';
import FastImage from 'react-native-fast-image';
import Octicon from 'react-native-vector-icons/Octicons';
import axios from 'axios';
import {useFocusEffect} from '@react-navigation/native';
import {formatDate} from '../../helpers/formatDate';
import {useNavigation} from '@react-navigation/native';
import Loading from './components/Loading';

const getType = type => {
  if (type === 'comment') return 'đã bình luận về bài viết';
  if (type === 'report') return 'đã báo cáo bài viết';
  if (type === 'like') return 'đã thích bài viết';
};

const NotificationScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState(null);
  const {user} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  useFocusEffect(
    useCallback(() => {
      getNotifications();
    }, [user]),
  );

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={[styles.view, !item.read && styles.read]}
        activeOpacity={0.7}
        onPress={async () => {
          if (!item.read) {
            try {
              await axios({
                method: 'POST',
                url: `${API_HOST}notify/readNotify`,
                timeout: 5000,
                data: {id: item.id},
                headers: {
                  Key: API_KEY,
                },
              });
            } catch (error) {}
          }
          navigation.navigate('PostDetailScreen', {
            item: {user_id: user?.id, post_id: item?.posts_id},
          });
        }}>
        <View style={{flex: 2}}>
          <FastImage source={{uri: item.avatar}} style={styles.img} />
          <View style={styles.icon}>
            {item.type === 'comment' && (
              <FontAwesome name="commenting-o" size={20} color={COLOR.WHITE} />
            )}
            {item.type === 'report' && (
              <Octicon name="report" size={20} color={COLOR.WHITE} />
            )}
            {item.type === 'like' && (
              <AntDesigns name="like2" size={20} color={COLOR.WHITE} />
            )}
          </View>
        </View>
        <View style={[styles.view_in, !item.read && styles.read]}>
          <View style={styles.noti}>
            <Text style={styles.name}>
              {item.fullname}
              <Text style={styles.noti}>{' ' + getType(item.type)}</Text>
              <Text style={styles.title}>{' ' + item.title}</Text>
            </Text>
          </View>
          <Text style={styles.time}>{formatDate(item.create_at)}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const getNotifications = () => {
    if (user?.id) {
      axios({
        method: 'POST',
        url: `${API_HOST}notify/getNotifications`,
        timeout: 5000,
        data: {id: user?.id},
        headers: {
          Key: API_KEY,
        },
      })
        .then(response => {
          setData(response.data.data);
          setLoading(false);
        })
        .catch(err => setLoading(false));
    }
  };

  return (
    <SafeAreaView style={{backgroundColor: COLOR.WHITE, flex: 1}}>
      {user ? (
        <View style={{flex: 1, backgroundColor: COLOR.WHITE}}>
          <HeaderComponent title="Thông báo" />
          {loading ? (
            <View style={{flex: 1, backgroundColor: COLOR.WHITE}}>
              <Loading />
            </View>
          ) : (
            <FlatList
              style={{
                marginTop: 8,
                paddingHorizontal: 8,
                backgroundColor: COLOR.WHITE,
              }}
              data={data}
              renderItem={renderItem}
              keyExtractor={(_, index) => `${index}`}
            />
          )}
        </View>
      ) : (
        <View style={{flex: 1, backgroundColor: COLOR.WHITE}}>
          <SignInToContinue />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  view: {
    paddingVertical: 8,
    marginVertical: 4,
    height: windowHeight * 0.1,
    flex: 1,
    backgroundColor: COLOR.WHITE,
    flexDirection: 'row',
  },
  view_in: {
    backgroundColor: COLOR.WHITE,
    flex: 9,

    justifyContent: 'center',
  },
  view_noti: {
    flexDirection: 'row',
  },
  name: {
    fontFamily: 'BeVietnam-Bold',
    fontSize: 16,
  },
  noti: {
    fontFamily: 'BeVietnam-Medium',
    fontSize: 16,
  },
  title: {
    fontFamily: 'BeVietnam-Bold',
    fontSize: 16,
  },
  time: {
    justifyContent: 'flex-end',
    color: COLOR.GREY,
    fontFamily: 'BeVietnam-Medium',
    fontSize: 12,
  },
  img: {
    height: 60,
    width: 60,
    borderRadius: 90,
    position: 'absolute',
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    top: windowHeight * 0.055,
    left: windowWidth * 0.085,
    borderRadius: 90,
    backgroundColor: COLOR.YELLOW,
    width: windowWidth * 0.06,
    height: windowHeight * 0.03,
    elevation: 4,
  },
  header: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontSize: 20,
    width: windowWidth * 0.5,
  },
  read: {
    backgroundColor: '#F5F5F5',
  },
});

export default NotificationScreen;
