import {StyleSheet} from 'react-native';
import {COLOR} from '../../assets/color';
import {windowWidth} from '../../components';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
    paddingBottom: 16,
  },
  slider: {
    width: windowWidth,
    height: windowWidth * 0.6,
  },
  image: {
    width: windowWidth,
    height: windowWidth * 0.6,
    resizeMode: 'cover',
  },
  body: {paddingHorizontal: 16},
  rateAndViews: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'BeVietnam-Bold',
    fontSize: 16,
    marginTop: 8,
  },
  maxRate: {
    fontFamily: 'BeVietnam-Medium',
    fontSize: 14,
    color: COLOR.GREY,
  },
  content: {
    marginTop: 8,
    fontFamily: 'BeVietnam-Medium',
    fontSize: 15,
  },
  locationItem: {
    backgroundColor: '#f2f2f2',
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 8,
    flexDirection: 'row',
    marginTop: 16,
  },
  locationImageContainer: {
    width: 70,
    height: 70,
    borderRadius: 5,
    backgroundColor: COLOR.WHITE,
  },
  locationImage: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  addressInfo: {
    width:'80%',
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  locationName: {
    fontSize: 15,
    fontFamily: 'BeVietnam-Bold',
  },
  locationAddress: {
    fontSize: 15,
    fontFamily: 'BeVietnam-Medium',
  },
  view: {
    fontFamily: 'BeVietnam-Regular',
    marginLeft: 8,
  },
});
export default styles;
