'use client';

import { Flex, Progress, Typography } from 'antd';

import css from './analysis-daily.module.css';

interface IProps {
  value: number;
  maxValue: number;
}

export const AnalysisDaily = (props: IProps) => {
  const { maxValue, value } = props;

  return (
    <Flex justify="space-between" align="center" className={css.dailyContainer}>
      <Flex vertical gap={8}>
        <Typography.Text>ЗА ДЕНЬ</Typography.Text>
        <Typography.Title>{value}</Typography.Title>
        <Typography.Text>{`ИЗ ${maxValue}`}</Typography.Text>
      </Flex>
      <Progress type="circle" percent={Math.trunc((value * 100) / maxValue)} strokeColor={'#FFFFFF'} />
    </Flex>
  );
};
