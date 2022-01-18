import {StyleSheet} from 'react-native';
import {COLOR} from '../../assets/color';
import {windowHeight} from '../../components';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.WHITE,
    paddingHorizontal: 16,
  },
  img: {
    width: '100%',
    height: '100%',
  },
});
export default styles;
