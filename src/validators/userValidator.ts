import { z } from 'zod';

export const UserSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username should have minimum 3 characters' })
    .max(10, { message: 'Username should be maximum 10 characters' }),
  password: z
    .string()
    .min(8, { message: 'Password should have minimum 8 characters' })
    .max(20, { message: 'Password should be maximum 20 characters' })
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/\d/, 'Password must contain at least one number')
    .regex(
      /[@$!%*?&^#]/,
      'Password must contain at least one special character (@, $, !, %, *, ?, &, ^, #)'
    ),
});
