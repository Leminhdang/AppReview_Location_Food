import React from 'react';
import {View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import styles from './style';
import {COLOR} from '../../assets/color';
const index = props => {
  const {token, visible} = props;
  return (
    <View>
      {token ? (
        <View style={styles.container}>
          <Spinner
            visible={visible}
            color={COLOR.ORANGE}
            textContent={'Đang tải'}
            size="small"
            textStyle={styles.text}
          />
        </View>
      ) : (
        <View style={styles.container}></View>
      )}
    </View>
  );
};

export default React.memo(index);
