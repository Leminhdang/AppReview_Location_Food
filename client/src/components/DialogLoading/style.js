import {StyleSheet} from 'react-native';
import {COLOR} from '../../assets/color';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
    height: '100%',
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 70,
  },
  text: {
    fontFamily: 'BeVietnam-Bold',
    fontSize: 16,
    color: COLOR.ORANGE,
  },
});
export default styles;
