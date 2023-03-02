import {useQuery} from 'react-query';
import {http} from '../../../service/http/http';
import {z} from 'zod';
import {useState} from 'react';

const UserListItemSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export type UserListItemType = z.infer<typeof UserListItemSchema>;

export const useUsersList = () => {
  const [zodError, setZodError] = useState(false);

  const query = useQuery(['users-list'], async () => {
    const response = await http.get('/users');
    const parse = z.array(UserListItemSchema).safeParse(response.data.data);
    if (parse.success) {
      return response.data;
    } else {
      setZodError(true);
      console.error(parse.error);
    }
  });
  return {
    queryData: (query.data?.data ?? []) as UserListItemType[],
    loading: query.isLoading || query.isIdle,
    error: query.isError || zodError,
  };
};
