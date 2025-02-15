import dayjs, { Dayjs } from 'dayjs';
import { z } from 'zod';

export const editProfileSchema = z.object({
  email: z
    .string()
    .email({ message: 'Email is required' })
    .max(100, { message: 'Email must be less than hundred symbols' })
    .trim(),
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 symbols long' })
    .max(35, { message: 'Name must be less than 35 symbols' })
    .trim(),
  dateOfBirth: z.custom<Dayjs>((val) => val instanceof dayjs, 'Invalid date'),
  sex: z.enum(['female', 'male']).nullable(),
});
