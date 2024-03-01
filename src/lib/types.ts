import { z } from 'zod';

export const authSchema = z
  .object({
    name: z.string().min(1, 'Full name is required'),
    email: z.string().email('Invalid email format').min(1, 'Email is required'),
    password: z
      .string()
      .min(8, 'The password field must be at least 8 characters')
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        'The password field must contain at least one symbol.'
      )
      .regex(/[0-9]/, 'The password field must contain at least one number')
      .regex(
        /[ A-Za-z]/,
        'The password field must contain at least one uppercase and one lowercase letter.'
      ),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'The confirm password field must match password.',
    path: ['passwordConfirm'],
  });

export type AuthFields = z.infer<typeof authSchema>;
