export * from './types/profile.js';
export * from './validation/profile.js';

export const MVP_MODULES = [
  'Morning check-in',
  'Medication adherence',
  'Workout and walk logging',
  'Meal and beverage logging',
  'Work diary',
  'Study planning and sessions',
  'Habit tracking',
  'Screen-time logging',
  'Dashboard with weekly analytics'
] as const;

export const WEEKLY_ANALYTICS = [
  'Sleep average',
  'Medication adherence',
  'Workout minutes',
  'Study hours vs target',
  'Meal source distribution',
  'Screen time summary'
] as const;
