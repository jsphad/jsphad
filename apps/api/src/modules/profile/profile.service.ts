import type { Profile } from '@ppa/shared';

import type { UpdateProfileInput } from './profile.schemas.js';

const demoProfile: Profile = {
  userId: 'demo-user-id',
  displayName: 'Demo User',
  timezone: 'UTC',
  weightUnit: 'kg',
  distanceUnit: 'km',
  currencyCode: 'USD'
};

export class ProfileService {
  async getProfile(userId: string) {
    return { ...demoProfile, userId };
  }

  async updateProfile(userId: string, input: UpdateProfileInput) {
    return { ...demoProfile, ...input, userId };
  }
}
