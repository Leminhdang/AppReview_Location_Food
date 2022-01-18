import React, {useEffect, useContext, useRef, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
} from 'react-native';
import {COLOR} from '../../assets/color';
import {HeaderComponent, windowWidth, windowHeight} from '../../components';
import styles from './style';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {API_HOST, API_KEY} from '@env';
import axios from 'axios';
import LinerGradient from 'react-native-linear-gradient';

import {AuthContext} from '../../Provider/AuthProvider';
const Mission = ({navigation}) => {
  const {user} = useContext(AuthContext);

  const Item = ({item}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          padding: 8,
          backgroundColor: COLOR.WHITE,
          margin: 8,
          flex: 1,
        }}>
        <View style={styles.viewMisson}>
          <LinerGradient
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            colors={['#ff9900', '#ffcc00']}
            style={styles.linear}>
            <View>
              <FontAwesome5
                name="rocket"
                size={22}
                style={{marginTop: 6, color: COLOR.WHITE}}
              />
            </View>
          </LinerGradient>
          <View style={styles.viewMisson2}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.text}>{item.title}</Text>
              <Text style={styles.text}>
                {item.rate_of_progress + '/' + item.maximum_progress}
              </Text>
            </View>
            <Text style={styles.textDetail}>{item.content}</Text>
          </View>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() =>
              checkStatusMission(item.mission_id, item.coins, item.exp)
            }
            style={{
              backgroundColor:
                item.rate_of_progress < item.maximum_progress
                  ? COLOR.GREY
                  : COLOR.YELLOW,
              borderRadius: 5,
              height: 25,
              justifyContent: 'center',
              paddingHorizontal: 8,
            }}
            disabled={item.rate_of_progress < item.maximum_progress}>
            <Text style={{fontFamily: 'BeVietnam-Medium'}}>
              {item.status === 1 ? 'Đã nhận' : 'Nhận quà'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const renderItem = ({item}) => {
    return <Item item={item} />;
  };
  const [reload, setReload] = useState(false);
  const updateCoinsAndExp = (coins, exp) => {
    axios({
      method: 'POST',
      url: `${API_HOST}user/updateCoinsAndExp`,
      data: {user_id: user.id, coins: coins, exp: exp},
      timeout: 5000,
      headers: {
        Key: API_KEY,
      },
    }).then(response => {
      if (response.data?.success) {
        ToastAndroid.show('Nhận thưởng thành công', ToastAndroid.SHORT);
      }
    });
  };
  const updateStatus = mission_id => {
    axios({
      method: 'POST',
      url: `${API_HOST}mission/updateStatus`,
      data: {user_id: user.id, mission_id: mission_id},
      timeout: 5000,
      headers: {
        Key: API_KEY,
      },
    });
  };
  const checkStatusMission = (mission_id, coins, exp) => {
    axios({
      method: 'POST',
      url: `${API_HOST}mission/checkStatus`,
      data: {user_id: user.id, mission_id: mission_id},
      timeout: 5000,
      headers: {
        Key: API_KEY,
      },
    }).then(response => {
      if (!response.data?.success) {
        updateCoinsAndExp(coins, exp);
        updateStatus(mission_id);
        setReload(true);
      } else {
        ToastAndroid.show('Bạn đã nhận thưởng rồi', ToastAndroid.SHORT);
      }
    });
  };
  const [dataMission, setDataMission] = useState([]);
  useEffect(() => {
    const getData = async () => {
      await axios
        .post(API_HOST + 'mission/getMissionByUserId', {
          user_id: user.id,
        })
        .then(response => {
          setDataMission(response.data.data[0]);
          if (response.data.data[0].length === 0) {
            axios
              .post(API_HOST + 'mission/addStatusMissionByOneUser', {
                user_id: user.id,
              })
              .then(response => {
                setReload(true);
              });
          }
        })
        .catch(error => {
          console.log('error ' + error);
        });
    };
    getData();
  }, [reload]);
  console.log(API_HOST);
  return (
    <SafeAreaView>
      <View style={{backgroundColor: COLOR.WHITE, height: '100%'}}>
        <HeaderComponent title="Nhiệm vụ" left={true} navigation={navigation} />
        {dataMission.length > 0 ? (
          <FlatList
            style={{
              backgroundColor: COLOR.WHITE,
              marginTop: 8,
            }}
            data={dataMission}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        ) : null}
      </View>
    </SafeAreaView>
  );
};
export default Mission;
