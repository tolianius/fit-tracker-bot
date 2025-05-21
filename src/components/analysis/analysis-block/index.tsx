'use client';

import { StarOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Col, Flex, Row, Typography } from 'antd';
import dayjs from 'dayjs';

import { AnalysisProgress } from '@/components/analysis/analysis-progress';
import { AnalysisWeekProgress } from '@/components/analysis/analysis-week-progress';
import { MealItem } from '@/components/meal';
import { CARBOHYDRATES_COLOR, FAT_COLOR, PROTEINS_COLOR } from '@/const/colors';
import { DEFAULT_DATE_FORMAT } from '@/const/date';

import { AnalysisDailyScore } from '../analysis-daily-score';
import css from './analysis-block.module.css';

export const AnalysisBlock = () => {
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
      <AnalysisDailyScore value={1400} maxValue={2013} />
      <Row gutter={[16, 16]}>
        <Col xs={8}>
          <AnalysisProgress title={'Белки'} value={52.3} maxValue={99.7} color={PROTEINS_COLOR} />
        </Col>
        <Col xs={8}>
          <AnalysisProgress title={'Жиры'} value={45.1} maxValue={29.5} color={FAT_COLOR} />
        </Col>
        <Col xs={8}>
          <AnalysisProgress title={'Углеводы'} value={99.7} maxValue={166.2} color={CARBOHYDRATES_COLOR} />
        </Col>
      </Row>
      <AnalysisWeekProgress />
      <MealItem
        title="Завтрак"
        nutriments={{
          proteins: 22,
          fat: 6.1,
          carbohydrates: 1
        }}
      />
      <MealItem
        title="Обед"
        nutriments={{
          proteins: 12,
          fat: 55.1,
          carbohydrates: 22
        }}
      />
      <MealItem
        title="Ужин"
        nutriments={{
          proteins: 2,
          fat: 6.1,
          carbohydrates: 15
        }}
      />
    </Flex>
  );
};
