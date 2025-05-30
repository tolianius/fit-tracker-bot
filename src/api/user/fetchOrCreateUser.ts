import axios from 'axios';

export const fetchOrCreateUser = async (tgId: string) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user`, { tgId });
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении/создании пользователя:', error);
    throw error;
  }
};
