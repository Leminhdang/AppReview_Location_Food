import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import styles from './style';
import IonIcon from 'react-native-vector-icons/Ionicons';

const SearchModal = ({data, visible, onClose, onChange}) => {
  const [keyword, setKeyword] = useState('');
  const [filterData, setFilterData] = useState(data);

  useEffect(() => {
    setFilterData(
      data.filter(item => {
        return item.name.includes(keyword);
      }),
    );
  }, [data, keyword]);
  useEffect(() => {
    setKeyword('');
  }, [visible]);
  const RenderItem = ({item}) => {
    let value = item.name;
    const handleChange = () => {
      onChange(value);
    };
    return (
      <TouchableOpacity style={styles.line} onPress={handleChange} activeOpacity={1}>
        <Text style={styles.itemName}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.container}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <View style={{flex: 1}} />
            <Text style={styles.title}>Chọn Tỉnh/Thành Phố</Text>
            <Text style={styles.close} onPress={onClose}>
              Đóng
            </Text>
          </View>
          <View style={styles.search}>
            <IonIcon name="ios-search-outline" size={20} />
            <TextInput
              style={styles.input}
              placeholder="Tìm kiếm"
              onChangeText={text => setKeyword(text)}
            />
          </View>
          <FlatList
            data={filterData}
            renderItem={RenderItem}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    </Modal>
  );
};

export default React.memo(SearchModal);
