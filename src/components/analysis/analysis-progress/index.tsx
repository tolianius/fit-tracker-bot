'use client';

import { Flex, Progress, Typography } from 'antd';

interface IProps {
  title: string;
  value?: number;
  maxValue: number;
  color: string;
}

export const AnalysisProgress = (props: IProps) => {
  const { maxValue, value, title, color } = props;

  return (
    <Flex vertical gap={8}>
      <Typography.Title level={5}>{title}</Typography.Title>
      <Progress showInfo={false} percent={(value * 100) / maxValue} size="small" strokeColor={color} />
      <Typography.Text type="secondary">{`${value ? value.toFixed(1) : 0} из ${maxValue}`}</Typography.Text>
    </Flex>
  );
};
