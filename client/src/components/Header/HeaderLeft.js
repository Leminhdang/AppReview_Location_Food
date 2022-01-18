import React from 'react';
import {View, Text} from 'react-native';

import {COLOR} from '../../assets/color';

import IonIcon from 'react-native-vector-icons/Ionicons';

const HeaderLeft = props => {
  const {title, isShow, navigation} = props;
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        width: '70%',
        height: '100%',
      }}>
      <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
        {isShow && (
          <IonIcon
            name="chevron-back"
            size={25}
            onPress={() => navigation.goBack()}
          />
        )}
        <Text
          style={{fontSize: 20, fontFamily: 'BeVietnam-Bold', marginLeft: 8}}>
          {title}
        </Text>
      </View>
    </View>
  );
};

export default React.memo(HeaderLeft);
