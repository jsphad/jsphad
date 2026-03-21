import { z } from 'zod';

export const profileSchema = z.object({
  userId: z.string().min(1),
  displayName: z.string().min(1),
  timezone: z.string().min(1),
  weightUnit: z.enum(['kg', 'lb']),
  distanceUnit: z.enum(['km', 'mi']),
  currencyCode: z.string().length(3),
  dateOfBirth: z.string().optional()
});
