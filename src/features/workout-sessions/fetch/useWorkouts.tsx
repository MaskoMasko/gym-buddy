import {useQuery} from 'react-query';
import {http} from '../../../service/http/http';
import {z} from 'zod';
import {useState} from 'react';
import {ResponseSchema} from '../../../util-types/zod-response-schema';

const WorkoutSchema = z.object({
  id: z.number(),
  type: z.string(),
  difficulty: z.string(),
  duration: z.array(z.number()),
  equipment: z.string(),
});
export type Workout = z.infer<typeof WorkoutSchema>;

//for now
type workoutTypeFilter = 'Abs' | 'Chest' | 'Legs';

export const useWorkouts = (filter?: workoutTypeFilter) => {
  const [zodError, setZodError] = useState(false);
  const _getWorkouts = async () => {
    try {
      const response = await http.get(`/workouts/${filter ?? ''}`);
      const parse = ResponseSchema(WorkoutSchema).safeParse(response.data);
      if (parse.success) {
        return response.data;
      } else {
        setZodError(true);
        console.error(parse.error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const query = useQuery(['workouts'], _getWorkouts);
  return {
    queryData: (query.data?.data ?? []) as Workout[],
    error: query.isError || zodError,
    loading: query.isLoading,
  };
};
