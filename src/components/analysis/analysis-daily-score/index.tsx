'use client';

import { Flex, Progress, Typography } from 'antd';

import css from './analysis-daily-score.module.css';

interface IProps {
  value?: number;
  maxValue: number;
}

export const AnalysisDailyScore = (props: IProps) => {
  const { maxValue, value } = props;

  return (
    <Flex justify="space-between" align="center" className={css.dailyContainer}>
      <Flex vertical gap={4}>
        <Typography.Text>ЗА ДЕНЬ</Typography.Text>
        <Typography.Title>{value}</Typography.Title>
        <Typography.Text>{`ИЗ ${maxValue}`}</Typography.Text>
      </Flex>
      <Progress type="circle" percent={Math.trunc(((value ?? 0) * 100) / maxValue)} strokeColor={'#FFFFFF'} />
    </Flex>
  );
};
