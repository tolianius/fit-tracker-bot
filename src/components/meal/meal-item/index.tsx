'use client';

import { PlusOutlined } from '@ant-design/icons';
import { Button, Flex, Typography } from 'antd';

import { MacronutrientProgress } from '@/components/shared';
import { INutriment } from '@/model/product';

import css from './meal-item.module.css';

interface IProps {
  title: string;
  nutriments: INutriment;
}

export const MealItem = (props: IProps) => {
  const { title } = props;

  return (
    <Flex vertical className={css.mealContainer}>
      <Flex justify="space-between" align="center">
        <Typography.Title level={4}>{title}</Typography.Title>
        <Button type="primary" shape="circle" size="small" icon={<PlusOutlined />} />
      </Flex>

      <MacronutrientProgress {...props} />
    </Flex>
  );
};
