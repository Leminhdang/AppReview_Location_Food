import {StyleSheet} from 'react-native';
import {COLOR} from '../../assets/color';
import {HeaderComponent, windowWidth, windowHeight} from '../../components';

const styles = StyleSheet.create({
  container: {},
  textTitle: {
    margin: 10,
    fontSize: 17,
    fontFamily: 'BeVietnam-Medium',
  },
  viewMisson: {
    flexDirection: 'row',

    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewMisson2: {
    marginRight: 4,
    flexDirection: 'column',
    flex: 1,
    width: '70%',
  },
  text: {
    marginLeft: 10,
    fontSize: 15,
    fontFamily: 'BeVietnam-Bold',
  },
  textDetail: {
    marginLeft: 10,
    fontSize: 12,
    fontFamily: 'BeVietnam-Light',
  },
  seeVideo: {
    flexDirection: 'row',
  },
  icons: {
    marginLeft: 10,
    fontFamily: 'BeVietnam-Medium',
  },
  view: {
    flex: 1,
  },
  linear: {
    backgroundColor: COLOR.YELLOW,
    width: windowWidth * 0.1,
    height: windowHeight * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 90,
  },
});
export default styles;
