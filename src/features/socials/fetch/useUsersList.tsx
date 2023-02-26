import {useQuery} from 'react-query';
import {http} from '../../../service/http/http';

export const useUsersList = () => {
  const query = useQuery(['users-list'], async () => {
    const response = await http.get('/users');
    return response.data;
  });
  return {
    data: query.data?.data ?? [],
    loading: query.isLoading || query.isIdle,
    error: query.isError,
  };
};
