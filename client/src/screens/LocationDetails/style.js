import {StyleSheet} from 'react-native';
import {COLOR} from '../../assets/color';

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.WHITE,
    height: '100%',
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 10,
  },
  cardFood: {
    height: 130,
    margin: 10,
    justifyContent: 'space-between',
    padding: 8,
    borderRadius: 8,
    flexDirection: 'row',
    backgroundColor: COLOR.WHITE,
    elevation: 8,
  },
  img: {
    height: 115,
    width: 110,
    borderRadius: 8,
  },
  text: {fontFamily: 'BeVietnam-Medium', fontSize: 18},
});
export default styles;
