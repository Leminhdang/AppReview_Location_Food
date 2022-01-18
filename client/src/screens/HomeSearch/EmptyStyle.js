import {StyleSheet} from 'react-native';
import {COLOR} from '../../assets/color';

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  title: {
    fontFamily: 'BeVietnam-Medium',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  historyItem: {
    paddingLeft: 8,
    flexDirection: 'row',
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  historyText: {
    fontFamily: 'BeVietnam-Medium',
    fontSize: 16,
    marginLeft: 16,
  },
  popular: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  popularTitle: {
    fontFamily: 'BeVietnam-Medium',
    fontSize: 16,
    paddingHorizontal: 8,
    marginLeft: 8,
    borderRadius: 12,
    backgroundColor: COLOR.LIGHTGREY,
    paddingVertical: 2,
    marginBottom: 8,
  },
});
export default styles;
