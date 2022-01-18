import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {COLOR} from '../assets/color';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
const TextInputCustom = ({
  isPassword,
  placeholder,
  name,
  handleChange,
  handleBlur,
  value,
  errors,
  touched,
  setFieldValue,
}) => {
  const [isShowPassword, setIsShowPassword] = useState(true);
  return (
    <View>
      <View style={styles.inputContainer}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name={isPassword ? 'lock-outline' : 'email-outline'}
            size={25}
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          secureTextEntry={isPassword ? isShowPassword : !isShowPassword}
          value={value}
          onChangeText={handleChange(name)}
          onBlur={handleBlur(name)}
        />
        {isPassword && (
          <View style={styles.iconContainer}>
            <Entypo
              name={isShowPassword ? 'eye-with-line' : 'eye'}
              size={25}
              onPress={() => setIsShowPassword(!isShowPassword)}
            />
          </View>
        )}
        {!isPassword && value.length > 0 && (
          <View style={styles.iconContainer}>
            <Ionicons
              name="close-circle-outline"
              size={28}
              onPress={() => setFieldValue(name, '')}
            />
          </View>
        )}
      </View>
      {errors[name] && touched[name] && (
        <Text style={styles.error}>{errors[name]}</Text>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    borderRadius: 5,
    borderColor: COLOR.BLACK,
    paddingHorizontal: 8,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    maxHeight: 50,
    marginTop: 16,
  },
  input: {
    width: '80%',
    fontFamily: 'BeVietnam-Medium',
    fontSize: 16,
  },
  error: {
    color: 'red',
    fontFamily: 'BeVietnam-Regular',
    fontSize: 14,
  },
  iconContainer: {
    alignItems: 'center',
    width: '10%',
  },
});

export default React.memo(TextInputCustom);
