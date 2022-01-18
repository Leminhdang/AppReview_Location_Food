import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Button,
  ToastAndroid,
} from 'react-native';
import {HeaderComponent} from '../../components';
import styles from './styles';
import IonIcon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import {API_HOST, API_KEY} from '@env';
import storage, {firebase} from '@react-native-firebase/storage';
import DatePicker from './components/DatePicker';
import FastImage from 'react-native-fast-image';

const NewAddress = ({navigation}) => {
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [hours_open, setHoursOpen] = useState('');
  const [hours_close, setHoursClose] = useState('');
  const [lowest_price, setLowestPrice] = useState('');
  const [biggest_price, setBiggestPrice] = useState('');
  const [insertId, setInsertId] = useState('');

  const takePhoto = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setImage(image.path);
    });
  };

  const uploadImage = async () => {
    let reference = firebase
      .storage()
      .ref('Images/' + image?.replace(/^.*[\\\/]/, ''));
    let task = reference.putFile(image);
    task
      .then(async () => {
        let url = await storage()
          .ref('Images/' + image.replace(/^.*[\\\/]/, ''))
          .getDownloadURL();
        addLocation(url);
      })
      .catch(e => console.log('uploading image error => ', e));
  };

  const addLocation = async url => {
    axios({
      method: 'POST',
      url: `${API_HOST}location/addLocation`,
      timeout: 5000,
      data: {
        name: name,
        address: address,
        phone: phone,
        opening_hours: hours_open + ':' + hours_close,
        lowest_price: lowest_price,
        biggest_price: biggest_price,
        image_url: url,
      },
      headers: {
        Key: API_KEY,
      },
    })
      .then(function (response) {
        if (response.data.success) {
          ToastAndroid.show('Thêm địa chỉ thành công', ToastAndroid.SHORT);
          setInsertId(response.data.msg);
          navigation.goBack();
        } else {
          ToastAndroid.show(
            'Thêm địa chỉ không thành công',
            ToastAndroid.SHORT,
          );
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <HeaderComponent
        navigation={navigation}
        title="Thêm địa điểm"
        left={true}
        type={true}
        label="Tạo"
        onPress={() => uploadImage()}
      />
      <View style={{padding: 8}}>
        <Text style={styles.title}>Tên địa điểm</Text>
        <TextInput
          placeholder="Nhập tên địa điểm"
          style={styles.input}
          value={name}
          onChangeText={e => setName(e)}
        />
        <Text style={styles.title}>Địa chỉ</Text>
        <TextInput
          placeholder="Nhập địa chỉ"
          style={styles.input}
          value={address}
          onChangeText={e => setAddress(e)}
        />
        <Text style={styles.title}>Giờ hoạt động</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <DatePicker
            placeholder="Giờ mở cửa"
            onPress={currentDate =>
              setHoursOpen(
                currentDate.getHours() + ':' + currentDate.getMinutes(),
              )
            }
          />
          <Text>đến</Text>
          <DatePicker
            placeholder="Giờ đóng cửa"
            onPress={currentDate =>
              setHoursClose(
                currentDate.getHours() + ':' + currentDate.getMinutes(),
              )
            }
          />
        </View>
        <Text style={styles.title}>Số điện thoại</Text>
        <TextInput
          placeholder="012345678"
          keyboardType="numeric"
          style={styles.input}
          value={phone}
          onChangeText={e => setPhone(e)}
        />
        <Text style={styles.title}>Giá trung bình</Text>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <TextInput
            placeholder="Nhập giá thấp nhất"
            keyboardType="numeric"
            style={[styles.input, {width: '49%', marginRight: 8}]}
            value={lowest_price}
            onChangeText={e => setLowestPrice(e)}
          />
          <TextInput
            placeholder="Nhập giá cao nhất"
            keyboardType="numeric"
            style={[styles.input, {width: '49%'}]}
            value={biggest_price}
            onChangeText={e => setBiggestPrice(e)}
          />
        </View>

        <View style={{flexDirection: 'row'}}>
          {image == '' ? (
            <TouchableOpacity
              style={styles.button}
              onPress={() => takePhoto()}
              activeOpacity={1}>
              <IonIcon name="image-outline" size={30} />
              <Text style={styles.label}>Thêm ảnh</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => takePhoto()} activeOpacity={1}>
              <FastImage
                source={{uri: image}}
                style={{width: 100, height: 100, margin: 8, borderRadius: 10}}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default NewAddress;
