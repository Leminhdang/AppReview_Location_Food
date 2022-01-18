import {StyleSheet} from 'react-native';
import {COLOR} from '../../assets/color';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
  },
  title: {
    fontSize: 18,
    fontFamily: 'BeVietnam-Bold',
    marginBottom: 8,
  },
  input: {
    borderRadius: 5,
    marginBottom: 8,
    fontFamily: 'BeVietnam-Medium',
    paddingLeft: 12,
    backgroundColor: COLOR.WHITE,
    elevation: 6,
  },
  button: {
    marginTop: 8,
    width: 100,
    height: 100,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    backgroundColor: COLOR.LIGHTGREY,
    elevation: 4,
  },
  label: {
    fontFamily: 'BeVietnam-Medium',
  },
});
export default styles;
