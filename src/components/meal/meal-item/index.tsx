'use client';

import { PlusOutlined } from '@ant-design/icons';
import { Button, Collapse, CollapseProps, Divider, Flex, Progress, Typography } from 'antd';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { Fragment, useMemo } from 'react';

import { MealCollapseItem } from '@/components/meal/meal-collapse-item';
import { MacronutrientProgress } from '@/components/shared';
import { APP_ROUTES } from '@/const/routes';
import { Meal, MealType } from '@/model/meal';
import { INutriment } from '@/model/product';

import css from './meal-item.module.css';

interface IProps {
  type: MealType;
  nutriments: INutriment;
  meals: Meal[];
}

const mealText: Record<MealType, string> = {
  [MealType.BREAKFAST]: 'Завтрак',
  [MealType.DINNER]: 'Ужин',
  [MealType.LUNCH]: 'Обед'
};

export const MealItem = (props: IProps) => {
  const { type, meals, nutriments } = props;
  const { replace } = useRouter();

  const onAddClick = () => {
    const date = dayjs(new Date()).format('YYYY-MM-DD');
    replace(APP_ROUTES.PRODUCTS + `?type=${type}&date=${date}`);
  };

  const items: CollapseProps['items'] = useMemo(() => {
    return [
      {
        key: '1',
        label: `${meals.length} продуктов`,
        children: meals.map((item, index) => {
          return (
            <Fragment key={index}>
              <MealCollapseItem meal={item} />
              {meals.length - 1 !== index && <Divider />}
            </Fragment>
          );
        })
      }
    ];
  }, [meals]);

  return (
    <Flex vertical className={css.mealContainer}>
      <Flex justify="space-between" align="center">
        <Typography.Title level={4}>{mealText[type]}</Typography.Title>
        <Button type="primary" shape="circle" size="small" icon={<PlusOutlined />} onClick={onAddClick} />
      </Flex>
      {nutriments.fat === 0 && nutriments.proteins === 0 && nutriments.carbohydrates === 0 ? (
        <Flex vertical>
          <Progress showInfo={false} percent={0} strokeWidth={4} />
          <Typography.Text type="secondary">требуется заполнить</Typography.Text>
        </Flex>
      ) : (
        <Flex vertical gap={8}>
          <MacronutrientProgress nutriments={nutriments} />
          <Collapse className={css.mealCollapse} expandIconPosition="end" size="small" items={items} />
        </Flex>
      )}
    </Flex>
  );
};
