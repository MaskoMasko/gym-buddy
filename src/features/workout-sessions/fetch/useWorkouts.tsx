import {useState} from 'react';
import {useMutation} from 'react-query';
import {z} from 'zod';
import {http} from '../../../service/http/http';
import {client} from '../../../service/react-query/queryClient';
import {ResponseSchema} from '../../../util-types/zod-response-schema';
import {create} from 'zustand';

const WorkoutSchema = z.object({
  id: z.number(),
  type: z.string(),
  difficulty: z.string(),
  duration: z.number(),
  equipment: z.boolean(),
});
export type Workout = z.infer<typeof WorkoutSchema>;

const _workoutStore = create<{
  workoutList: Workout[];
  setWorkoutList: (newWorkoutList: Workout[]) => void;
}>(set => ({
  workoutList: [],
  setWorkoutList: newWorkoutList => set(() => ({workoutList: newWorkoutList})),
}));

export const useWorkouts = () => {
  const [zodError, setZodError] = useState(false);
  const workoutStore = _workoutStore(state => state);
  const _getWorkouts = async ({
    type,
    difficulty,
    duration,
    equipment,
  }: Partial<Omit<Workout, 'type'> & {type: string | string[]}>) => {
    try {
      // const response = await http.get(
      //   `/workouts?${type && `type=${type}`}&${
      //     difficulty && `difficulty=${difficulty}`
      //   }&${duration && `duration=${duration}`}&${
      //     equipment && `equipment=${equipment}`
      //   }`,
      // );
      // const queryParams = new URLSearchParams();
      // if (type) {
      //   queryParams.append('type', type);
      // }
      // if (difficulty) {
      //   queryParams.append('difficulty', difficulty);
      // }
      // //String in case of 0 and false
      // if (String(duration)) {
      //   queryParams.append('duration', String(duration));
      // }
      // if (String(equipment)) {
      //   queryParams.append('equipment', String(equipment));
      // }
      const validParamList = (paramList: any[]) => {
        return paramList.toString().replace(/,/g, '&');
      };
      const queryParams = `${
        Array.isArray(type)
          ? validParamList(type.map(e => `type=${e}`))
          : type
          ? `type=${type}`
          : ''
      }&${difficulty ? `difficulty=${difficulty}` : ''}&${
        duration ? `duration=${duration}` : ''
      }&${
        //kaki jer eq more biti i false :(
        equipment !== undefined ? `equipment=${equipment}` : ''
      }`;
      const response = await http.get(`/workouts?${queryParams}`);
      const parse = ResponseSchema(WorkoutSchema).safeParse(response.data);
      if (parse.success) {
        workoutStore.setWorkoutList(response.data.data);
        return response.data;
      } else {
        setZodError(true);
        console.error(parse.error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const {
    mutateAsync: createWorkout,
    isLoading,
    isError,
  } = useMutation(['workouts'], _getWorkouts, {
    async onSuccess() {
      await client.invalidateQueries(['workouts']);
    },
  });
  return {
    createWorkout,
    queryData: workoutStore.workoutList,
    error: isError || zodError,
    loading: isLoading,
  };
};
