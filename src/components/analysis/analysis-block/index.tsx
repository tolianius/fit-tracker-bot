'use client';

import { StarOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Col, Flex, Row, Typography } from 'antd';
import dayjs from 'dayjs';
import { observer } from 'mobx-react';
import { useEffect, useMemo, useState } from 'react';

import { getMealsByUser } from '@/api';
import { AnalysisProgress } from '@/components/analysis/analysis-progress';
import { AnalysisWeekProgress } from '@/components/analysis/analysis-week-progress';
import { MealItem } from '@/components/meal';
import { CARBOHYDRATES_COLOR, FAT_COLOR, PROTEINS_COLOR } from '@/const/colors';
import { DEFAULT_DATE_FORMAT } from '@/const/date';
import { CARBS_DEFAULT_VALUE, FAT_DEFAULT_VALUE, KCAL_DEFAULT_VALUE, PROTEIN_DEFAULT_VALUE } from '@/const/user';
import { getWeekRange } from '@/lib/getWeekRange';
import { useSessionStore } from '@/providers';
import { useMealStore } from '@/providers/MobxProvider';

import { AnalysisDailyScore } from '../analysis-daily-score';
import css from './analysis-block.module.css';

export const AnalysisBlock = observer(() => {
  const sessionStore = useSessionStore();
  const mealStore = useMealStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const weekRange = useMemo(() => {
    if (currentDate) {
      return getWeekRange(currentDate);
    }
    return null;
  }, [currentDate]);

  useEffect(() => {
    if (!isLoading && sessionStore.user?.tgId && weekRange) {
      setIsLoading(true);
      getMealsByUser(sessionStore.user.tgId, weekRange).then((res) => {
        mealStore.setWeekMeals(res, currentDate);
      });
      setIsLoading(false);
    }
  }, [sessionStore.user?.tgId, currentDate, isLoading, weekRange]);

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
      <AnalysisDailyScore
        value={mealStore.dailyMeal?.kcal}
        maxValue={sessionStore?.targets?.kcal || KCAL_DEFAULT_VALUE}
      />
      <Row gutter={[16, 16]}>
        <Col xs={8}>
          <AnalysisProgress
            title={'Белки'}
            value={mealStore.dailyMeal?.proteins}
            maxValue={sessionStore?.targets?.protein || PROTEIN_DEFAULT_VALUE}
            color={PROTEINS_COLOR}
          />
        </Col>
        <Col xs={8}>
          <AnalysisProgress
            title={'Жиры'}
            value={mealStore.dailyMeal?.fat}
            maxValue={sessionStore?.targets?.fat || FAT_DEFAULT_VALUE}
            color={FAT_COLOR}
          />
        </Col>
        <Col xs={8}>
          <AnalysisProgress
            title={'Углеводы'}
            value={mealStore.dailyMeal?.carbohydrates}
            maxValue={sessionStore?.targets?.carbs || CARBS_DEFAULT_VALUE}
            color={CARBOHYDRATES_COLOR}
          />
        </Col>
      </Row>
      {weekRange && (
        <AnalysisWeekProgress currentDate={currentDate} dateRange={weekRange} mealsGroup={mealStore.weekMeals} />
      )}
      {mealStore.dailyMeal?.mealsByType.map((item, index) => {
        return <MealItem key={index} {...item} />;
      })}
    </Flex>
  );
});
