import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import Item from '../SearchLocation/Item';
import Food from '../LocationDetails/Item';
import styles from './SearchStyle';
import axios from 'axios';
import {API_HOST} from '@env';

const Search = ({value, navigation}) => {
  const [dataLocation, setDataLocation] = useState([]);
  const [dataPost, setDataPost] = useState([]);
  useEffect(() => {
    if (value) {
      axios
        .post(API_HOST + 'location/searchLocation', {value})
        .then(res => {
          setDataLocation(res.data.data);
        })
        .catch(error => {
          console.log('error ' + error);
        });
    } else {
      setDataLocation([]);
    }
  }, [value]);

  useEffect(() => {
    if (value) {
      axios
        .post(API_HOST + 'post/searchPost', {value})
        .then(res => {
          setDataPost(res.data.data);
        })
        .catch(error => {
          console.log('error ' + error);
        });
    } else {
      setDataPost([]);
    }
  }, [value]);
  console.log(dataLocation);
  console.log(dataPost);
  return (
    <ScrollView style={styles.container}>
      {dataPost ? (
        <Text style={styles.title}>Món ăn</Text>
      ) : (
        <Text style={styles.title}></Text>
      )}
      {dataPost?.map((item, index) => (
        <Food item={item} key={item.id} />
      ))}
      {dataLocation ? (
        <Text style={styles.title}>Địa điểm</Text>
      ) : (
        <Text style={styles.title}></Text>
      )}
      {dataLocation?.map((item, index) => (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => navigation.navigate('LocationDetails', {id: item.id})}>
          <Item item={item} key={item.id} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Search;
