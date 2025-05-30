'use client';

import { Flex, Progress, Typography } from 'antd';

import { FAT_COLOR } from '@/const/colors';

export interface IDailyProgressKcal {
  active: boolean;
  maxKcal: number;
  kcal: number;
  day: string;
}

export const AnalysisDailyProgress = (props: IDailyProgressKcal) => {
  const { day, kcal, maxKcal, active } = props;
  return (
    <Flex align="center" vertical gap={8}>
      <Typography.Text type="secondary" style={{ color: active ? FAT_COLOR : 'rgba(0,0,0,0.45)' }}>
        {day}
      </Typography.Text>
      <Progress showInfo={false} percent={(kcal * 100) / maxKcal} type="circle" size={24} />
    </Flex>
  );
};
