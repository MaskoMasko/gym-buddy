import {useQuery} from 'react-query';
import {http} from '../../../service/http/http';
import {z} from 'zod';
import {useState} from 'react';

const GymItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  rating: z.number(),
  latitude: z.string(),
  longitude: z.string(),
  website: z.string(),
  address: z.string(),
  reviews: z.array(
    z.object({
      id: z.number(),
      text: z.string(),
      userId: z.number(),
      gymId: z.number(),
    }),
  ),
  images: z.array(
    z.object({
      id: z.number(),
      uri: z.string(),
      gymId: z.number(),
    }),
  ),
  workingHours: z.array(
    z.object({
      id: z.number(),
      day: z.string(),
      open: z.string(),
      close: z.string(),
      gymId: z.number(),
    }),
  ),
});

export type GymItemType = z.infer<typeof GymItemSchema>;

export const useGyms = () => {
  const [zodError, setZodError] = useState(false);

  const fetchGyms = async () => {
    try {
      const response = await http.get('/gyms');
      const parse = z.array(GymItemSchema).safeParse(response.data.data);
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
  const query = useQuery(['gym-locations'], fetchGyms);

  return {
    queryData: (query.data?.data ?? []) as GymItemType[],
    loading: query.isLoading || query.isIdle,
    error: query.isError || zodError,
  };
};
