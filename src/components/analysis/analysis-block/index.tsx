'use client';

import { StarOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Col, Flex, Row, Typography } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';

import { getMealsByUser, getUserTargets } from '@/api';
import { AnalysisProgress } from '@/components/analysis/analysis-progress';
import { AnalysisWeekProgress } from '@/components/analysis/analysis-week-progress';
import { MealItem } from '@/components/meal';
import { CARBOHYDRATES_COLOR, FAT_COLOR, PROTEINS_COLOR } from '@/const/colors';
import { DEFAULT_DATE_FORMAT } from '@/const/date';
import { CARBS_DEFAULT_VALUE, FAT_DEFAULT_VALUE, KCAL_DEFAULT_VALUE, PROTEIN_DEFAULT_VALUE } from '@/const/user';
import { getAdjustedValue } from '@/lib/getAdjustedValue';
import { getWeekRange } from '@/lib/getWeekRange';
import { Meal, MealGroup, MealType } from '@/model/meal';
import { UserTargets } from '@/model/user';

import { AnalysisDailyScore } from '../analysis-daily-score';
import css from './analysis-block.module.css';

export const AnalysisBlock = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingTargets, setIsLoadingTargets] = useState<boolean>(false);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [dailyMeal, setDailyMeal] = useState<Meal[]>([]);
  const [weekMeals, setWeekMeals] = useState<MealGroup[]>([]);
  const [targets, setTargets] = useState<UserTargets>();

  const weekRange = useMemo(() => {
    if (currentDate) {
      return getWeekRange(currentDate);
    }
    return null;
  }, [currentDate]);

  useEffect(() => {
    const tgId = window?.Telegram?.WebApp?.initDataUnsafe?.user?.id;
    if (!isLoading && tgId && weekRange) {
      setIsLoading(true);
      getMealsByUser(tgId.toString(), weekRange).then((res) => {
        setWeekMeals(res);
        const currentDayMeal = res.find((group: MealGroup) => dayjs(currentDate).format('DD-MM-YYYY') === group?.date);
        if (currentDayMeal) {
          setDailyMeal(currentDayMeal?.meals);
        }
      });
      setIsLoading(false);
    }
  }, [currentDate, isLoading, weekRange]);

  useEffect(() => {
    const tgId = window?.Telegram?.WebApp?.initDataUnsafe?.user?.id;
    if (!isLoadingTargets && tgId) {
      setIsLoading(true);
      getUserTargets(tgId.toString()).then((res) => {
        setTargets(res);
      });
      setIsLoading(false);
    }
  }, [isLoadingTargets]);

  const dailyKcalValue = useMemo(() => {
    if (dailyMeal.length > 0) {
      return dailyMeal.reduce((sum, meal) => sum + (meal.kcal ?? 0), 0);
    }
    return 0;
  }, [dailyMeal]);

  const meals = useMemo(() => {
    return [MealType.BREAKFAST, MealType.LUNCH, MealType.DINNER].map((type) => {
      if (dailyMeal) {
        const filteredByType = dailyMeal.filter((x) => x.type === type);
        return {
          type,
          nutriments: {
            proteins: filteredByType.reduce((sum, meal) => sum + getAdjustedValue(meal.protein, meal.amountGrams), 0),
            fat: filteredByType.reduce((sum, meal) => sum + getAdjustedValue(meal.fat, meal.amountGrams), 0),
            carbohydrates: filteredByType.reduce((sum, meal) => sum + getAdjustedValue(meal.carbs, meal.amountGrams), 0)
          },
          meals: filteredByType
        };
      }
      return {
        type,
        nutriments: {
          proteins: 0,
          fat: 0,
          carbohydrates: 0
        },
        meals: []
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
      <AnalysisDailyScore value={dailyKcalValue} maxValue={targets?.kcal || KCAL_DEFAULT_VALUE} />
      <Row gutter={[16, 16]}>
        <Col xs={8}>
          <AnalysisProgress
            title={'Белки'}
            value={meals.reduce((sum, item) => sum + item.nutriments.proteins, 0)}
            maxValue={targets?.protein || PROTEIN_DEFAULT_VALUE}
            color={PROTEINS_COLOR}
          />
        </Col>
        <Col xs={8}>
          <AnalysisProgress
            title={'Жиры'}
            value={meals.reduce((sum, item) => sum + item.nutriments.fat, 0)}
            maxValue={targets?.fat || FAT_DEFAULT_VALUE}
            color={FAT_COLOR}
          />
        </Col>
        <Col xs={8}>
          <AnalysisProgress
            title={'Углеводы'}
            value={meals.reduce((sum, item) => sum + item.nutriments.carbohydrates, 0)}
            maxValue={targets?.carbs || CARBS_DEFAULT_VALUE}
            color={CARBOHYDRATES_COLOR}
          />
        </Col>
      </Row>
      {weekRange && <AnalysisWeekProgress currentDate={currentDate} dateRange={weekRange} mealsGroup={weekMeals} />}
      {meals.map((item, index) => {
        return <MealItem key={index} {...item} />;
      })}
    </Flex>
  );
};
