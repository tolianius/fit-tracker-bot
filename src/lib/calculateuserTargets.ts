import dayjs from 'dayjs';

import { User, UserTargets } from '@/model/user';

export const calculateUserTargets = (user: User | null): UserTargets | null => {
  if (!user) {
    return null;
  }

  const { weight, height, birthday, gender, activityLevel, goal } = user;

  if (!weight || !height || !birthday || !gender || !activityLevel || !goal) {
    return null;
  }

  const age = dayjs().diff(dayjs(birthday), 'year');

  const bmr =
    gender === 'MALE' ? 10 * weight + 6.25 * height - 5 * age + 5 : 10 * weight + 6.25 * height - 5 * age - 161;

  const activityFactor = activityLevel === 'LOW' ? 1.2 : activityLevel === 'MODERATE' ? 1.55 : 1.725;

  let kcal = bmr * activityFactor;

  if (goal === 'LOSE') kcal -= 500;
  if (goal === 'GAIN') kcal += 500;

  // Макросы: белки - 30%, жиры - 25%, углеводы - 45%
  const protein = (kcal * 0.3) / 4;
  const fat = (kcal * 0.25) / 9;
  const carbs = (kcal * 0.45) / 4;

  return {
    kcal: Math.round(kcal),
    protein: Math.round(protein),
    fat: Math.round(fat),
    carbs: Math.round(carbs)
  };
};
