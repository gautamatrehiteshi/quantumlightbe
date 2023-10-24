import { z, ZodError } from 'zod';

const forgetPasswordSchema = z.object({
  email: z.string().email(),
});
type ForgetPassword = z.infer<typeof forgetPasswordSchema>;
export const validateForgetPassword = (body: unknown) => {
  let data: ForgetPassword | undefined;
  let error: ZodError | undefined;
  try {
    data = forgetPasswordSchema.parse(body);
  } catch (err) {
    if (err instanceof ZodError) {
      error = err;
    } else {
      throw err;
    }
  }
  return { data, error };
};
