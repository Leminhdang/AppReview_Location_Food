import {StyleSheet} from 'react-native';
import {windowWidth} from '../../components';
import {COLOR} from '../../assets/color';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignSelf: 'baseline',
    marginVertical: 8,
    backgroundColor: COLOR.WHITE,
    paddingVertical: 8,
    elevation: 6,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  name: {
    fontFamily: 'BeVietnam-Medium',
    fontSize: 18,
    fontWeight: 'bold',
  },
  date: {
    fontFamily: 'BeVietnam-Medium',
    fontSize: 12,
  },
  title: {
    width: windowWidth,
    fontFamily: 'BeVietnam-Medium',
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    fontFamily: 'BeVietnam-Medium',
    fontSize: 15,
    marginTop: 8,
    width: '100%',
  },
  more: {
    fontFamily: 'BeVietnam-Medium',
    color: '#FE9352',
    fontWeight: 'bold',
    marginTop: 4,
    fontSize: 15,
  },
  wrapVideo: {
    position: 'relative',
    width: '100%',
    marginTop: 8,
  },

  video: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: COLOR.BLACK,
  },
  heartCount: {
    fontFamily: 'BeVietnam-Medium',
    fontSize: 20,
    marginLeft: 6,
  },
  wrapIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  wrapHeader: {flexDirection: 'row', paddingHorizontal: 8},
  information: {
    alignSelf: 'center',
    flexDirection: 'column',
    marginLeft: 8,
  },
});
export default styles;
