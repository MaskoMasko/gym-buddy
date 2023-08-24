import {useMutation, useQuery} from 'react-query';
import {http} from '../../../service/http/http';
import {z} from 'zod';
import {useState} from 'react';
import {ResponseSchema} from '../../../util-types/zod-response-schema';
import {queryClient} from '../../../service/react-query/queryClient';

const BlogSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  authorId: z.number(),
  author: z.object({
    id: z.number(),
    name: z.string(),
  }),
  media: z.optional(
    z.array(
      z.object({
        id: z.number(),
        url: z.string(),
        description: z.nullable(z.string()),
      }),
    ),
  ),
  comments: z.array(
    z.object({
      id: z.number(),
      content: z.string(),
      createdAt: z.string(),
      author: z.optional(
        z.object({
          id: z.number(),
          name: z.string(),
        }),
      ),
    }),
  ),
  likes: z.array(
    z.object({
      id: z.number(),
      createdAt: z.string(),
      user: z.optional(
        z.object({
          id: z.number(),
          name: z.string(),
        }),
      ),
    }),
  ),
});

export type Blog = z.infer<typeof BlogSchema>;

export const useBlogs = () => {
  const [zodError, setZodError] = useState(false);
  const _getBlogs = async () => {
    try {
      const response = await http.get('/blogs');
      const parse = ResponseSchema(BlogSchema).safeParse(response.data);
      if (parse.success) {
        return response.data;
      } else {
        setZodError(true);
        console.error(parse.error);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const _createBlog = async (blog: Blog) => {
    try {
      const response = await http.post('/blogs', blog);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };
  const {data, isLoading, isError} = useQuery(['blogs'], _getBlogs);
  const {
    mutateAsync: createBlog,
    isLoading: createBlogLoading,
    isError: createBlogError,
  } = useMutation(['blogs'], _createBlog, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['blogs']);
    },
  });

  return {
    createBlog,
    blogsList: ((data && data.data) ?? []) as Blog[],
    loading: isLoading || createBlogLoading,
    error: isError || zodError || createBlogError,
  };
};
