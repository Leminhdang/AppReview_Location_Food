import { StyleSheet } from 'react-native';
import { COLOR } from '../../assets/color';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    height: '100%',
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  modal: {
    height:'60%',
    width: '100%',
    paddingHorizontal: 8,
    backgroundColor: COLOR.WHITE,
    borderRadius: 8,
    marginBottom: 32,
  },
  img: {
    width: '100%',
    height: '40%',
    marginBottom: 8,
  },
  headerContainer: {
    alignItems: 'center',
    flex: 7,
  },
  header: {
    flexDirection: 'row',
  },
  logoContainer: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },
  logo: {
    width: '30%',
    height: '100%',
    resizeMode: 'contain',
  },
  logoText: {
    fontSize: 22,
    fontFamily: 'BeVietnam-SemiBold',
    color: COLOR.YELLOW,
  },
  coinsTotal: {
    flexDirection: 'row',
    width: '50%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  coinContainer: {
    backgroundColor: COLOR.LIGHTGREY,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  coin: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 18,
    fontFamily: 'BeVietnam-Bold',
    marginBottom: 16,
  },
  content: {
    fontSize: 16,
    fontFamily: 'BeVietnam-Medium',
    paddingHorizontal: 8,
    textAlign: 'center',
  },
  coinListContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 8,
  },
  coinImg: {
    width: 40,
    height: 30,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  daysText: {
    fontFamily: 'BeVietnam-Medium',
    fontSize: 13,
  },
  button: {
    marginTop: 16,
    width: '90%',
    backgroundColor: COLOR.YELLOW,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  label: {
    fontFamily: 'BeVietnam-Bold',
    fontSize: 16,
    color: COLOR.WHITE,
  },
  closeButtonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 16,
    marginTop: 24,
  },
  height50: {
    height:'50%',
    width: '100%',
    paddingHorizontal: 8,
    backgroundColor: COLOR.WHITE,
    borderRadius: 8,
    marginBottom: 32,
  },
  text: {
    fontFamily: 'BeVietnam-Medium',
    marginTop: 16,
    fontSize:17
  }
});
export default styles;
