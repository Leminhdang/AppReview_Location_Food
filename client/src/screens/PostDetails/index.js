import React, {
  useState,
  useCallback,
  useContext,
  useEffect,
  createRef,
} from 'react';
import {
  View,
  StatusBar,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import { windowWidth } from '../../components';
import styles from './styles';
import numberProcessing from '../../helpers/numberProcessing';
import axios from 'axios';
import { API_HOST, API_KEY } from '@env';
import { SliderBox } from 'react-native-image-slider-box';
import Header from './components/Header';
import formatRating from '../../helpers/formatRating';
import FastImage from 'react-native-fast-image';
import Actions from './components/Actions';
import BottomSheet from './components/BottomSheet';
import { useNavigation } from '@react-navigation/core';
import { AuthContext } from '../../Provider/AuthProvider';
import SlideImage from './components/SlideImage';
const actionSheetRef = createRef();

const PostDetail = ({ route }) => {
  const { user_id, post_id } = route.params.item;
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();
  const [images, setImages] = useState([]);
  const [location, setLocation] = useState(null);
  const [detail, setDetail] = useState(null);
  const [statusSave, setStatusSave] = useState(false);
  const [videos, setVideos] = useState([]);
  const openBottomSheet = () => {
    actionSheetRef.current?.setModalVisible();
  };
  const closeBottomSheet = () => {
    actionSheetRef.current?.hide();
  };
  const updateStatus = () => {
    setStatusSave(!statusSave);
  };
  useEffect(() => {
    const getData = () => {
      axios
        .all([
          axios({
            method: 'POST',
            url: `${API_HOST}post/getImageByPostId`,
            timeout: 5000,
            data: { id: post_id },
            headers: {
              Key: API_KEY,
            },
          }),
          axios({
            method: 'POST',
            url: `${API_HOST}post/getCountAndRating`,
            timeout: 5000,
            data: { id: post_id },
            headers: {
              Key: API_KEY,
            },
          }),
          axios({
            method: 'POST',
            url: `${API_HOST}post/getPostsById`,
            timeout: 5000,
            data: { id: post_id },
            headers: {
              Key: API_KEY,
            },
          }),
          axios({
            method: 'POST',
            url: `${API_HOST}post/checkPostSave`,
            timeout: 5000,
            data: { post_id: post_id, user_id: user?.id },
            headers: {
              Key: API_KEY,
            },
          }),
          axios({
            method: 'POST',
            url: `${API_HOST}post/getVideoByPostId`,
            timeout: 5000,
            data: { id: post_id },
            headers: {
              Key: API_KEY,
            },
          }),
        ])
        .then(
          axios.spread((data1, data2, data3, data4, data5) => {
            setLocation(data2.data.data);
            setDetail(data3.data.data);
            setStatusSave(data4.data.success);
            setImages(data1.data.data);
            setVideos(data5.data.data);
          }),
          // setVideos
        )
        .catch(err => console.log(err));
    };
    getData();
  }, []);
  console.log(API_HOST);
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Header {...{ user_id, detail, openBottomSheet }} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <SlideImage data={[...images,...videos]} />
        <View style={styles.body}>
          <View style={styles.rateAndViews}>
            <Text style={styles.title}>
              ⭐ {formatRating(detail?.rating)}
              <Text style={styles.maxRate}> /5 điểm</Text>
            </Text>
          </View>
          <Text style={styles.title}>{detail?.title?.toUpperCase()}</Text>
          <Text style={styles.content}>{detail?.content}</Text>
          {detail?.location_id && <TouchableOpacity
            style={styles.locationItem}
            onPress={() =>
              navigation.navigate('LocationDetails', {
                id: detail?.location_id,
              })
            }
            activeOpacity={0.8}>
            <View style={styles.locationImageContainer}>
              <FastImage
                source={{ uri: location?.image_url }}
                style={styles.locationImage}
              />
            </View>
            <View style={styles.addressInfo}>
              <Text style={styles.locationName}>{location?.name}</Text>
              <Text style={styles.locationAddress}>{location?.address}</Text>
              <Text>
                ⭐
                <Text style={styles.title}>
                  {formatRating(location?.rating)}
                </Text>
                <Text style={styles.content}>
                  ( {numberProcessing(location?.count)} đánh giá )
                </Text>
              </Text>
            </View>
          </TouchableOpacity>}
          <Actions {...{ post_id }} receiver_id={user_id} />
        </View>
      </ScrollView>
      <BottomSheet
        {...{
          detail,
          location,
          closeBottomSheet,
          actionSheetRef,
          navigation,
          post_id,
          user_id,
          statusSave,
          updateStatus,
        }}
        location_id={detail?.location_id}
      />
    </View>
  );
};
export default PostDetail;
