import {useMutation} from 'react-query';
import {http} from '../../../service/http/http';
import {client} from '../../../service/http/react-query/queryClient';

//TODO: chatRooms na backendu => rework
export const useCreateRoom = () => {
  const _createRoom = async ({
    user1Id,
    user2Id,
  }: // roomName,
  {
    user1Id: number;
    user2Id: number;
    // roomName: string;
  }) => {
    const response = await http.post('/create-room', {
      user1Id,
      user2Id,
      roomName: 'Direct Messages',
    });
    return response.data;
  };
  const {
    mutateAsync: createRoom,
    isLoading,
    isError,
  } = useMutation(['create-room'], _createRoom, {
    async onSuccess() {
      await client.invalidateQueries(['user']);
    },
  });
  return {createRoom, loading: isLoading, error: isError};
};
