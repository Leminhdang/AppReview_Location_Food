import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {showDate} from '../../../helpers/formatDate';
import {API_HOST, API_KEY} from '@env';
import {FlatList} from 'react-native';
import {AuthContext} from '../../../Provider/AuthProvider';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {COLOR} from '../../../assets/color';
import styles from '../style';
import FastImage from 'react-native-fast-image';
const VoucherUsed = () => {
  const [data, setData] = useState([]);
  const {user} = useContext(AuthContext);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      axios({
        method: 'POST',
        url: `${API_HOST}voucher/getVoucherByStatus`,
        timeout: 5000,
        data: {user_id: user.id, status: 1},
        headers: {
          Key: API_KEY,
        },
      })
        .then(response => {
          setData(response.data?.data);
        })
        .catch(err => console.log(err));
    }
  }, [isFocused]);
  console.log(API_HOST);
  const RenderItem = ({item}) => {
    return <Item item={item} />;
  };
  const Item = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          navigation.navigate('VoucherWalletDetails', {
            id_voucher: item.voucher_id,
            id: item.id,
            status: item.status,
          })
        }>
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
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}>
            <Text
              style={{
                fontFamily: 'BeVietnam-Bold',
                fontSize: 16,
                marginRight: 16,
              }}>
              Giá trị :{' ' + item.coins}
            </Text>
            <FontAwesome5 name="coins" color={COLOR.YELLOW} size={18} />
          </View>
          <Text style={{fontFamily: 'BeVietnam-Medium', fontSize: 14}}>
            HSD: {showDate(item.expiry_date)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      {data.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={data}
          renderItem={RenderItem}
          keyExtractor={item => item.id}
        />
      ) : (
        <Text style={styles.message}>Bạn chưa có voucher nào</Text>
      )}
    </View>
  );
};

export default React.memo(VoucherUsed);
