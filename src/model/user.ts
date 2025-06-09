export enum GenderType {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}

export enum ActivityLevelType {
  LOW = 'LOW', // сидячий образ жизни
  MODERATE = 'MODERATE', // умеренная активность
  HIGH = 'HIGH' // высокая активность
}

export enum GoalType {
  MAINTAIN = 'MAINTAIN', // поддержание веса
  LOSE = 'LOSE', // похудение
  GAIN = 'GAIN' // набор массы
}

export type UserTargets = { kcal: number; protein: number; fat: number; carbs: number };
