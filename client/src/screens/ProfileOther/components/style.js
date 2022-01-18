import {StyleSheet} from 'react-native';
import {COLOR} from '../../../assets/color';

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.WHITE,
    flex: 1,
    paddingTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  message: {
    fontFamily: 'BeVietnam-Medium',
    fontSize: 18,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 100,
    paddingHorizontal: 16,
  },
});

export default styles;
