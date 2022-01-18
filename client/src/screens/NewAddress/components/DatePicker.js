import React, {useEffect, useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {TouchableOpacity, View, TextInput, Text} from 'react-native';
import styles from '../styles';
const DatePicker = ({placeholder, onPress}) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    onPress(currentDate);
  };

  return (
    <View style={{width: '45%'}}>
      <TouchableOpacity onPress={() => setShow(true)} activeOpacity={1}>
        <TextInput
          placeholder={placeholder}
          editable={false}
          style={styles.input}
          value={
            date.getHours().toString() + ':' + date.getMinutes().toString()
          }
        />
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};
export default DatePicker;
