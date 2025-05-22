'use client';

import { Button, Flex, Typography } from 'antd';
import Image from 'next/image';
import React from 'react';

import { IProductInfo } from '@/model/product';

import css from './product-item.module.css';

interface IProps {
  product: IProductInfo;
}

export const ProductItem = (props: IProps) => {
  const { product } = props;

  const productInfo: { label: string; value: string | undefined }[] = [
    {
      label: 'Пищевая ценность:',
      value: product?.quantity ? `на ${product?.quantity}` : 'Не указано'
    },
    {
      label: 'Энергетическая ценность',
      value: `${product?.nutriments?.energy_value} ${product?.nutriments?.energy_unit}`
    },
    {
      label: 'Белки',
      value: `${product?.nutriments?.proteins} ${product?.nutriments?.proteins_unit}`
    },
    {
      label: 'Жиры',
      value: `${product?.nutriments?.fat} ${product?.nutriments?.fat_unit}`
    },
    {
      label: 'Углеводы',
      value: `${product?.nutriments?.carbohydrates} ${product?.nutriments?.carbohydrates_unit}`
    }
  ];

  return (
    <Flex vertical gap={16}>
      <Flex className={css.productHeader} gap={24} align="center">
        <Image src={product.image_front_small_url} width={150} height={150} alt="product" />
        <Flex gap={8} vertical>
          <Typography.Title level={5}>{product.product_name || 'Не указано'}</Typography.Title>
          <Typography.Text type="secondary">{product.brands || 'Не указано'}</Typography.Text>
        </Flex>
      </Flex>
      <Flex vertical gap={8} className={css.productInfo}>
        {productInfo.map((x, i) => {
          return (
            <Flex justify="space-between" key={i}>
              <Typography.Text>{x.label}</Typography.Text>
              <Typography.Text>{x.value}</Typography.Text>
            </Flex>
          );
        })}
      </Flex>
      <Button type="primary">Добавить</Button>
    </Flex>
  );
};
