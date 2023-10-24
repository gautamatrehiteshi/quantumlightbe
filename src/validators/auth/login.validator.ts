import { z, ZodError } from 'zod';

const loginSchema = z.object({
  email: z.string().email().nonempty(),
  password: z.string().min(8).nonempty(),
});
type Login = z.infer<typeof loginSchema>;
export const validateLogin = (body: unknown) => {
  let data: Login | undefined;
  let error: ZodError | undefined;
  try {
    data = loginSchema.parse(body);
  } catch (err) {
    if (err instanceof ZodError) {
      error = err;
    } else {
      throw err;
    }
  }
  return { data, error };
};
