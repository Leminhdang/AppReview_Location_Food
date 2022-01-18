import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {AuthContext} from '../../Provider/AuthProvider';
import {HeaderComponent} from '../../components';
import {COLOR} from '../../assets/color';
import axios from 'axios';
import {API_HOST, API_KEY} from '@env';
import LinerGradient from 'react-native-linear-gradient';
import {ProgressBar} from 'react-native-paper';
import styles from './styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {showDate} from '../../helpers/formatDate';
import FastImage from 'react-native-fast-image';

const Member = ({navigation}) => {
  const [dataVoucher, setDataVoucher] = useState([]);
  const [dataProfile, setDataProfile] = useState([]);
  const {user} = useContext(AuthContext);
  useEffect(() => {
    axios({
      method: 'POST',
      url: `${API_HOST}voucher`,
      timeout: 5000,
      headers: {
        Key: API_KEY,
      },
    })
      .then(response => {
        setDataVoucher(response?.data.data);
      })
      .catch(err => console.log(err));
    axios({
      method: 'POST',
      url: `${API_HOST}user/getUserById`,
      timeout: 5000,
      data: {id: user.id},
      headers: {
        Key: API_KEY,
      },
    }).then(response => {
      setDataProfile(response?.data.data);
    });
  }, []);
  console.log(API_HOST);

  const Item = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.item}
        onPress={() => navigation.navigate('VoucherDetails', {id: item.id})}>
        <View style={{flexDirection: 'column', left: -16}}>
          <View
            style={{
              overflow: 'hidden',
              backgroundColor: COLOR.WHITE,
              borderColor: COLOR.BLACK,
              width: 38,
              height: 38,
              borderRadius: 44 / 2,
            }}></View>
          <View
            style={{
              backgroundColor: COLOR.WHITE,
              borderColor: COLOR.BLACK,
              width: 38,
              height: 38,
              borderRadius: 44 / 2,
            }}></View>
          <View
            style={{
              backgroundColor: COLOR.WHITE,
              borderColor: COLOR.BLACK,
              width: 38,
              height: 38,
              borderRadius: 44 / 2,
            }}></View>
        </View>
        <View
          style={{
            left: -23,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 8,
          }}>
          <FastImage
            source={{uri: item.voucher_image}}
            style={{height: 100, width: 150, borderRadius: 8}}
          />
        </View>
        <View
          style={{
            flexDirection: 'column',
            marginLeft: 8,
            right: 30,
            justifyContent: 'center',
            width: '50%',
          }}>
          <Text style={{fontFamily: 'BeVietnam-Bold', fontSize: 16}}>
            {item.title}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
            <Text style={{fontFamily: 'BeVietnam-Bold', fontSize: 16}}>
              Giá trị :{' ' + item.coins}
            </Text>
            <FontAwesome5 name="coins" color={COLOR.YELLOW} />
          </View>
          <Text style={{fontFamily: 'BeVietnam-Medium', fontSize: 14}}>
            HSD: {showDate(item.expiry_date)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItem = ({item}) => {
    return (
      <View>
        <Item item={item} />
      </View>
    );
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <StatusBar hidden />
        <HeaderComponent
          title="Thành viên"
          left={true}
          navigation={navigation}
        />
        <LinerGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#ffaa3cb3', '#ffaa3cd9', '#ffaa3cff']}
          style={{margin: 16, borderRadius: 20}}>
          <View style={{padding: 8}}>
            <View style={styles.viewCard}>
              <View style={{marginLeft: 8}}>
                <Text style={styles.levelText}>Level {dataProfile?.level}</Text>
                <Text style={styles.nameText}>{dataProfile?.fullname}</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                }}>
                <FastImage
                  style={styles.imgLogo}
                  source={require('../../assets/images/logocut.png')}
                />
              </View>
            </View>
            <ProgressBar
              progress={
                dataProfile?.exp > 0
                  ? dataProfile?.exp * 0.01
                  : dataProfile?.exp
              }
              color={COLOR.GREY}
              style={{margin: 8}}
            />
            <Text style={styles.textExp}>
              Đã tích lũy {dataProfile?.exp} exp
            </Text>
          </View>
        </LinerGradient>
        <View style={{flexDirection: 'row', padding: 16}}>
          <View style={{flexDirection: 'column', alignItems: 'center'}}>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.btnNv}
              onPress={() => navigation.navigate('Mission')}>
              <AntDesign name="bars" size={44} />
            </TouchableOpacity>
            <Text
              style={{
                fontFamily: 'BeVietnam-Medium',
                fontSize: 14,
                color: COLOR.GREY,
              }}>
              Nhiệm vụ
            </Text>
          </View>
          <View style={{flexDirection: 'column', alignItems: 'center'}}>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.btnGift}
              onPress={() => navigation.navigate('VoucherWallet')}>
              <FontAwesome5 name="gifts" size={40} />
            </TouchableOpacity>

            <Text
              style={{
                fontFamily: 'BeVietnam-Medium',
                fontSize: 14,
                color: COLOR.GREY,
                marginLeft: 30,
              }}>
              Ví voucher
            </Text>
          </View>
        </View>
        <View style={{padding: 16, flexDirection: 'row'}}>
          <Text style={styles.text}>Đổi quà tặng</Text>
          <View style={styles.coin}>
            <FastImage
              style={{width: 25, height: 25}}
              source={require('../../assets/images/coin.png')}
            />
            <Text style={{fontFamily: 'BeVietnam-Bold', fontSize: 14}}>
              {dataProfile?.coins}
            </Text>
          </View>
        </View>
        <FlatList
          data={dataVoucher}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

export default Member;
