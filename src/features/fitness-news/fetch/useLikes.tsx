import {useMutation} from 'react-query';
import {z} from 'zod';
import {http} from '../../../service/http/http';
import {queryClient} from '../../../service/react-query/queryClient';

const LikeSchema = z.object({
  id: z.number(),
  createdAt: z.string(),
  user: z.optional(
    z.object({
      id: z.number(),
      name: z.string(),
    }),
  ),
  postId: z.number(),
});

export type Like = z.infer<typeof LikeSchema>;

export const useLikes = () => {
  const _createLike = async ({
    userId,
    postId,
  }: {
    userId: number;
    postId: number;
  }) => {
    try {
      const response = await http.post('/likes', {postId, userId});
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const _deleteLike = async ({
    userId,
    postId,
  }: {
    userId: number;
    postId: number;
  }) => {
    try {
      const response = await http.delete(`/likes/${postId}/${userId}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const {
    mutateAsync: createLike,
    isLoading: createLikeLoading,
    isError: createLikeError,
  } = useMutation(['likes'], _createLike, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['blogs']);
    },
  });

  const {
    mutateAsync: deleteLike,
    isLoading: deleteLikeLoading,
    isError: deleteLikeError,
  } = useMutation(['likes'], _deleteLike, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['blogs']);
    },
  });

  const loading = createLikeLoading || deleteLikeLoading;
  const error = createLikeError || deleteLikeError;

  return {
    deleteLike,
    createLike,
    loading,
    error,
  };
};
