import {StyleSheet} from 'react-native';
import {COLOR} from '../../assets/color';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 32,
  },
  modal: {
    height: '100%',
    backgroundColor: COLOR.WHITE,
    borderTopEndRadius: 35,
    borderTopStartRadius: 35,
    paddingTop: 32,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 8,
  },
  title: {
    flex: 2,
    fontFamily: 'BeVietnam-Bold',
    fontSize: 15,
    textAlign: 'center',
  },
  close: {
    fontFamily: 'BeVietnam-Regular',
    fontSize: 15,
    flex: 1,
    textAlign: 'right',
  },
  search: {
    marginHorizontal: 8,
    marginTop: 32,
    height: 40,
    borderColor: COLOR.BLACK,
    borderWidth: 0.5,
    borderRadius: 20,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  input: {
    fontFamily: 'BeVietnam-Medium',
    flex: 1,
    paddingLeft: 8,
  },
  line: {
    borderBottomColor: COLOR.GREY,
    borderWidth: 0.2,
  },
  itemName: {
    fontFamily: 'BeVietnam-Medium',
    fontSize: 15,
    lineHeight: 60,
    paddingHorizontal: 8,
  },
});
export default styles;
