import {StyleSheet} from 'react-native';
import {COLOR} from '../../assets/color';
import {windowHeight} from '../../components';
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: COLOR.WHITE,
    width: '100%',
    height: '100%',
    paddingHorizontal: 16,
  },
  text: {
    fontFamily: 'BeVietnam-Bold',
    fontSize: 18,
  },
  textDetail: {
    fontFamily: 'BeVietnam-Medium',
    fontSize: 14,
    padding: 8,
  },
});
export default styles;
