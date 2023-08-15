import {useState} from 'react';
import {useMutation, useQuery} from 'react-query';
import {z} from 'zod';
import {http} from '../../../service/http/http';
import {ResponseSchema} from '../../../util-types/zod-response-schema';

const WorkoutSchema = z.object({
  // category: z.string(),
  id: z.number(),
  completed: z.boolean(),
  duration: z.number(),
  est_duration: z.number(),

  //idk why z.date() does not work
  date: z.string(),
  //TODO: HANDLE REST OBJECTS
  // exercises: ExerciseSchema.array(),
});
export type Workout = z.infer<typeof WorkoutSchema>;

export const useWorkout = () => {
  const [zodError, setZodError] = useState(false);
  async function _createWorkout(
    //exercises is an array of exercise ids
    //id we get on backend
    data: Omit<Workout, 'exercises' | 'id'> & {exercises: (number | string)[]},
  ) {
    try {
      const response = await http.post('/workout', data);
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
  }
  const {
    mutateAsync: createWorkout,
    isError,
    isLoading,
  } = useMutation(['workouts'], _createWorkout);

  async function _getWorkouts() {
    try {
      const response = await http.get('/workout');
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
  }

  const query = useQuery(['workouts'], _getWorkouts);
  return {
    createWorkout,
    workoutsList: (query.data ?? []) as {data: Workout[]},
    loading: query.isLoading || isLoading,
    error: query.isError || isError || zodError,
  };
};
