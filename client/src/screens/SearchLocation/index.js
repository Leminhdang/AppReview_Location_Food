import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {COLOR} from '../../assets/color';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styles from './style';
import {HeaderComponent} from '../../components';
import axios from 'axios';
import Item from './Item';
import {API_HOST} from '@env';

const Index = ({navigation, route}) => {
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          handleChangeLocation(
            item.id,
            item.image_url,
            item.name,
            item.address,
            item.rating,
          );
          navigation.goBack();
        }}>
        <Item item={item} />
      </TouchableOpacity>
    );
  };
  const [value, setValue] = useState('');
  const [dataLocation, setDataLocation] = useState([]);
  const {handleChangeLocation} = route.params;

  useEffect(() => {
    axios
      .post(API_HOST + 'location/searchLocation', {value: value ? value : ' '})
      .then(res => {
        setDataLocation(res.data.data);
      })
      .catch(error => {
        console.log('error ' + error);
      });
    return () => {
      setDataLocation([]);
    };
  }, [value]);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponent
        title="Tìm kiếm"
        left={true}
        type={true}
        label="Tạo mới"
        navigation={navigation}
        onPress={() => navigation.navigate('NewAddress')}
      />
      <View
        style={{
          flex: 2,
          marginBottom: 8,
        }}>
        <View style={styles.viewSearch}>
          <FontAwesome5
            style={{padding: 10}}
            name="search"
            size={20}
            color={COLOR.BLACK}
          />
          <TextInput
            style={styles.textinputSearch}
            inlineImageLeft="search_icon"
            placeholder="Nhập địa điểm"
            onChangeText={e => setValue(e)}
            value={value}
            keyboardType="default"
          />
        </View>
        <Text
          style={{
            fontSize: 18,
            fontFamily: 'BeVietnam-Bold',
            marginTop: 16,
          }}>
          Địa điểm
        </Text>
      </View>
      <View style={{flex: 14, marginTop: 16}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false} // hide scroll view
          data={dataLocation}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

export default Index;
