import {useQuery} from 'react-query';
import {http} from '../../../service/http/http';
import {z} from 'zod';
import {useState} from 'react';

const GymLocationItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  rating: z.number(),
  latitude: z.string(),
  longitude: z.string(),
});

export type GymLocationItemType = z.infer<typeof GymLocationItemSchema>;

export const useGymLocations = () => {
  const [zodError, setZodError] = useState(false);

  const fetchGymLocations = async () => {
    try {
      const response = await http.get('/gym-locations');
      const parse = z
        .array(GymLocationItemSchema)
        .safeParse(response.data.data);
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
  const query = useQuery(['gym-locations'], fetchGymLocations);

  return {
    queryData: (query.data?.data ?? []) as GymLocationItemType[],
    loading: query.isLoading || query.isIdle,
    error: query.isError || zodError,
  };
};
