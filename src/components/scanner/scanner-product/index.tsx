'use client';

import { Button, Flex, Typography } from 'antd';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

import { addMeal } from '@/api';
import { APP_ROUTES } from '@/const/routes';
import { MealType } from '@/model/meal';
import { IProduct } from '@/model/product';

import css from './scanner-product.module.css';

interface IProps {
  item: IProduct;
}

export const ScannerProduct = (props: IProps) => {
  const { item, barcode } = props;
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const type = searchParams.get('type');
  const date = searchParams.get('date');

  const productInfo: { label: string; value: string | undefined }[] = [
    {
      label: 'Пищевая ценность:',
      value: item?.product?.quantity ? `на ${item?.product?.quantity}` : 'Не указано'
    },
    {
      label: 'Энергетическая ценность',
      value: `${item?.product?.nutriments?.energy_value} ${item?.product?.nutriments?.energy_unit}`
    },
    {
      label: 'Белки',
      value: `${item?.product?.nutriments?.proteins} ${item?.product?.nutriments?.proteins_unit}`
    },
    {
      label: 'Жиры',
      value: `${item?.product?.nutriments?.fat} ${item?.product?.nutriments?.fat_unit}`
    },
    {
      label: 'Углеводы',
      value: `${item?.product?.nutriments?.carbohydrates} ${item?.product?.nutriments?.carbohydrates_unit}`
    }
  ];

  const onAddClick = async () => {
    const tgId = window?.Telegram?.WebApp?.initDataUnsafe?.user?.id;

    await addMeal({
      barcode: item?.code,
      date,
      type: type as MealType,
      protein: item?.product?.nutriments?.proteins,
      kcal: item?.product?.nutriments?.['energy_value'],
      carbs: item?.product?.nutriments?.carbohydrates,
      fat: item?.product?.nutriments?.fat,
      tgId: tgId?.toString()
    }).then(() => {
      replace(APP_ROUTES.ANALYSIS);
    });
  };

  return (
    <Flex vertical gap={16}>
      <Flex className={css.productHeader} gap={24} align="center">
        <Image src={item.product.image_front_small_url} width={150} height={150} alt="product" />
        <Flex gap={8} vertical>
          <Typography.Title level={5}>{item?.product.product_name || 'Не указано'}</Typography.Title>
          <Typography.Text type="secondary">{item?.product.brands || 'Не указано'}</Typography.Text>
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
      <Button type="primary" onClick={onAddClick}>
        Добавить
      </Button>
    </Flex>
  );
};
