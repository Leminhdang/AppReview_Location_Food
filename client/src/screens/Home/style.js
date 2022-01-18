import {StyleSheet} from 'react-native';
import {COLOR} from '../../assets/color';
import {windowWidth} from '../../components';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
  },
  scrollView: {
    marginTop: 8,
    backgroundColor: '#F5F5F5',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLOR.WHITE,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 16,
    fontFamily: 'BeVietnam-Bold',
  },
  more: {
    fontFamily: 'BeVietnam-Medium',
    fontSize: 14,
    color: '#6e6e6e',
  },
  flatlist: {
    marginTop: 10,
    paddingHorizontal: 16,
  },
  itemContainer: {
    width: windowWidth / 1.5,
    backgroundColor: COLOR.WHITE,
    paddingHorizontal: 8,
    borderRadius: 8,
    paddingVertical: 8,
  },
  favoriteImage: {
    width: '100%',
    height: windowWidth / 3,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  separator: {
    backgroundColor: 'transparent',
    width: 10,
  },
  itemTitle: {
    fontFamily: 'BeVietnam-Bold',
    fontSize: 16,
    marginTop: 5,
  },
  content: {
    fontFamily: 'BeVietnam-Medium',
    marginTop: 5,
  },
  postCategories: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: COLOR.WHITE,
    marginTop: 12,
    paddingVertical: 10,
  },
  categoryLabel: {
    fontSize: 14,
    fontFamily: 'BeVietnam-Medium',
  },
  active: {
    color: COLOR.BLACK,
  },
  inactive: {
    color: COLOR.GREY,
  },
  postItem: {
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: COLOR.WHITE,
    paddingHorizontal: 5,
    paddingVertical: 5,
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: '30%',
  },
  contentContainer: {
    width: '56%',
    justifyContent: 'space-between',
  },
  postImage: {
    width: windowWidth / 3.5,
    height: windowWidth / 3.5,
    borderRadius: 8,
  },
  postSeparator: {
    height: 10,
  },
  postTitle: {
    fontFamily: 'BeVietnam-Bold',
    marginLeft: 8,
    fontSize: 16,
  },
  save: {
    width: '8%',
    alignItems: 'flex-end',
  },
  postContent: {
    fontFamily: 'BeVietnam-Medium',
    marginLeft: 8,
    fontSize: 14,
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
});
export default styles;
