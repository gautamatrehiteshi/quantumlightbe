import { z, ZodError } from 'zod';

const changePasswordSchema = z.object({
  oldPassword: z.string().min(8),
  newPassword: z.string().min(8),
});
type User = z.infer<typeof changePasswordSchema>;

export const validateChangePassword = (body: unknown) => {
  let data: User | undefined;
  let error: ZodError | undefined;
  try {
    data = changePasswordSchema.parse(body);
  } catch (err) {
    if (err instanceof ZodError) {
      error = err;
    } else {
      throw err;
    }
  }
  return { data, error };
};
