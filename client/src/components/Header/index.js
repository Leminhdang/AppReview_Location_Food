import React from 'react';
import {SafeAreaView, StatusBar, View} from 'react-native';
import HeaderLeft from './HeaderLeft';
import HeaderRight from './HeaderRight';
import {useNavigation} from '@react-navigation/native';

const HeaderComponent = ({
  left,
  title,
  type,
  label,
  openBottomSheet,
  onPress,
  hidden,
}) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{paddingTop: 32}}>
      <View
        style={{
          width: '100%',
          marginBottom: 8,
          flexDirection: 'row',
          paddingHorizontal: 8,
        }}>
        <StatusBar hidden />
        <HeaderLeft title={title} isShow={left} navigation={navigation} />
        {type && (
          <HeaderRight
            type={type}
            navigation={navigation}
            label={label}
            {...{openBottomSheet, onPress}}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default React.memo(HeaderComponent);
