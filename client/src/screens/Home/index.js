import React, {
  useRef,
  useEffect,
  useState,
  useContext,
  useCallback,
} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import {HomeDialog, windowWidth} from '../../components';
import axios from 'axios';
import {API_HOST, API_KEY} from '@env';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

import {AuthContext} from '../../Provider/AuthProvider';
import Header from './components/Header';
import styles from './style';
import {postCategories} from './categoriesData';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PostLoading from './components/PostLoading';
import formatRating from '../../helpers/formatRating';
import LocationLoading from './components/LocationLoading';
import number_processing from '../../helpers/numberProcessing';
import FastImage from 'react-native-fast-image';
import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';

const HomeScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [selected, setSelected] = useState(1);
  const [url, setUrl] = useState('getAllPosts');
  const [posts, setPosts] = useState([]);
  const [address, setAddress] = useState();
  const [checkIn, setCheckIn] = useState(true);
  const [coins, setCoins] = useState(0);
  const checkInDate = useRef();
  const [number, setNumber] = useState(0);
  const {user, dispatch} = useContext(AuthContext);

  const selectedPostCategory = item => {
    setSelected(item.id);
    switch (item.id) {
      case 1:
        setUrl('getAllPosts');
        break;
      case 2:
        setUrl('getPostsSortByDate');
        break;
      case 3:
        setUrl('getAllPosts');
        break;
      case 4:
        setUrl('getPostsSortByHeart');
        break;
    }
  };
  useFocusEffect(
    useCallback(async () => {
      if (user?.id) {
        if (user?.checkin_date) {
          setCheckIn(user?.check_in === 0 ? false : true);
          checkInDate.current = user.checkin_date;
          setCoins(user?.coins);
          setNumber(user?.number_checkin_days);
          if (
            moment(user?.checkin_date).format('YYYY-MM-DD') !==
            moment(Date.now()).format('YYYY-MM-DD')
          ) {
            try {
              await axios({
                method: 'POST',
                url: `${API_HOST}user/checkIn`,
                timeout: 5000,
                data: {
                  id: user?.id,
                  number_checkin_days:
                    user?.number_checkin_days === 7
                      ? 0
                      : user?.number_checkin_days,
                  coins: user?.coins,
                  checkin: false,
                },
                headers: {
                  Key: API_KEY,
                },
              });
              dispatch({
                type: 'CHECK_IN',
                payload: {
                  check_in: 0,
                  checkin_date: user?.checkin_date,
                  coins: user?.coins,
                  number_checkin_days:
                    user?.number_checkin_days === 7
                      ? 0
                      : user?.number_checkin_days,
                },
              });
            } catch (error) {}
          }
        } else getCheckInStatus();
      }
    }, []),
  );

  const setValue = value => setCheckIn(value);

  const getCheckInStatus = () => {
    axios({
      method: 'POST',
      url: `${API_HOST}user/getCheckInStatus`,
      timeout: 5000,
      data: {id: user.id},
      headers: {
        Key: API_KEY,
      },
    })
      .then(response => {
        dispatch({type: 'CHECK_IN', payload: response.data.data});
      })
      .catch(err => console.log(err));
  };

  const getData = () => {
    axios({
      method: 'POST',
      url: `${API_HOST}location/getFavoritesLocation`,
      timeout: 5000,
      headers: {
        Key: API_KEY,
      },
    })
      .then(response => setAddress(response.data.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const getData = () => {
      axios({
        method: 'POST',
        url: `${API_HOST}post/${url}`,
        timeout: 5000,
        headers: {
          Key: API_KEY,
        },
      })
        .then(response => {
          setPosts(response.data.data);
        })
        .catch(err => console.log(err));
    };
    if (isFocused) {
      setPosts(null);
      getData();
    }
  }, [selected, isFocused]);
  console.log(API_HOST);
  const renderAddress = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        activeOpacity={1}
        onPress={() => navigation.navigate('LocationDetails', {id: item?.id})}>
        <StatusBar hidden />
        <FastImage
          source={{
            uri: item.image_url,
          }}
          style={styles.favoriteImage}
        />
        <Text style={styles.itemTitle}>{item.name}</Text>
        <Text style={styles.content}>
          ⭐ {formatRating(item.rate)} ({item.count})
        </Text>
        <Text style={styles.content}>{item.address}</Text>
      </TouchableOpacity>
    );
  };

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
          <FastImage
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
            <FastImage
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
    <View style={styles.container}>
      <Header />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Địa điểm yêu thích</Text>
          <Text
            onPress={() => navigation.navigate('Locations')}
            style={styles.more}>
            Xem thêm
          </Text>
        </View>
        {address ? (
          <FlatList
            contentContainerStyle={{paddingRight: 32}}
            style={styles.flatlist}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={address}
            renderItem={renderAddress}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        ) : (
          <View
            style={{
              width: '100%',
              paddingHorizontal: 16,
            }}>
            <LocationLoading />
          </View>
        )}
        <View style={styles.postCategories}>
          {postCategories.map(item => (
            <Text
              key={item.id}
              onPress={() => selectedPostCategory(item)}
              style={[
                styles.categoryLabel,
                item.id === selected ? styles.active : styles.inactive,
              ]}>
              {item.title}
            </Text>
          ))}
        </View>
        {posts ? (
          <FlatList
            contentContainerStyle={{paddingBottom: 12}}
            style={styles.flatlist}
            data={posts}
            renderItem={renderPost}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => <View style={styles.postSeparator} />}
          />
        ) : (
          <PostLoading />
        )}
        {!checkIn && (
          <HomeDialog
            {...{checkIn, setValue, coins}}
            number_checkin_days={number}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
