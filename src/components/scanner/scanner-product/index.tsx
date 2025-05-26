'use client';

import { Button, Flex, Form, InputNumber, Typography } from 'antd';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

import { addMeal } from '@/api';
import { APP_ROUTES } from '@/const/routes';
import { MealType } from '@/model/meal';
import { IProduct } from '@/model/product';

import css from './scanner-product.module.css';

interface IProps {
  item: IProduct;
}

interface IAddProductValues {
  amountGrams: number;
}

export const ScannerProduct = (props: IProps) => {
  const { item, barcode } = props;
  const searchParams = useSearchParams();
  const [form] = Form.useForm<IAddProductValues>();
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
      value: `${item?.product?.nutriments?.energy_100g} ${item?.product?.nutriments?.energy_unit}`
    },
    {
      label: 'Белки',
      value: `${item?.product?.nutriments?.proteins_100g} ${item?.product?.nutriments?.proteins_unit}`
    },
    {
      label: 'Жиры',
      value: `${item?.product?.nutriments?.fat_100g} ${item?.product?.nutriments?.fat_unit}`
    },
    {
      label: 'Углеводы',
      value: `${item?.product?.nutriments?.carbohydrates_100g} ${item?.product?.nutriments?.carbohydrates_unit}`
    }
  ];

  useEffect(() => {
    form.setFieldValue(['amountGrams'], item?.product?.product_quantity);
  }, [item]);

  const onAddClick = async (values: IAddProductValues) => {
    const tgId = window?.Telegram?.WebApp?.initDataUnsafe?.user?.id;

    await addMeal({
      barcode: item?.code,
      date,
      type: type as MealType,
      protein: item?.product?.nutriments?.proteins_100g,
      kcal: item?.product?.nutriments?.['energy-kcal_100g'],
      carbs: item?.product?.nutriments?.carbohydrates_100g,
      fat: item?.product?.nutriments?.fat_100g,
      tgId: tgId?.toString(),
      productName: item?.product?.product_name,
      ...values
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
      <Flex justify="center">
        <Form layout="inline" form={form} onFinish={onAddClick}>
          <Form.Item required name="amountGrams">
            <InputNumber suffix="g" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" block onClick={() => form.submit()}>
              Добавить
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </Flex>
  );
};
