import {useEffect} from 'react';
import useAuth from './useAuth';

export const useSilentLogin = () => {
  const {silentLogin} = useAuth();
  useEffect(() => {
    (async function executeSilentLogin() {
      return await silentLogin();
    })();
  });
};
