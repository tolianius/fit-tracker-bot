'use client';

import { Flex, Typography } from 'antd';

import { getAdjustedValue } from '@/lib/getAdjustedValue';
import { Meal } from '@/model/meal';

interface IMealCollapseItem {
  meal: Meal;
}

export const MealCollapseItem = (props: IMealCollapseItem) => {
  const { meal } = props;

  return (
    <Flex vertical>
      <Typography.Text>{meal.productName}</Typography.Text>
      <Flex>
        <Typography.Text type="secondary">{`${meal.amountGrams}г - ${getAdjustedValue(meal.kcal, meal.amountGrams)} ккал`}</Typography.Text>
      </Flex>
    </Flex>
  );
};
