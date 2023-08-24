import {useQuery} from 'react-query';
import {http} from '../../../service/http/http';
import {Blog} from './useBlogs';

export const usePost = ({postId}: {postId: number}) => {
  const _getPost = async () => {
    try {
      const response = await http.get(`/blogs/${postId}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  const {data, isLoading, isError} = useQuery(['blogs', postId], _getPost);
  return {
    queryData: (data?.data ?? {}) as Blog,
    loading: isLoading,
    error: isError,
  };
};
