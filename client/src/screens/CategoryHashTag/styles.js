import {StyleSheet} from 'react-native';
import {COLOR} from '../../assets/color';

import {windowWidth} from '../../components';
const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: COLOR.WHITE,
  },
  message: {
    fontFamily: 'BeVietnam-Medium',
    fontSize: 18,
    marginTop: 100,
    paddingHorizontal: 16,
    textAlign: 'center',
  },
  heartContainer: {
    flexDirection: 'row',
    marginLeft: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  postAvatar: {
    height: 38,
    width: 38,
    borderRadius: 20,
  },
  countHeart: {
    fontFamily: 'BeVietnam-Medium',
    marginLeft: 8,
    fontSize: 16,
  },
  postContent: {
    fontFamily: 'BeVietnam-Medium',
    marginLeft: 8,
    fontSize: 14,
  },
  postTitle: {
    fontFamily: 'BeVietnam-Bold',
    marginLeft: 8,
    fontSize: 16,
  },
  contentContainer: {
    width: '56%',
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: '30%',
  },
  postImage: {
    width: windowWidth / 3.5,
    height: windowWidth / 3.5,
    borderRadius: 8,
  },
  flatlist: {
    marginTop: 10,
    paddingHorizontal: 16,
  },
  postSeparator: {
    height: 10,
  },
  postItem: {
    borderRadius: 10,
    flexDirection: 'row',
    paddingHorizontal: 5,
    paddingVertical: 5,
    justifyContent: 'space-between',
    borderColor: COLOR.BLACK,
    borderWidth: 0.5,
  },
});

export default styles;
