import { z, ZodError } from 'zod';

const updateUserSchema = z.object({
  phone: z
    .string()
    .length(10)
    .regex(/^[0-9]+$/, 'contactNumber should only contain numbers')
    .optional(),

  firstname: z.string().min(3).optional(),
  lastname: z.string().min(3).optional(),
  birthday: z.coerce.date().optional(),
  address: z.string().min(10).optional(),
  city: z.string().min(3).optional(),
  countryCode: z.string().optional(),
});
type User = z.infer<typeof updateUserSchema>;

export const validateUpdateUser = (body: unknown) => {
  let data: User | undefined;
  let error: ZodError | undefined;
  try {
    data = updateUserSchema.parse(body);
  } catch (err) {
    if (err instanceof ZodError) {
      error = err;
    } else {
      throw err;
    }
  }
  return { data, error };
};
