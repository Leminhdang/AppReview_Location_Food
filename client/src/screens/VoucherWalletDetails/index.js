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
  Modal,
  TouchableWithoutFeedback,
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

const VoucherWalletDetails = ({navigation, route}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const {id, id_voucher, status} = route.params;
  const [dataVoucherDetail, setDataVoucherDetail] = useState([]);
  const [statusVoucher, setStatusVoucher] = useState();
  useEffect(() => {
    axios({
      method: 'POST',
      url: `${API_HOST}voucher/getVoucherById`,
      data: {id: id_voucher},
      timeout: 5000,
      headers: {
        Key: API_KEY,
      },
    }).then(response => {
      setDataVoucherDetail(response?.data.data);
    });
  }, []);
  console.log(API_HOST);
  const updateStatus = () => {
    axios({
      method: 'POST',
      url: `${API_HOST}voucher/updateStatus`,
      data: {id: id},
      timeout: 5000,
      headers: {
        Key: API_KEY,
      },
    }).then(response => {
      setStatusVoucher(response?.data.success);
    });
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
          {status === 0 ? (
            <View style={{flexDirection: 'row'}}>
              <View style={{flexDirection: 'column', padding: 16}}>
                <Text style={{fontFamily: 'BeVietnam-Medium', fontSize: 18}}>
                  Bạn đã đủ điều kiện để sử dụng!
                </Text>
                <Text style={{fontFamily: 'BeVietnam-Regular', fontSize: 14}}>
                  Hãy tận hường nó nha 🤤
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setModalVisible(!modalVisible)}
                style={{
                  alignItems: 'center',
                  flex: 1,
                  margin: 10,
                  justifyContent: 'center',
                }}>
                <Text style={styles.btnDoi}>Sử dụng</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{flexDirection: 'row'}}>
              <View style={{flexDirection: 'column', padding: 16}}>
                <Text style={{fontFamily: 'BeVietnam-Medium', fontSize: 18}}>
                  Bạn đã sử dụng voucher này rồi!
                </Text>
                <Text style={{fontFamily: 'BeVietnam-Regular', fontSize: 14}}>
                  Vui lòng chọn hoặc đổi voucher khác 🤤
                </Text>
              </View>
            </View>
          )}
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            updateStatus();
            setModalVisible(!modalVisible);
          }}>
          <TouchableWithoutFeedback
            onPress={() => {
              setModalVisible(false);
              updateStatus();
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 22,
              }}>
              <View
                style={{
                  margin: 20,
                  backgroundColor: 'white',
                  borderRadius: 20,
                  padding: 35,
                  alignItems: 'center',
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 4,
                  elevation: 5,
                }}>
                <Text
                  style={{
                    marginBottom: 15,
                    textAlign: 'center',
                    fontFamily: 'BeVietnam-Regular',
                    fontSize: 16,
                  }}>
                  Mã sử dụng của bạn là
                </Text>
                <Text
                  style={{
                    marginBottom: 15,
                    textAlign: 'center',
                    fontFamily: 'BeVietnam-Regular',
                    fontSize: 24,
                    color: COLOR.YELLOW,
                  }}>
                  {dataVoucherDetail[0]?.code}
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
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
    width: 80,
    fontFamily: 'BeVietnam-Medium',
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR.YELLOW,
    padding: 6,
    borderRadius: 8,
  },
});
export default VoucherWalletDetails;
