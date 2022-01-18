import {StyleSheet} from 'react-native';
import {COLOR} from '../../assets/color';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: COLOR.WHITE,
  },
  card: {
    borderRadius: 20,
  },
  viewCard: {
    flexDirection: 'row',
  },
  levelText: {
    fontFamily: 'BeVietnam-Bold',
    fontSize: 24,
  },
  nameText: {
    fontFamily: 'BeVietnam-Medium',
    fontSize: 18,
  },
  imgLogo: {
    width: 60,
    height: 60,
  },
  textExp: {
    fontFamily: 'BeVietnam-Medium',
    fontSize: 12,
    padding: 8,
  },
  text: {
    fontFamily: 'BeVietnam-Bold',
    fontSize: 20,
  },
  coin: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: 5,
  },
  btnNv: {
    backgroundColor: '#BEDBFE',
    borderRadius: 20,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnGift: {
    flexDirection: 'column',
    backgroundColor: '#FFCD8C',
    borderRadius: 20,
    width: 70,
    justifyContent: 'center',
    height: 70,
    alignItems: 'center',
    marginLeft: 30,
  },
  item: {
    margin: 16,
    flexDirection: 'row',
    backgroundColor: COLOR.LIGHTGREY,
    borderColor: COLOR.BLACK,
    borderRadius: 10,
    marginTop: 8,
  },
});

export default styles;
