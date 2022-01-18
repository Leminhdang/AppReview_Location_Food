import {StatusBar, StyleSheet} from 'react-native';
import {COLOR} from '../../assets/color';

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.WHITE,
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    paddingBottom: 16,
  },
  search: {
    backgroundColor: COLOR.LIGHTGREY,
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  content: {
    flex: 1,
    paddingLeft: 8,
    fontFamily: 'BeVietnam-Medium',
    fontSize: 16,
  },
  filter: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginTop: 16,
    borderRadius: 5,
    width: '49%',
    flexDirection: 'row',
    height: 45,
    backgroundColor: COLOR.LIGHTGREY,
  },
  tabStyle: {
    marginTop: 16,
    width: 'auto',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 15,
    marginRight: 3,
  },
  focused: {
    backgroundColor: '#fff8db',
    color: COLOR.YELLOW,
  },
  tabTitle: {
    fontSize: 16,
    fontFamily: 'BeVietnam-Regular',
  },
});
export default styles;
