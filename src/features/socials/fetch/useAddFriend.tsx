import {useMutation} from 'react-query';
import {http} from '../../../service/http/http';
import {queryClient} from '../../../service/react-query/queryClient';
import {z} from 'zod';
import {useState} from 'react';

const AddFriendSchema = z.object({
  userId: z.number().optional(),
  friendId: z.number().optional(),
});

type AddFriendType = z.infer<typeof AddFriendSchema>;

export const useAddFriend = () => {
  const [zodError, setZodError] = useState(false);

  const _addFriend = async ({
    userId,
    friendId,
  }: {
    userId: number;
    friendId: number;
  }) => {
    const response = await http.post(`/add-friend/${userId}`, {friendId});
    const parse = AddFriendSchema.safeParse(response.data);
    if (parse.success) {
      return response.data;
    } else {
      setZodError(true);
      console.error(parse.error);
    }
    return response.data as AddFriendType;
  };
  const {
    mutateAsync: addFriend,
    isLoading,
    isError,
  } = useMutation(['add-friend'], _addFriend, {
    async onSuccess() {
      await queryClient.invalidateQueries(['user']);
    },
  });
  return {addFriend, loading: isLoading, error: isError || zodError};
};
