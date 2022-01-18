import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {COLOR} from '../../../assets/color';
const GENDER = [
  {id: 1, value: 'Nam'},
  {id: 2, value: 'Nữ'},
  {id: 3, value: 'Khác'},
];
const Picker = ({visible, closeModal, setFieldValue}) => {
  const [selected, setSelected] = useState(1);
  const handleChange = item => {
    setSelected(item.id);
    setFieldValue('gender', item.value);
    closeModal(visible);
  };
  return (
    <Modal
      isVisible={visible}
      style={styles.modal}
      onBackButtonPress={closeModal}
      onBackdropPress={closeModal}>
      <View style={styles.container}>
        <Text style={styles.title}>Chọn giới tính</Text>
        {GENDER.map(item => (
          <Text
            style={[styles.value, selected !== item.id && styles.selected]}
            onPress={() => handleChange(item)}>
            {item.value}
          </Text>
        ))}
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modal: {
    paddingHorizontal: 40,
    paddingVertical: 320,
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 16,
  },
  title: {
    fontFamily: 'BeVietnam-Medium',
    fontSize: 18,
    marginBottom: 16,
  },
  value: {
    fontSize: 16,
    fontFamily: 'BeVietnam-Medium',
    paddingVertical: 8,
  },
  selected: {
    color: COLOR.GREY,
  },
});

export default React.memo(Picker);
