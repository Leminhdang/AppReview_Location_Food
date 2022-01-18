import {StyleSheet} from 'react-native';
import {COLOR} from '../../assets/color';

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.WHITE,
    flex: 1,
    paddingTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerItem: {
    backgroundColor: COLOR.WHITE,
    flexDirection: 'row',
    borderRadius: 10,
    elevation: 6,
    margin: 8,
  },
  buttonTrue: {
    backgroundColor: COLOR.YELLOW,
    alignItems: 'center',
    marginLeft: 16,
    width: 'auto',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    padding: 4,
  },
  buttonFalse: {
    backgroundColor: COLOR.GREY,
    alignItems: 'center',
    marginLeft: 12,
    width: 'auto',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    padding: 4,
  },
  item: {
    margin: 16,
    flexDirection: 'row',
    backgroundColor: COLOR.LIGHTGREY,
    borderColor: COLOR.BLACK,
    borderRadius: 10,
    marginTop: 8,
  },
  message: {
    fontFamily: 'BeVietnam-Medium',
    fontSize: 18,
    marginTop: 100,
  },
});
export default styles;
