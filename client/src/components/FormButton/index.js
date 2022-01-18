import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {COLOR} from '../../assets/color';

const FormButton = ({title, isValid, handleSubmit}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        disabled={!isValid}
        style={styles.buttonContainer}
        activeOpacity={0.8}
        onPress={handleSubmit}>
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {width: '100%', alignItems: 'center', marginTop: 16},
  buttonContainer: {
    width: '70%',
    maxHeight: 50,
    backgroundColor: COLOR.YELLOW,
    alignItems: 'center',
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontFamily: 'BeVietnam-Medium',
    marginVertical: 10,
  },
});

export default React.memo(FormButton);
