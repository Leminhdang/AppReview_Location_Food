import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {
  HeaderComponent,
  windowWidth,
  Rating,
  SignInToContinue,
  windowHeight,
} from '../../components';
import Feather from 'react-native-vector-icons/Feather';
import styles from './style';
import {COLOR} from '../../assets/color';
import {useFormik} from 'formik';
import {postsSchema} from '../../schema';
import TwitterTextView from 'react-native-twitter-textview';
import ImagePicker from 'react-native-image-crop-picker';
import {createThumbnail} from 'react-native-create-thumbnail';
import storage from '@react-native-firebase/storage';
import Spinner from 'react-native-loading-spinner-overlay';
import FileList from './components/FileList';
import axios from 'axios';
import {API_HOST, API_KEY} from '@env';
import {AuthContext} from '../../Provider/AuthProvider';
import Item from '../SearchLocation/Item';
import createFileName from '../../helpers/createFileName';
const initialValues = {
  title: '',
  content: '',
  hashtag: '',
  rating: 1,
};
const initialErrors = {
  title: true,
  content: true,
};

const PostsScreen = ({navigation, route}) => {
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState(null);
  const [details, setDetails] = useState([]);
  const {post_id, location_id} = route.params;
  const handleChangeLocation = (id, image_url, name, address, rating) => {
    setLocation({id, image_url, name, address, rating});
  };
  const {user} = useContext(AuthContext);

  const {handleChange, setFieldValue, isValid, handleSubmit, values} =
    useFormik({
      initialValues,
      validationSchema: postsSchema,
      initialErrors,
      onSubmit: val => onSubmit(val),
    });
  const onSubmit = async val => {
    setLoading(true);
    let images = [];
    let videos = [];
    for (let item of fileList) {
      const fileName = createFileName();
      let fileType = 'Images/';
      if (item.thumbnail) {
        fileType = 'Videos/';
      }
      try {
        const state = await storage()
          .ref(`${fileType}${fileName}`)
          .putFile(item.path);
        if (state.state === 'success') {
          let url = await storage()
            .ref(`${fileType}${fileName}`)
            .getDownloadURL();
          if (fileType === 'Images/') images.push(url);
          else videos.push(url);
        }
      } catch (error) {
        console.log(error);
        ToastAndroid.show('Vui lòng thử lại sau', ToastAndroid.SHORT);
        setLoading(false);
        return false;
      }
    }

    const data = {
      user_id: user.id,
      title: val.title,
      content: val.content,
      hashtag: val.hashtag,
      rating: val.rating,
      image: images,
      video: videos,
      location_id: location.id,
    };
    axios({
      method: 'POST',
      url: `${API_HOST}post/createPost`,
      timeout: 5000,
      data: data,
      headers: {
        Key: API_KEY,
      },
    })
      .then(function (response) {
        if (response.data.success) {
          ToastAndroid.show(response.data.msg, ToastAndroid.SHORT);
          setLoading(false);
          axios({
            method: 'POST',
            url: `${API_HOST}mission/updateRateOfProgress`,
            data: {mission_id: 12, user_id: user?.id},
            timeout: 5000,
            headers: {
              Key: API_KEY,
            },
          });
          navigation.goBack();
        }
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
        ToastAndroid.show('Vui lòng thử lại sau', ToastAndroid.SHORT);
      });
  };
  useEffect(() => {
    axios
      .all([
        axios({
          method: 'POST',
          url: `${API_HOST}post/getImageByPostId`,
          timeout: 5000,
          data: {id: post_id},
          headers: {
            Key: API_KEY,
          },
        }),
        axios({
          method: 'POST',
          url: `${API_HOST}post/getCountAndRating`,
          timeout: 5000,
          data: {id: location_id},
          headers: {
            Key: API_KEY,
          },
        }),
        axios({
          method: 'POST',
          url: `${API_HOST}post/getPostsById`,
          timeout: 5000,
          data: {id: post_id},
          headers: {
            Key: API_KEY,
          },
        }),
      ])
      .then(
        axios.spread((data1, data2, data3) => {
          setLocation(data2.data.data);
          setDetails(data3.data.data);
          if (data1.data.data.length > 0) {
            let arr = [];
            data1.data.data.map(image => {
              arr.push(image.image_url);
            });
            setImages(arr);
          }
        }),
      )
      .catch(err => console.log(err));
  }, []);
  const openImagePicker = () => {
    ImagePicker.openPicker({
      multiple: true,
    }).then(img => {
      img = img.map((item, index) => {
        return {id: fileList.length + index + 1, path: item.path};
      });
      setFileList([...fileList, ...img]);
    });
  };
  const openVideoPicker = () => {
    ImagePicker.openPicker({
      mediaType: 'video',
    }).then(video => {
      createThumbnail({
        url: video.path,
        timeStamp: 10000,
      })
        .then(response => {
          setFileList([
            ...fileList,
            {
              id: fileList.length + 1,
              path: video.path,
              thumbnail: response.path,
            },
          ]);
        })
        .catch(err => console.log({err}));
    });
  };
  const deleteItem = id => {
    setFileList(fileList.filter(item => item.id !== id));
  };
  return (
    <ScrollView
      style={{
        width: windowWidth,
        backgroundColor: COLOR.WHITE,
      }}
      nestedScrollEnabled={true}>
      <Spinner
        visible={loading}
        cancelable
        overlayColor="transparent"
        color="#a6a6a6"
      />
      <HeaderComponent
        title="Đăng bài"
        left
        navigation={navigation}
        type={isValid}
        label="Đăng bài"
        onPress={handleSubmit}
      />
      {user ? (
        <View style={styles.container}>
          <FileList
            {...{openImagePicker, openVideoPicker, deleteItem, fileList}}
          />
          <TextInput
            placeholder="Tiêu đề"
            style={styles.input}
            onChangeText={handleChange('title')}
          />
          <TextInput
            numberOfLines={10}
            multiline={true}
            style={[styles.input, styles.content]}
            onChangeText={handleChange('content')}
            placeholder="Nội dung"
          />
          <TextInput
            placeholder="Hashtag"
            style={[styles.input, styles.content]}
            onChangeText={handleChange('hashtag')}>
            <TwitterTextView>{values.hashtag}</TwitterTextView>
          </TextInput>
          <Text style={styles.title}>Địa điểm</Text>
          {location ? (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() =>
                navigation.navigate('SearchLocationScreen', {
                  ...{handleChangeLocation},
                })
              }>
              <Item item={location} />
            </TouchableOpacity>
          ) : (
            <TouchableWithoutFeedback
              onPress={() =>
                navigation.navigate('SearchLocationScreen', {
                  ...{handleChangeLocation},
                })
              }>
              <View style={[styles.input, styles.address]}>
                <Feather name="map-pin" size={20} />
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'BeVietnam-Medium',
                    marginLeft: 8,
                  }}>
                  Nhấn để chọn địa điểm
                </Text>
              </View>
            </TouchableWithoutFeedback>
          )}
          <Text style={styles.title}>Đánh giá</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'BeVietnam-Bold',
                marginTop: 8,
                marginRight: 20,
              }}>
              Tổng thể
            </Text>
            <Rating name="rating" {...{setFieldValue}} />
          </View>
        </View>
      ) : (
        <View style={{height: windowHeight}}>
          <SignInToContinue {...{navigation}} nameScreen="Posts" />
        </View>
      )}
    </ScrollView>
  );
};

export default PostsScreen;
