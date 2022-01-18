import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async value => {
  const {avatar, fullname, id, token} = value;
  const jsonValue = JSON.stringify({avatar, fullname, id});
  const first = ['token', token];
  const second = ['info', jsonValue];
  try {
    if (token) await AsyncStorage.multiSet([first, second]);
    else await AsyncStorage.multiSet([second]);
  } catch (e) {
    console.log(e);
  }
};
const removeValue = async () => {
  const keys = ['token', 'info', 'check_in'];
  try {
    await AsyncStorage.multiRemove(keys);
    console.log(await AsyncStorage.getItem('info'));
  } catch (e) {
    // remove error
  }
};
const updateData = async value => {
  const {avatar, fullname, id} = value;
  const jsonValue = JSON.stringify({avatar, fullname, id});
  try {
    await AsyncStorage.setItem('info', jsonValue);
  } catch (e) {
    console.log(e);
  }
};

const setCheckInDate = async data => {
  const jsonValue = JSON.stringify(data);
  try {
    await AsyncStorage.setItem('check_in', jsonValue);
  } catch (e) {
    console.log(e);
  }
};

export const authReducer = (user, action) => {
  const {type, payload} = action;
  switch (type) {
    case 'LOGIN':
      storeData(payload);
      return payload;
    case 'LOGOUT':
      removeValue();
      break;
    case 'GET_TOKEN':
      return payload;
    case 'UPDATE_INFO':
      updateData(payload);
      return Object.assign(user, payload);
    case 'CHECK_IN':
      setCheckInDate(payload);
      return Object.assign(user, payload);
    default:
      return user;
  }
};
