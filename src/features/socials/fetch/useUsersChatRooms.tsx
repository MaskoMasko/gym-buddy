import {useQuery} from 'react-query';
import {http} from '../../../service/http/http';

export const useUsersChatRooms = (userId: number) => {
  const _usersChatRooms = async () => {
    const response = await http.get(`/users-chat-rooms/${userId}`);
    return response.data;
  };

  const query = useQuery(['users-chat-rooms', userId], _usersChatRooms);

  return {
    data: query.data?.data ?? [],
    loading: query.isLoading || query.isIdle,
    error: query.isError,
    refetch: query.refetch,
  };
};
