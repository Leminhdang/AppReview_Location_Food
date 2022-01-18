import React, {useCallback, useContext, useState} from 'react';
import {View, Text, Modal, Image, TouchableOpacity} from 'react-native';
import styles from './style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FastImage from 'react-native-fast-image';
import {COLOR} from '../../assets/color';
import {API_HOST, API_KEY} from '@env';
import axios from 'axios';
import {AuthContext} from '../../Provider/AuthProvider';
import {useFocusEffect} from '@react-navigation/native';

const DATA = [
  {id: 1, title: 'Ngày 1'},
  {id: 2, title: 'Ngày 2'},
  {id: 3, title: 'Ngày 3'},
  {id: 4, title: 'Ngày 4'},
  {id: 5, title: 'Ngày 5'},
  {id: 6, title: 'Ngày 6'},
  {id: 7, title: 'Ngày 7'},
];

const HomeDialog = ({checkIn, setValue, coins, number_checkin_days}) => {
  const {user, dispatch} = useContext(AuthContext);
  const [received, setReceived] = useState(number_checkin_days);
  const [totalCoin, setTotalCoin] = useState(coins);
  const [show, setShow] = useState(!checkIn);

  const updateStateCheckIn = () => {
    axios({
      method: 'POST',
      url: `${API_HOST}user/checkIn`,
      timeout: 5000,
      data: {
        id: user?.id,
        number_checkin_days: number_checkin_days + 1,
        coins: coins + 100,
        checkin: true,
      },
      headers: {
        Key: API_KEY,
      },
    })
      .then(response => {
        if (response.data.success) {
          setShow(false);
          setTotalCoin(prev => prev + 100);
          setReceived(prev => prev + 1);
          dispatch({
            type: 'CHECK_IN',
            payload: {
              check_in: 1,
              checkin_date: Date.now(),
              number_checkin_days:
                number_checkin_days < 7 ? number_checkin_days + 1 : 0,
              coins: coins + 100,
            },
          });
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <Modal transparent visible={true} animationType="fade">
      <View style={[styles.container]}>
        <View style={[styles.modal, !show && styles.height50]}>
          <View style={styles.headerContainer}>
            <View style={styles.header}>
              <View style={styles.logoContainer}>
                <FastImage
                  source={require('../../assets/images/logocut.png')}
                  style={styles.logo}
                />
                <Text style={styles.logoText}>RadarFood</Text>
              </View>
              <View style={styles.coinsTotal}>
                <View style={styles.coinContainer}>
                  <FastImage
                    style={styles.coin}
                    source={require('../../assets/images/coin.png')}
                  />
                  <Text>{totalCoin} xu</Text>
                </View>
              </View>
            </View>
            <FastImage
              source={require('../../assets/images/coinBG.jpg')}
              style={styles.img}
            />
            <Text style={styles.title}>Nhận xu mỗi ngày</Text>
            <Text style={styles.content}>
              Nhớ đăng nhập hằng ngày để nhận xu của RadarFood nhà các tình yêu!
            </Text>
            <View style={styles.coinListContainer}>
              {DATA.map((item, index) => (
                <View key={index}>
                  {received && received >= item.id ? (
                    <View style={styles.coinImg}>
                      <AntDesign
                        name="checkcircle"
                        size={24}
                        style={{marginBottom: 2}}
                        color={COLOR.YELLOW}
                      />
                    </View>
                  ) : (
                    <FastImage
                      source={require('../../assets/images/coin.png')}
                      style={styles.coinImg}
                    />
                  )}
                  <Text style={styles.daysText}>{item.title}</Text>
                </View>
              ))}
            </View>
            {show ? (
              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.8}
                onPress={updateStateCheckIn}>
                <Text style={styles.label}>Nhấn để nhận ngay 100 xu nè</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.text}>Quay lại vào ngày mai để tiếp tục nhận thưởng</Text>
            )}
          </View>
          <View style={styles.closeButtonContainer}>
            <Text style={styles.content} onPress={() => setValue(true)}>
              Đóng
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default React.memo(HomeDialog);
