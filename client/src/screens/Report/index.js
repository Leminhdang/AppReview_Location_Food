import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ToastAndroid,
  TextInput,
} from 'react-native';
import {COLOR} from '../../assets/color';
import {API_HOST, API_KEY} from '@env';
import {AuthContext} from '../../Provider/AuthProvider';
import styles from './style';
import axios from 'axios';
import {HeaderComponent} from '../../components';

const Report = ({navigation, route}) => {
  const {user} = useContext(AuthContext);
  const [value, setValue] = useState('');
  const [index, setIndex] = useState('');
  const {post_id, receiver_id} = route.params;
  const [valueInput, setValueInput] = useState('');
  const sendReport = async () => {
    if (value.length > 0) {
      axios
        .all([
          axios({
            method: 'POST',
            url: `${API_HOST}post/reportPost`,
            data: {
              post_id: post_id,
              receiver_id: receiver_id,
              sender_id: user.id,
              cause: value,
              content: valueInput,
            },
            timeout: 5000,
            headers: {
              Key: API_KEY,
            },
          }),
          axios({
            method: 'POST',
            url: `${API_HOST}notify/sendNotify`,
            timeout: 5000,
            data: {
              sender_id: user.id,
              receiver_id,
              type: 'report',
              posts_id: post_id,
            },
            headers: {
              Key: API_KEY,
            },
          }),
        ])
        .then(
          axios.spread((data1, data2) => {
            if (data1.data?.success) {
              ToastAndroid.show(
                'Báo cáo của bạn chúng tôi đã ghi nhận',
                ToastAndroid.SHORT,
              );
              navigation.goBack();
            } else {
              ToastAndroid.show(
                'Báo cáo của bạn bị lỗi vui lòng thử lại sau',
                ToastAndroid.SHORT,
              );
            }
           })).catch(err => console.log(err));
    } else {
      ToastAndroid.show(
        'Vui lòng chọn lí do báo cáo bài viết',
        ToastAndroid.SHORT,
      );
    }
  };
  return (
    <View style={styles.container}>
      <HeaderComponent title="Báo cáo" left={true} type={false} />
      <View style={{paddingLeft: 20, paddingRight: 20}}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={[
              styles.btn,
              index === 1 ? {backgroundColor: COLOR.YELLOW} : {},
            ]}
            onPress={() => {
              setValue('Nội dung nhạy cảm');
              setIndex(1);
            }}>
            <Text style={styles.text}>Nội dung nhạy cảm</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.btn,
              index === 2 ? {backgroundColor: COLOR.YELLOW} : {},
            ]}
            onPress={() => {
              setValue('Nội dung sai sự thật');
              setIndex(2);
            }}>
            <Text style={styles.text}>Nội dung sai sự thật</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[
            styles.btn,
            index === 3 ? {backgroundColor: COLOR.YELLOW} : {},
          ]}
          onPress={() => {
            setValue('Nội dung không liên quan đến địa điểm');
            setIndex(3);
          }}>
          <Text style={styles.text}>Nội dung không liên quan đến địa điểm</Text>
        </TouchableOpacity>

        <View style={styles.view}>
          <TouchableOpacity
            style={[
              styles.btn,
              index === 4 ? {backgroundColor: COLOR.YELLOW} : {},
            ]}
            onPress={() => {
              setValue('Bài viết spam');
              setIndex(4);
            }}>
            <Text style={styles.text}>Bài viết spam</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.btn,
              index === 5 ? {backgroundColor: COLOR.YELLOW} : {},
            ]}
            onPress={() => {
              setValue('Từ ngữ không hợp lệ');
              setIndex(5);
            }}>
            <Text style={styles.text}>Từ ngữ không hợp lệ</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.view}>
          <TouchableOpacity
            style={[
              styles.btn,
              index === 6 ? {backgroundColor: COLOR.YELLOW} : {},
            ]}
            onPress={() => {
              setValue('Hình ảnh/video không hợp lệ');
              setIndex(6);
            }}>
            <Text style={styles.text}>Hình ảnh/video không hợp lệ</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.btn,
              index === 7 ? {backgroundColor: COLOR.YELLOW} : {},
            ]}
            onPress={() => {
              setValue('Khác');
              setIndex(7);
            }}>
            <Text style={styles.text}>Khác</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.textTitle}>
          Vui lòng điền lí do báo cáo(Không bắt buộc)
        </Text>
        <View style={styles.textInput}>
          <TextInput
            maxLength={1000}
            multiline={true}
            onChangeText={text => setValueInput(text)}
            placeholder="Vui lòng nhập lí do của bạn(Không quá 1000 ký tự)"
          />
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 16,
          }}>
          <TouchableOpacity
            onPress={() => sendReport()}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: COLOR.YELLOW,
              height: 30,
              width: 150,
              paddingHorizontal: 8,
              borderRadius: 5,
              justifyContent: 'center',
            }}>
            <Text style={styles.text}>Gửi báo cáo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Report;
