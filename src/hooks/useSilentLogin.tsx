import {useEffect} from 'react';
import useAuth from './useAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useSilentLogin = () => {
  const {silentLogin} = useAuth();
  useEffect(() => {
    (async function executeSilentLogin() {
      const token = await AsyncStorage.getItem('token');
      console.log('Running silent login with token: ', token);
      return await silentLogin();
    })();
  });
};
