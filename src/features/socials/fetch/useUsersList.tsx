import {useQuery} from 'react-query';
import {http} from '../../../service/http/http';
import {z} from 'zod';
import {useState} from 'react';
import {create} from 'zustand';

const UserListItemSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export type UserListItemType = z.infer<typeof UserListItemSchema>;

const _userListStore = create<{
  userList: UserListItemType[];
  setUserList: (newUserList: UserListItemType[]) => void;
}>(set => ({
  userList: [],
  setUserList: newUserList => set(() => ({userList: newUserList})),
}));

export const useUsersList = () => {
  const [zodError, setZodError] = useState(false);
  const userListStore = _userListStore(state => state);

  const query = useQuery(['users-list'], async () => {
    const response = await http.get('/users');
    const parse = z.array(UserListItemSchema).safeParse(response.data.data);
    if (parse.success) {
      userListStore.setUserList(response.data.data);
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
    store: userListStore,
  };
};
