import {StyleSheet} from 'react-native';
import {COLOR} from '../../assets/color';
import {windowWidth} from '../../components';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
  },
  information: {
    width: '86%',
    flexDirection: 'row',
  },
  imgContainer: {
    width: 40,
    height: 40,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#F0AB1E',
    marginLeft: 8,
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
    resizeMode: 'cover',
  },
  content: {
    marginTop: 8,
    marginLeft: 12,
  },
  fullname: {
    fontSize: 15,
    fontFamily: 'BeVietnam-Bold',
  },
});
export default styles;
