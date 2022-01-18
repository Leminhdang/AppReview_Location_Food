import {StyleSheet} from 'react-native';
import {COLOR} from '../../assets/color';

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: COLOR.WHITE,
    flexDirection: 'column',
    width: '100%',
    fontFamily: 'BeVietnamPro-Medium',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    position: 'relative',
    marginRight: 8,
  },
  picker: {
    backgroundColor: COLOR.LIGHTGREY,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    elevation: 4,
  },
  input: {
    borderRadius: 5,
    marginTop: 16,
    paddingHorizontal: 8,
    backgroundColor: COLOR.WHITE,
    fontSize: 18,
    fontFamily: 'BeVietnam-Medium',
    elevation: 4,
  },
  content: {
    marginTop: 16,
    fontSize: 16,
    fontFamily: 'BeVietnam-Medium',
    textAlignVertical: 'top',
  },
  address: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  title: {
    fontSize: 18,
    fontFamily: 'BeVietnam-Bold',
    marginTop: 8,
  },
  label: {
    fontSize: 14,
    fontFamily: 'BeVietnam-Medium',
  },
  icons: {
    position: 'absolute',
    top: 0,
    right: 10,
  },
});
export default styles;
