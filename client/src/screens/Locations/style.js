import {StyleSheet} from 'react-native';
import {COLOR} from '../../assets/color';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 8,
    flexDirection: 'column',
    paddingHorizontal: 8,
    backgroundColor: COLOR.WHITE,
  },
  buttonsTop: {
    backgroundColor: COLOR.YELLOW,
    alignItems: 'center',
    marginRight: 16,
    width: 'auto',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    padding: 4,
  },
  viewSearch: {
    marginTop: 8,
    flexDirection: 'row',
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: COLOR.LIGHTGREY,
  },
  textinputSearch: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    color: COLOR.GREY,
  },
  containerItem: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLOR.WHITE,
    borderRadius: 10,
    padding: 6,
    margin: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.GREY,
  },
});
export default styles;
