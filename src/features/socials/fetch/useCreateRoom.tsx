import {useState} from 'react';
import {useMutation} from 'react-query';
import {z} from 'zod';
import {http} from '../../../service/http/http';
import {client} from '../../../service/http/react-query/queryClient';

const CreateRoomSchema = z.object({
  message: z.string(),
});

type CreateRoomType = z.infer<typeof CreateRoomSchema>;

//TODO: chatRooms na backendu => rework
export const useCreateRoom = () => {
  const [zodError, setZodError] = useState(false);

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
    const parse = CreateRoomSchema.safeParse(response.data);
    if (parse.success) {
      return response.data;
    } else {
      setZodError(true);
      console.error(parse.error);
    }
    return response.data as CreateRoomType;
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
  return {createRoom, loading: isLoading, error: isError || zodError};
};
