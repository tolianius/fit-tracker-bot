import axios from 'axios';

import { Meal } from '@/model/meal';

export const addMeal = async (meal: Meal) => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/meal`, meal);
  return response.data;
};
