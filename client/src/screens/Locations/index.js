import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {COLOR} from '../../assets/color';
import {HeaderComponent} from '../../components';
import axios from 'axios';
import {API_HOST, API_KEY} from '@env';
import Item from './Item';
import {useNavigation} from '@react-navigation/core';
const Location = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .post(API_HOST + 'location/getAllLocation')
      .then(res => {
        setData(res.data.data);
      })
      .catch(error => {
        console.log('error ' + error);
      });
  }, []);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('LocationDetails', {id: item.id})}>
        <Item item={item} />
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponent left={true} title="Địa điểm" />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
  },
});

export default Location;
