'use client';

import { PlusOutlined } from '@ant-design/icons';
import { Button, Flex, Typography } from 'antd';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';

import { MacronutrientProgress } from '@/components/shared';
import { APP_ROUTES } from '@/const/routes';
import { MealType } from '@/model/meal';
import { INutriment } from '@/model/product';

import css from './meal-item.module.css';

interface IProps {
  type: MealType;
  nutriments: INutriment;
}

const mealText: Record<MealType, string> = {
  [MealType.BREAKFAST]: 'Завтрак',
  [MealType.DINNER]: 'Ужин',
  [MealType.LUNCH]: 'Обед'
};

export const MealItem = (props: IProps) => {
  const { type } = props;
  const { replace } = useRouter();

  const onScanClick = () => {
    const date = dayjs(new Date()).format('YYYY-MM-DD');
    replace(APP_ROUTES.PRODUCTS + `?type=${type}&date=${date}`);
  };

  return (
    <Flex vertical className={css.mealContainer}>
      <Flex justify="space-between" align="center">
        <Typography.Title level={4}>{mealText[type]}</Typography.Title>
        <Button type="primary" shape="circle" size="small" icon={<PlusOutlined />} onClick={onScanClick} />
      </Flex>

      <MacronutrientProgress {...props} />
    </Flex>
  );
};
