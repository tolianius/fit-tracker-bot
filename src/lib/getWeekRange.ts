import dayjs from 'dayjs';

export type WeekRange = {
  from: string;
  to: string;
};

export const getWeekRange = (date: string | Date): WeekRange => {
  const d = dayjs(date);
  const dayOfWeek = d.day();
  const adjustedDay = dayOfWeek === 0 ? 7 : dayOfWeek;

  const from = d.subtract(adjustedDay - 1, 'day').format('YYYY-MM-DD');
  const to = d.add(7 - adjustedDay, 'day').format('YYYY-MM-DD');

  return { from, to };
};
