import {AnyZodObject, z} from 'zod';

export const ResponseSchema = (dataSchema: AnyZodObject) => {
  return z.object({
    data: z.array(dataSchema),
  });
};
