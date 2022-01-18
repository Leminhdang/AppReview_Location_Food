import {StyleSheet} from 'react-native';
import {COLOR} from '../../assets/color';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
    paddingVertical: 50,
    paddingHorizontal: 16,
  },
  imgContainer: {
    height: '40%',
    width: '100%',
    alignItems: 'center',
  },
  img: {
    width: '90%',
    height: '80%',
  },
  title: {
    fontFamily: 'BeVietnam-Bold',
    fontSize: 21,
    width: '100%',
    textAlign: 'center',
    marginBottom: 16,
  },
  or: {
    fontFamily: 'BeVietnam-Medium',
    width: '100%',
    textAlign: 'center',
    marginVertical: 16,
    fontSize: 16,
  },
  socialAuth: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  facebookButton: {
    backgroundColor: '#4a6da7',
    flexDirection: 'row',
    width: '40%',
    maxHeight: 50,
    borderRadius: 8,
    paddingBottom: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 3,
  },
  label: {
    fontFamily: 'BeVietnam-Medium',
    fontSize: 16,
    marginVertical: 10,
    marginRight: 3,
  },
  logoGG: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  googleButton: {
    flexDirection: 'row',
    width: '40%',
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 2,
    borderColor: COLOR.BLACK,
  },
  textColor: {
    color: COLOR.WHITE,
  },
  forgotPasswordContainer: {
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 20,
  },
  checkboxContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  forgotPassword: {
    flex: 1,
    textAlign: 'right',
  },
  text: {
    marginLeft: 8,
    fontFamily: 'BeVietnam-Medium',
  },
  register: {
    flexDirection: 'row',
    marginTop: 16,
    justifyContent: 'center',
  },
  registerLabel: {
    marginHorizontal: 3,
    fontFamily: 'BeVietnam-Medium',
    fontSize: 16,
  },
});
export default styles;
