import { z, ZodError } from 'zod';

const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstname: z.string().min(3),
  lastname: z.string().min(3),
});
type User = z.infer<typeof createUserSchema>;

export const validateCreateUser = (body: unknown) => {
  let data: User | undefined;
  let error: ZodError | undefined;
  try {
    data = createUserSchema.parse(body);
  } catch (err) {
    if (err instanceof ZodError) {
      error = err;
    } else {
      throw err;
    }
  }
  return { data, error };
};
