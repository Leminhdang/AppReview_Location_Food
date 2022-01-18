import React from 'react';
import {View, Text, ScrollView, FlatList} from 'react-native';
import styles from './EmptyStyle';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {COLOR} from '../../assets/color';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RenderItem from './RenderItem';

const HISTORY = ['Gà kfc', 'Bánh mì', 'Bún bò'];
const EmptySearch = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={{marginHorizontal: 8}}>
        <Text style={styles.title}>Lịch sử tìm kiếm</Text>
        {HISTORY.map((item, index) => (
          <View style={styles.historyItem} key={index}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <SimpleLineIcons name="clock" size={25} color={COLOR.GREY} />
              <Text style={styles.historyText}>{item}</Text>
            </View>
            <AntDesign name="close" size={20} />
          </View>
        ))}
        <Text style={[styles.title, {marginTop: 8}]}>Từ khoá phổ biến</Text>
        <View style={styles.popular}>
          {HISTORY.map((item, index) => (
            <Text key={index} style={styles.popularTitle}>
              {item}
            </Text>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default EmptySearch;
