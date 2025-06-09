import axios from 'axios';

import { ActivityLevelType, GenderType, GoalType } from '@/model/user';

export interface UpdateUserInput {
  tgId: string;
  weight: number;
  height: number;
  birthday: string; // в формате 'YYYY-MM-DD'
  gender: GenderType;
  activityLevel: ActivityLevelType;
  goal: GoalType;
}

export const updateUser = async (data: UpdateUserInput) => {
  const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/user/${data.tgId}`, data);
  return response.data;
};
