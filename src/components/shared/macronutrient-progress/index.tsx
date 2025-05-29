'use client';

import { Flex, Progress, Typography } from 'antd';

import { CARBOHYDRATES_COLOR, FAT_COLOR, PROTEINS_COLOR } from '@/const/colors';
import { INutriment } from '@/model/product';

interface IProps {
  nutriments: INutriment;
}

export const MacronutrientProgress = (props: IProps) => {
  const { nutriments } = props;

  const data = [
    { label: 'Белки', grams: nutriments.proteins, color: PROTEINS_COLOR },
    { label: 'Жиры', grams: nutriments.fat, color: FAT_COLOR },
    { label: 'Углеводы', grams: nutriments.carbohydrates, color: CARBOHYDRATES_COLOR }
  ];

  const total = data.reduce((sum, item) => sum + item.grams, 0);

  const MIN_WIDTH = 15; // минимальная ширина — 10%
  const actualProportions = data.map((d) => d.grams / total);
  const adjusted = actualProportions.map((p) => Math.max(p * 100, MIN_WIDTH));
  const totalAdjusted = adjusted.reduce((a, b) => a + b, 0);
  const normalized = adjusted.map((v) => (v / totalAdjusted) * 100);

  return (
    <Flex gap={4}>
      {data.map((item, i) => (
        <Flex
          key={i}
          vertical
          style={{
            width: `${normalized[i]}%`
          }}
        >
          <Progress showInfo={false} percent={100} strokeColor={item.color} strokeWidth={4} />
          <Typography.Text type="secondary">{`${item.grams.toFixed(1)} ${item.label?.[0]}`}</Typography.Text>
        </Flex>
      ))}
    </Flex>
  );
};
//
