import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const Input = ({
  name,
  value,
  handleChange,
  children,
  placeholder,
  enable,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.inputContainer}
      activeOpacity={1}
      onPress={onPress}>
      {children}
      {enable ? (
        <Text style={styles.coin}>{value}</Text>
      ) : (
        <TextInput
          value={value !== 'null' ? value : ''}
          onChangeText={handleChange(name)}
          style={styles.input}
          placeholder={placeholder}
          multiline
        />
      )}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    fontFamily: 'BeVietnam-Medium',
    marginLeft: 5,
    paddingRight: 16,
    width: '100%',
  },
  inputContainer: {
    width: '100%',
    height: 60,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  coin: {
    fontSize: 16,
    fontFamily: 'BeVietnam-Medium',
    marginLeft: 8,
    paddingRight: 16,
    width: '100%',
  },
});

export default Input;
