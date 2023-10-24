import { z, ZodError } from 'zod';

const addSensorSchema = z.object({
  name: z.string().min(3),
  group: z.string().min(3),
  pid: z.string().min(3),
});
export type Sensor = z.infer<typeof addSensorSchema>;

export const validateAddSensor = (body: unknown) => {
  let data: Sensor | undefined;
  let error: ZodError | undefined;
  try {
    data = addSensorSchema.parse(body);
  } catch (err) {
    if (err instanceof ZodError) {
      error = err;
    } else {
      throw err;
    }
  }
  return { data, error };
};
