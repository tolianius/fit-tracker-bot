'use client';

import { Flex } from 'antd';
import dayjs from 'dayjs';
import { useMemo } from 'react';

import { AnalysisDailyProgress, IDailyProgressKcal } from '@/components/analysis/analysis-daily-progress';
import { WeekRange } from '@/lib/getWeekRange';
import { MealGroup } from '@/model/meal';

const shortDateName: string[] = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

const getDatesBetween = (range: WeekRange) => {
  const dates = [];
  let current = dayjs(range.from);
  const end = dayjs(range.to);

  while (current.diff(end, 'day') <= 0) {
    dates.push(current.format('DD-MM-YYYY'));
    current = current.add(1, 'day');
  }

  return dates;
};

interface IProps {
  dateRange: WeekRange;
  mealsGroup: MealGroup[];
  currentDate: Date;
}

export const AnalysisWeekProgress = (props: IProps) => {
  const { mealsGroup, dateRange, currentDate } = props;

  const data = useMemo((): IDailyProgressKcal[] => {
    const dates = getDatesBetween(dateRange);
    return dates.map((date, index) => {
      const result = mealsGroup.find((x) => x.date === date);

      return {
        active: date === dayjs(currentDate).format('DD-MM-YYYY'),
        day: shortDateName[index],
        kcal: result ? result.meals.reduce((sum, meal) => sum + (meal.kcal ?? 0), 0) : 0,
        maxKcal: 2000
      };
    });
  }, [dateRange, mealsGroup]);

  return (
    <Flex justify="space-between">
      {data.map((item, i) => {
        return <AnalysisDailyProgress key={i} {...item} />;
      })}
    </Flex>
  );
};
