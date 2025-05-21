'use client';

import { Flex } from 'antd';

import { AnalysisDailyProgress, IDailyProgressKcal } from '@/components/analysis/analysis-daily-progress';

const fake_data: IDailyProgressKcal[] = [
  {
    day: 'пн',
    kcal: 1200,
    maxKcal: 2400
  },
  {
    day: 'вт',
    kcal: 1200,
    maxKcal: 2400
  },
  {
    day: 'ср',
    kcal: 1200,
    maxKcal: 2400
  },
  {
    day: 'чт',
    kcal: 2200,
    maxKcal: 2400
  },
  {
    day: 'пт',
    kcal: 2240,
    maxKcal: 2400
  },
  {
    day: 'сб',
    kcal: 1700,
    maxKcal: 2400
  },
  {
    day: 'вс',
    kcal: 3200,
    maxKcal: 2400
  }
];

export const AnalysisWeekProgress = () => {
  return (
    <Flex justify="space-between">
      {fake_data.map((item, i) => {
        return <AnalysisDailyProgress key={i} {...item} />;
      })}
    </Flex>
  );
};
