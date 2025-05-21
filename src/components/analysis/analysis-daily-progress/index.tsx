'use client';

import { Flex, Progress, Typography } from 'antd';

export interface IDailyProgressKcal {
  maxKcal: number;
  kcal: number;
  // TODO: ПЕРЕДЕЛАТЬ ПОТОМ НА ДАТУ
  day: string;
}

// TODO: КАК ПЕРЕЙДЕМ НА ДАТЫ НАДО ВЫБРАННОЙ ДАТЕ ЗАЛИВАТЬ БЭК ГРАУНД
export const AnalysisDailyProgress = (props: IDailyProgressKcal) => {
  const { day, kcal, maxKcal } = props;
  return (
    <Flex align="center" vertical gap={8}>
      <Typography.Text type="secondary">{day}</Typography.Text>
      <Progress showInfo={false} percent={(kcal * 100) / maxKcal} type="circle" size={24} />
    </Flex>
  );
};
