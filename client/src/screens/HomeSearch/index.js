import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StatusBar,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import styles from './style';
import { COLOR } from '../../assets/color';
import SearchModal from '../../components/SearchModal';

import EmptySearch from './EmptySearch';
import Search from './Search';

const PROVINCES = [
  { id: 1, name: 'Hồ Chí Minh' },
  { id: 2, name: 'Hà Nội' },
  { id: 3, name: 'Đồng Nai' },
  { id: 4, name: 'Bình Thuận' },
  { id: 5, name: 'Lâm Đồng' },
];
const DISTRICTS = [
  { id: 1, name: 'Quận 1' },
  { id: 2, name: 'Quận 2' },
  { id: 3, name: 'Quận 3' },
  { id: 4, name: 'Quận 4' },
  { id: 5, name: 'Quận 5' },
];
const TAB = ['Tất cả', 'Địa điểm', 'Bài viết', 'Hashtag', 'Tài khoản'];

const HomeSearch = ({ navigation }) => {
  // state for province
  const [provinceVisible, setProvinceVisible] = useState(false);
  const [province, setProvince] = useState('Tỉnh/Thành Phố');

  const closeProvinceModal = () => {
    setProvinceVisible(!provinceVisible);
  };

  const onProvinceChange = text => {
    setProvince(text);
    setProvinceVisible(!provinceVisible);
  };
  // state for district
  const [districtVisible, setDistrictVisible] = useState(false);
  const [district, setDistrict] = useState('Quận/Huyện');

  const closeDistrictModal = () => {
    setDistrictVisible(!districtVisible);
  };

  const onDistrictChange = text => {
    setDistrict(text);
    setDistrictVisible(!districtVisible);
  };
  const [value, setValue] = useState('');

  return (
    <View style={styles.container}>
      <View style={{ paddingHorizontal: 8 }}>
        <View style={styles.search}>
          <IonIcon name="ios-search-outline" size={20} />
          <TextInput
            placeholder="Món ăn hoặc địa điểm"
            style={styles.content}
            onChangeText={e => setValue(e)}
          />
        </View>
        {/* <View style={{ flexDirection: 'row' }}>
          <TouchableWithoutFeedback onPress={closeProvinceModal}>
            <View style={[styles.filter, { marginRight: '2%' }]}>
              <Text style={styles.content}>{province}</Text>
              <Feather name="chevron-down" size={20} />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={closeDistrictModal}>
            <View style={styles.filter}>
              <Text style={styles.content}>{district}</Text>
              <Feather name="chevron-down" size={20} />
            </View>
          </TouchableWithoutFeedback>
        </View> */}
      </View>
      <Search {...{ value, navigation }} />
      {/* {value ? <Search {...{value, navigation}} /> : <EmptySearch />} */}
      {/* <SearchModal
        data={
          districtVisible === true && provinceVisible === false
            ? DISTRICTS
            : PROVINCES
        }
        visible={
          districtVisible === true && provinceVisible === false
            ? districtVisible
            : provinceVisible
        }
        onClose={
          districtVisible === true && provinceVisible === false
            ? closeDistrictModal
            : closeProvinceModal
        }
        onChange={
          districtVisible === true && provinceVisible === false
            ? onDistrictChange
            : onProvinceChange
        }
      /> */}
    </View>
  );
};

export default HomeSearch;
