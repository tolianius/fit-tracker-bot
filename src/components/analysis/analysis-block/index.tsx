'use client';

import { StarOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Col, Flex, Row, Typography } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';

import { getMealsByUser } from '@/api';
import { AnalysisProgress } from '@/components/analysis/analysis-progress';
import { AnalysisWeekProgress } from '@/components/analysis/analysis-week-progress';
import { MealItem } from '@/components/meal';
import { CARBOHYDRATES_COLOR, FAT_COLOR, PROTEINS_COLOR } from '@/const/colors';
import { DEFAULT_DATE_FORMAT } from '@/const/date';
import { getAdjustedValue } from '@/lib/getAdjustedValue';
import { Meal, MealType } from '@/model/meal';

import { AnalysisDailyScore } from '../analysis-daily-score';
import css from './analysis-block.module.css';

export const AnalysisBlock = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dailyMeal, setDailyMeal] = useState<Meal[]>([]);

  useEffect(() => {
    const tgId = window?.Telegram?.WebApp?.initDataUnsafe?.user?.id;
    if (!isLoading && tgId) {
      setIsLoading(true);
      getMealsByUser(tgId.toString(), dayjs(new Date()).format('YYYY-MM-DD')).then(setDailyMeal);
      setIsLoading(false);
    }
  }, [isLoading]);

  const dailyKcalValue = useMemo(() => {
    return dailyMeal.reduce((sum, meal) => sum + meal.kcal, 0);
  }, [dailyMeal]);

  const meals = useMemo(() => {
    return [MealType.BREAKFAST, MealType.LUNCH, MealType.DINNER].map((type) => {
      const filteredByType = dailyMeal.filter((x) => x.type === type);
      return {
        type,
        nutriments: {
          proteins: filteredByType.reduce((sum, meal) => sum + getAdjustedValue(meal.protein, meal.amountGrams), 0),
          fat: filteredByType.reduce((sum, meal) => sum + getAdjustedValue(meal.fat, meal.amountGrams), 0),
          carbohydrates: filteredByType.reduce((sum, meal) => sum + getAdjustedValue(meal.carbs, meal.amountGrams), 0)
        }
      };
    });
  }, [dailyMeal]);

  const onPremiumClick = () => {};

  const onShareClick = () => {};

  return (
    <Flex gap={16} vertical className={css.dataContainer}>
      <Flex justify="space-between" align="center">
        <Button
          style={{ backgroundColor: FAT_COLOR }}
          type="primary"
          icon={<StarOutlined />}
          shape="circle"
          onClick={onPremiumClick}
        />
        <Typography.Title level={5}>{`Сегодня, ${dayjs().format(DEFAULT_DATE_FORMAT)}`}</Typography.Title>
        <Button
          style={{ backgroundColor: CARBOHYDRATES_COLOR }}
          type="primary"
          icon={<UploadOutlined />}
          shape="circle"
          onClick={onShareClick}
        />
      </Flex>
      <AnalysisDailyScore value={dailyKcalValue} maxValue={2013} />
      <Row gutter={[16, 16]}>
        <Col xs={8}>
          <AnalysisProgress
            title={'Белки'}
            value={meals.reduce((sum, item) => sum + item.nutriments.proteins, 0)}
            maxValue={99.7}
            color={PROTEINS_COLOR}
          />
        </Col>
        <Col xs={8}>
          <AnalysisProgress
            title={'Жиры'}
            value={meals.reduce((sum, item) => sum + item.nutriments.fat, 0)}
            maxValue={29.5}
            color={FAT_COLOR}
          />
        </Col>
        <Col xs={8}>
          <AnalysisProgress
            title={'Углеводы'}
            value={meals.reduce((sum, item) => sum + item.nutriments.carbohydrates, 0)}
            maxValue={166.2}
            color={CARBOHYDRATES_COLOR}
          />
        </Col>
      </Row>
      <AnalysisWeekProgress />
      {meals.map((item, index) => {
        return <MealItem key={index} {...item} />;
      })}
    </Flex>
  );
};
