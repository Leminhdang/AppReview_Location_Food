import axios from 'axios';
import React, {useContext, useState} from 'react';
import {TextInput, ToastAndroid} from 'react-native';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {COLOR} from '../../../assets/color';
import {API_HOST, API_KEY} from '@env';
import {windowHeight, windowWidth} from '../../../components';
import {AuthContext} from '../../../Provider/AuthProvider';
import AntDesign from 'react-native-vector-icons/AntDesign';

const AddIntro = ({setValue, update, value}) => {
  const [visible, setVisible] = useState(false);
  const [info, setInfo] = useState(value);
  const {user} = useContext(AuthContext);

  const handleChangeVisible = () => {
    setVisible(prev => !prev);
  };
  const handleChange = text => {
    setInfo(text);
  };
  const onSubmit = async () => {
    axios({
      method: 'POST',
      url: `${API_HOST}user/updateInformation`,
      timeout: 5000,
      data: {
        id: user.id,
        information: info,
      },
      headers: {
        Key: API_KEY,
      },
    })
      .then(response => {
        if (response.data.success) {
          ToastAndroid.show(response.data.msg, ToastAndroid.SHORT);
          setValue(info);
          setVisible(false);
        } else {
          ToastAndroid.show('Vui lòng thử lại sau', ToastAndroid.SHORT);
          setVisible(false);
        }
      })
      .catch(error => {
        console.log(error);
        setVisible(false);
      });
  };
  console.log(API_HOST);
  return (
    <View>
      {update ? (
        <TouchableOpacity
          style={styles.description}
          onPress={handleChangeVisible}>
          <Text style={styles.countLabel}>Thêm mô tả về bạn </Text>
        </TouchableOpacity>
      ) : (
        <AntDesign
          name="edit"
          size={20}
          style={styles.icon}
          onPress={handleChangeVisible}
        />
      )}
      <Modal
        isVisible={visible}
        onBackButtonPress={handleChangeVisible}
        onBackdropPress={handleChangeVisible}>
        <View style={styles.container}>
          <Text style={styles.title}>
            Viết gì đó về bản thân ( giới hạn 100 từ)
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Thông tin của bạn"
              style={styles.input}
              value={info}
              maxLength={100}
              multiline={true}
              onChangeText={handleChange}
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.btn}
              onPress={handleChangeVisible}
              activeOpacity={0.8}>
              <Text>Huỷ</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn, styles.line]}
              activeOpacity={0.8}
              onPress={onSubmit}>
              <Text>Lưu</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  description: {
    width: '50%',
    alignItems: 'center',
    borderWidth: 0.5,
    paddingVertical: 5,
    borderRadius: 8,
    marginTop: 16,
    paddingHorizontal: 32,
  },
  buttonContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    marginTop: 20,
  },
  countLabel: {
    fontFamily: 'BeVietnam-Medium',
    fontSize: 14,
  },
  container: {
    backgroundColor: COLOR.WHITE,
    width: windowWidth - 40,
    alignItems: 'center',
    paddingVertical: 16,
    height: windowHeight - 650,
    borderRadius: 10,
  },
  title: {
    fontFamily: 'BeVietnam-Medium',
    fontSize: 16,
  },
  inputContainer: {
    width: '100%',
    paddingHorizontal: 16,
    height: '50%',
  },
  input: {
    width: '100%',
    // borderBottomWidth: 1,
    // borderBottomColor: COLOR.LIGHTGREY,
  },
  btn: {
    borderTopWidth: 0.5,
    width: '50%',
    paddingVertical: 12,
    alignItems: 'center',
  },
  line: {
    borderLeftWidth: 1,
  },
  icon: {
    marginLeft: 16,
  },
});

export default AddIntro;
