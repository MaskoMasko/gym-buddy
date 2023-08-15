import {useState} from 'react';
import {useMutation} from 'react-query';
import {z} from 'zod';
import {http} from '../../../service/http/http';
import {client} from '../../../service/react-query/queryClient';
import {ResponseSchema} from '../../../util-types/zod-response-schema';
import {create} from 'zustand';

export const ExerciseSchema = z.object({
  id: z.number(),
  name: z.string(),
  duration: z.nullable(z.number()),
  equipment: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    }),
  ),
  description: z.string(),
  category: z.object({
    id: z.number(),
    name: z.string(),
  }),
  images: z.array(z.object({id: z.number(), image: z.string()})),
  videos: z.array(z.object({id: z.number(), video: z.string()})),
  uuid: z.string(),
  exercise_base_id: z.number(),
  creation_date: z.string(),
});
const RestSchema = z.object({
  name: z.string(),
  duration: z.number(),
});
export type Exercise = z.infer<typeof ExerciseSchema>;
export type ExerciseParams = Partial<{
  categoryIds: number[];
  difficulty: string;
  duration: number;
  equipment: boolean;
}>;
export type Rest = z.infer<typeof RestSchema>;
const ExerciseOrRest = z.union([ExerciseSchema, RestSchema]);

const baseWorkoutDurationInSecs = 45;
const baseRestDurationInSecs = 60;
const etWorkoutDuration =
  baseWorkoutDurationInSecs * 4 + baseRestDurationInSecs;

function addDurationToWorkout(
  workoutDuration: number,
  workoutList: (Exercise | Rest)[],
) {
  const newWorkoutList = [...workoutList];
  const workoutDurationInSecs = workoutDuration * 60;
  const sets = Math.ceil(Math.abs(workoutDurationInSecs / etWorkoutDuration));

  for (
    let i = 1;
    i <= Math.min(sets * etWorkoutDuration, newWorkoutList.length);
    i++
  ) {
    if (i % 5 === 0) {
      //every 4 workouts add a rest
      newWorkoutList.splice(i - 1, 0, {
        name: 'Rest',
        duration: baseRestDurationInSecs,
      });
    } else {
      newWorkoutList[i - 1].duration = baseWorkoutDurationInSecs;
    }
  }
  //add last item to the list if the list is not divisible by 5
  if ((newWorkoutList.length - 1) % 5 !== 0) {
    newWorkoutList.push({name: 'Rest', duration: baseRestDurationInSecs});
  }
  return {data: newWorkoutList};
}

const _exercisesStore = create<{
  exercisesList: Exercise[];
  setExercisesList: (newWorkoutList: Exercise[]) => void;
}>(set => ({
  exercisesList: [],
  setExercisesList: newWorkoutList =>
    set(() => ({exercisesList: newWorkoutList})),
}));

export const useExercises = () => {
  const [zodError, setZodError] = useState(false);
  const exerciseStore = _exercisesStore(state => state);
  const _getExercises = async (params: ExerciseParams = {}) => {
    try {
      const {categoryIds, difficulty, equipment, duration} = params;
      const workoutDurationInSecs = (duration ?? 0) * 60;
      const sets = Math.ceil(
        Math.abs(workoutDurationInSecs / etWorkoutDuration),
      );
      const numberOfExercisesThatWeNeed = sets * 4; //4 exercises per set
      const queryParams = `${
        categoryIds ? `categoryIds=${categoryIds.join(',')}` : ''
      }&${difficulty ? `difficulty=${difficulty}` : ''}&${
        //kaki jer eq more biti i false :(
        equipment !== undefined ? `equipment=${equipment}` : ''
      }&pageSize=${numberOfExercisesThatWeNeed}`;
      const response = await http.get('/exercises?' + queryParams);
      const dataWithDuration = duration
        ? addDurationToWorkout(duration, response.data.data)
        : response.data;
      const parse = ResponseSchema(ExerciseOrRest).safeParse(dataWithDuration);
      if (parse.success) {
        exerciseStore.setExercisesList(dataWithDuration.data);
        return dataWithDuration;
      } else {
        setZodError(true);
        console.error(parse.error);
      }
    } catch (error) {
      console.log(error);
      throw new Error(String(error));
    }
  };
  const mutation = useMutation(['exercises'], _getExercises, {
    async onSuccess() {
      await client.invalidateQueries(['exercises']);
    },
  });
  // https://github.com/TanStack/query/issues/1077
  const mutate = (variables: ExerciseParams = {}) =>
    mutation.mutateAsync(variables);
  const {
    mutateAsync: createWorkout,
    isLoading,
    isError,
  } = {...mutation, mutateAsync: mutate};

  return {
    createWorkout,
    queryData: exerciseStore.exercisesList,
    error: isError || zodError,
    loading: isLoading,
  };
};
