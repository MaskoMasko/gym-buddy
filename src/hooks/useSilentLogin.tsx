import {useQuery} from 'react-query';
import useAuth from './useAuth';

export const useSilentLogin = () => {
  const {silentLogin} = useAuth();
  useQuery(['user'], silentLogin);
};
