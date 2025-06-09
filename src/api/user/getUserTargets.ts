import axios from 'axios';

export const getUserTargets = async (tgId: string) => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/${tgId}/targets`);
  return response.data;
};
