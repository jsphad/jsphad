import { profileSchema } from '@ppa/shared';

export const updateProfileSchema = profileSchema.partial().omit({ userId: true });
export type UpdateProfileInput = typeof updateProfileSchema._type;
