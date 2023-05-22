import {useQuery} from 'react-query';
import {http} from '../../../service/http/http';
import {ResponseSchema} from '../../../util-types/zod-response-schema';
import {z} from 'zod';
import {useState} from 'react';

const WorkoutCategorySchema = z.object({
  category: z.string(),
  image: z.string(),
});
type WorkoutCategory = z.infer<typeof WorkoutCategorySchema>;

export const useWorkoutCategories = () => {
  const [zodError, setZodError] = useState(false);
  async function _getWorkoutCategories() {
    try {
      const response = await http.get('/workout-categories');
      const parse = ResponseSchema(WorkoutCategorySchema).safeParse(
        response.data,
      );
      if (parse.success) {
        return response.data;
      } else {
        setZodError(true);
        console.error(parse.error);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const query = useQuery(['workout-categories'], _getWorkoutCategories);
  return {
    queryData: (query.data?.data ?? []) as WorkoutCategory[],
    loading: query.isLoading,
    error: query.isError || zodError,
  };
};
