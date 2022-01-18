import {StyleSheet} from 'react-native';
import {COLOR} from '../../assets/color';
import {windowWidth} from '../../components';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
  },
  avatarContainer: {
    marginTop: 16,
    alignItems: 'center',
    position: 'relative',
    height: 80,
    width: 80,
  },
  avatar: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  icon: {
    width: 24,
    height: 24,
    elevation: 10,
    backgroundColor: COLOR.WHITE,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.4,
    shadowRadius: 2,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  formContainer: {
    width: '100%',
    paddingHorizontal: 16,
    marginTop: 54,
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 10,
    backgroundColor: COLOR.WHITE,
    paddingTop: 24,
    borderRadius: 12,
    paddingBottom: 48,
  },
  bottomSheetContainer: {
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
  },
  body: {
    backgroundColor: COLOR.WHITE,
    borderRadius: 12,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontFamily: 'BeVietnam-Medium',
    lineHeight: 60,
    textAlign: 'center',
  },
  line: {
    width: '100%',
    borderBottomWidth: 0.5,
    borderBottomColor: COLOR.GREY,
  },
});
export default styles;
