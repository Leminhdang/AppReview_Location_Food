import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ToastAndroid,
  StatusBar,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import {AuthContext} from '../../Provider/AuthProvider';
import {API_HOST, API_KEY} from '@env';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import {COLOR} from '../../assets/color';
import {HeaderComponent} from '../../components';
import {showDate} from '../../helpers/formatDate';
import FastImage from 'react-native-fast-image';

const VoucherDetails = ({navigation, route}) => {
  const {id} = route.params;

  const {user} = useContext(AuthContext);
  const [dataVoucherDetail, setDataVoucherDetail] = useState([]);
  const [dataProfile, setDataProfile] = useState([]);
  const [statusVoucher, setStatusVoucher] = useState(false);
  useEffect(() => {
    axios({
      method: 'POST',
      url: `${API_HOST}voucher/getVoucherById`,
      data: {id: id},
      timeout: 5000,
      headers: {
        Key: API_KEY,
      },
    }).then(response => {
      setDataVoucherDetail(response?.data.data);
    });
    axios({
      method: 'POST',
      url: `${API_HOST}user/getUserById`,
      data: {id: user.id},
      timeout: 5000,
      headers: {
        Key: API_KEY,
      },
    })
      .then(response => {
        setDataProfile(response?.data.data);
      })
      .catch(err => console.log(err));
  }, []);
  console.log(API_HOST);
  const checkStatusVoucher = () => {
    axios({
      method: 'POST',
      url: `${API_HOST}voucher/checkRedeemVoucher`,
      data: {user_id: user.id, voucher_id: dataVoucherDetail[0]?.id},
      timeout: 5000,
      headers: {
        Key: API_KEY,
      },
    })
      .then(response => {
        setStatusVoucher(response?.data?.success);
      })
      .catch(err => console.log(err));
  };
  const redeemVoucher = () => {
    checkStatusVoucher();
    if (statusVoucher) {
      ToastAndroid.show(
        'Voucher này chỉ được đổi 1 lần. Bạn vui lòng kiểm tra ví voucher của mình',
        ToastAndroid.LONG,
      );
    } else {
      axios({
        method: 'POST',
        url: `${API_HOST}voucher/redeemVoucher`,
        data: {
          user_id: user.id,
          voucher_id: dataVoucherDetail[0]?.id,
          coins: dataVoucherDetail[0]?.coins,
        },
        timeout: 5000,
        headers: {
          Key: API_KEY,
        },
      }).then(response => {
        ToastAndroid.show(response.data?.msg, ToastAndroid.LONG);
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle="default"
      />
      <View style={{flexDirection: 'column', flex: 1}}>
        <FastImage
          style={styles.image}
          source={{uri: dataVoucherDetail[0]?.store_image}}
        />
        <HeaderComponent left={true} navigation={navigation} />
        <View style={styles.card}>
          <Text
            style={{
              fontFamily: 'BeVietnam-Bold',
              fontSize: 18,
              marginTop: windowHeight * 0.07,
            }}>
            {dataVoucherDetail[0]?.title}
          </Text>
          <View style={{flexDirection: 'row', margin: 8}}>
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'BeVietnam-Medium',
                  color: COLOR.GREY,
                }}>
                Số lần sử dụng
              </Text>
              <Text style={{fontFamily: 'BeVietnam-Bold'}}>
                {dataVoucherDetail[0]?.amount_used}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                marginLeft: windowWidth * 0.16,
              }}>
              <Text style={{fontFamily: 'BeVietnam-Medium', color: COLOR.GREY}}>
                Giá trị
              </Text>
              <Text style={{fontFamily: 'BeVietnam-Bold'}}>
                {dataVoucherDetail[0]?.coins} xu
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                marginLeft: windowWidth * 0.16,
              }}>
              <Text style={{fontFamily: 'BeVietnam-Medium', color: COLOR.GREY}}>
                Hạn sử dụng
              </Text>
              <Text style={{fontFamily: 'BeVietnam-Bold'}}>
                {showDate(dataVoucherDetail[0]?.expiry_date)}
              </Text>
            </View>
          </View>
          <View
            style={{
              width: windowWidth * 0.85,
              borderBottomWidth: 1,
              borderColor: COLOR.GREY,
            }}
          />
          <Text
            style={{margin: 8, fontFamily: 'BeVietnam-Regular', fontSize: 16}}>
            {dataVoucherDetail[0]?.detail}
          </Text>
        </View>
        <FastImage
          style={styles.imgItem}
          source={{uri: dataVoucherDetail[0]?.voucher_image}}
        />
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
          }}>
          <View
            style={{
              width: '100%',
              borderBottomWidth: 1,
              borderColor: COLOR.GREY,
              justifyContent: 'flex-end',
            }}
          />
          <View style={{flexDirection: 'row'}}>
            {dataProfile?.coins >= dataVoucherDetail[0]?.coins ? (
              <View style={{flexDirection: 'column', padding: 16}}>
                <Text style={{fontFamily: 'BeVietnam-Medium', fontSize: 18}}>
                  Bạn đã đủ điều kiện để sử dụng!
                </Text>
                <Text style={{fontFamily: 'BeVietnam-Regular', fontSize: 14}}>
                  Hãy tận hường nó nha 🤤
                </Text>
              </View>
            ) : (
              <View style={{flexDirection: 'column', padding: 16}}>
                <Text style={{fontFamily: 'BeVietnam-Medium', fontSize: 18}}>
                  Bạn hiện không đủ xu!
                </Text>
                <Text style={{fontFamily: 'BeVietnam-Regular', fontSize: 14}}>
                  Hãy tích cực làm nhiệm vụ lấy xu nào
                </Text>
              </View>
            )}
            <TouchableOpacity
              onPress={() => redeemVoucher()}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={styles.btnDoi}>Đổi</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: COLOR.WHITE,
    flex: 1,
  },
  image: {
    width: '100%',
    height: windowHeight * 0.3,
    position: 'absolute',
    opacity: 0.6,
  },
  card: {
    margin: 16,
    marginTop: windowHeight * 0.2,
    backgroundColor: COLOR.WHITE,
    borderRadius: 8,
    position: 'absolute',
    flexDirection: 'column',
    alignItems: 'center',
  },
  imgItem: {
    height: 80,
    width: 80,
    borderRadius: 90,
    marginTop: windowHeight * 0.065,
    marginLeft: windowWidth * 0.4,
  },
  btnDoi: {
    width: 45,
    fontFamily: 'BeVietnam-Medium',
    fontSize: 16,
    backgroundColor: COLOR.YELLOW,
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
  },
});
export default VoucherDetails;
