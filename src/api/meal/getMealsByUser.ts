import axios from 'axios';

import { WeekRange } from '@/lib/getWeekRange';

export const getMealsByUser = async (tgId: string, range: WeekRange) => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/meal/${tgId}?from=${range.from}&to=${range.to}`);
  return response.data;
};
