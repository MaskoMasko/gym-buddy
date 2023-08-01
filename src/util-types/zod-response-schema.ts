import {AnyZodObject, ZodUnion, z} from 'zod';

export const ResponseSchema = (dataSchema: AnyZodObject | ZodUnion<any>) => {
  return z.object({
    data: z.array(dataSchema),
  });
};
