import axios from 'axios';

export const getMealsByUser = async (tgId: string, date: string) => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/meal/${tgId}?date=${date}`);
  return response.data;
};
