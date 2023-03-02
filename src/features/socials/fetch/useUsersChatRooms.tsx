import {useQuery} from 'react-query';
import {http} from '../../../service/http/http';
import {z} from 'zod';
import {useState} from 'react';

const ChatRoomsSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
  }),
);

type ChatRoomsType = z.infer<typeof ChatRoomsSchema>;

export const useUsersChatRooms = (userId: number) => {
  const [zodError, setZodError] = useState(false);

  const _usersChatRooms = async () => {
    const response = await http.get(`/users-chat-rooms/${userId}`);
    const parse = ChatRoomsSchema.safeParse(response.data.data);
    if (parse.success) {
      return response.data;
    } else {
      setZodError(true);
      console.error(parse.error);
    }
    return response.data;
  };

  const query = useQuery(['users-chat-rooms', userId], _usersChatRooms);

  return {
    data: (query.data?.data ?? []) as ChatRoomsType,
    loading: query.isLoading || query.isIdle,
    error: query.isError || zodError,
    refetch: query.refetch,
  };
};
