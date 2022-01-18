import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useEffect, useReducer} from 'react';
import {authReducer} from './authReducer';

const getUser = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const info = await AsyncStorage.getItem('info');
    const {avatar, fullname, id} = JSON.parse(info);
    return token !== null && info !== null
      ? {token, avatar, fullname, id}
      : null;
  } catch (e) {
    // read error
  }
};
export const AuthContext = createContext();

const AuthContextProvider = ({children}) => {
  const [user, dispatch] = useReducer(authReducer, {});

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser();
      dispatch({type: 'GET_TOKEN', payload: user});
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{user, dispatch}}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
