import {StyleSheet} from 'react-native';
import {COLOR} from '../../assets/color';
import {windowHeight} from '../../components';
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: COLOR.WHITE,
    width: '100%',
    height: '100%',
    marginTop: 10,
  },
  btn: {
    paddingHorizontal: 12,
    marginRight: 20,
    height: 28,
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#F3F0F0',
    borderRadius: 15,
  },
  text: {
    fontFamily: 'BeVietnam-Medium',
    fontSize: 16,
  },
  view: {
    flexDirection: 'row',
  },
  textTitle: {
    fontFamily: 'BeVietnam-Bold',
    fontSize: 16,
    marginBottom: 10,
  },
  textInput: {
    width: '100%',
    backgroundColor: COLOR.WHITE,
    fontFamily: 'BeVietnam-Medium',
    borderWidth: 1,
    borderRadius: 8,
    height: 200,
  },
});
export default styles;
