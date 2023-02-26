import {useMutation} from 'react-query';
import {http} from '../../../service/http/http';
import {client} from '../../../service/http/react-query/queryClient';

export const useAddFriend = () => {
  const _addFriend = async ({
    userId,
    friendId,
  }: {
    userId: number;
    friendId: number;
  }) => {
    const response = await http.post(`/add-friend/${userId}`, {friendId});
    return response.data;
  };
  const {
    mutateAsync: addFriend,
    isLoading,
    isError,
  } = useMutation(['add-friend'], _addFriend, {
    async onSuccess() {
      await client.invalidateQueries(['user']);
    },
  });
  return {addFriend, loading: isLoading, error: isError};
};
