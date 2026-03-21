export type WeightUnit = 'kg' | 'lb';
export type DistanceUnit = 'km' | 'mi';

export interface Profile {
  userId: string;
  displayName: string;
  timezone: string;
  weightUnit: WeightUnit;
  distanceUnit: DistanceUnit;
  currencyCode: string;
  dateOfBirth?: string;
}
