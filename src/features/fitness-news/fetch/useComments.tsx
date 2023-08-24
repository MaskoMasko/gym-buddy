import {useMutation} from 'react-query';
import {http} from '../../../service/http/http';
import {queryClient} from '../../../service/react-query/queryClient';

export const useComments = ({postId}: {postId: number}) => {
  const _createComment = async ({
    authorId,
    content,
  }: {
    authorId: number;
    content: string;
  }) => {
    try {
      const response = await http.post('/comments', {
        authorId,
        postId,
        content,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const {
    mutateAsync: createComment,
    isLoading,
    isError,
  } = useMutation(['blogs', postId], _createComment, {
    // enabled: !!postId,
    onSuccess: async () => {
      await queryClient.invalidateQueries(['blogs', postId]);
    },
  });
  return {
    createComment,
    loading: isLoading,
    error: isError,
  };
};
