'use client';

import { LeftOutlined } from '@ant-design/icons';
import { Button, Flex, Form, InputNumber, Skeleton, Typography } from 'antd';
import Image from 'next/image';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';

import { addMeal, fetchProduct } from '@/api';
import { APP_ROUTES } from '@/const/routes';
import { MealType } from '@/model/meal';
import { IProduct } from '@/model/product';

import css from './product-view.module.css';

interface IAddProductValues {
  amountGrams: number;
}

export const ProductView = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const [form] = Form.useForm<IAddProductValues>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [item, setItem] = useState<IProduct | undefined>();
  const { replace, back } = useRouter();

  const code = params.code;
  const type = searchParams.get('type');
  const date = searchParams.get('date');

  useEffect(() => {
    if (!isLoading && code && !item) {
      setIsLoading(true);
      fetchProduct(code as string)
        .then((product) => {
          if (product) {
            setItem(product);
          }
        })
        .finally(() => setIsLoading(false));
    }
  }, [code, isLoading, item]);

  const productInfo: { label: string; value: string | undefined }[] = useMemo(() => {
    return [
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
  }, [item]);

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
      amountGrams: Number(values?.amountGrams)
    }).then(() => {
      replace(APP_ROUTES.ANALYSIS);
    });
  };

  return (
    <Flex vertical gap={16}>
      <Flex align="center" gap={8}>
        <Button type="primary" icon={<LeftOutlined />} shape="circle" size="small" onClick={back} />
        <Typography.Title level={3} style={{ textAlign: 'center' }}>
          Продукт
        </Typography.Title>
      </Flex>

      <Flex className={css.productHeader} gap={24} align="center">
        {isLoading ? (
          <Skeleton.Image style={{ width: 150, height: 150 }} active />
        ) : (
          <Image src={item?.product?.image_front_small_url || ''} width={150} height={150} alt="product" />
        )}

        <Flex gap={8} vertical>
          <Typography.Title level={5}>
            {isLoading ? (
              <Skeleton.Input style={{ width: 100 }} active size="small" />
            ) : (
              item?.product?.product_name || 'Не указано'
            )}
          </Typography.Title>
          <Typography.Text type="secondary">
            {isLoading ? (
              <Skeleton.Input style={{ width: 120 }} active size="small" />
            ) : (
              item?.product?.brands || 'Не указано'
            )}
          </Typography.Text>
        </Flex>
      </Flex>

      <Flex vertical gap={8} className={css.productInfo}>
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <Flex justify="space-between" key={i}>
                <Skeleton.Input style={{ width: 100 }} active size="small" />
                <Skeleton.Input style={{ width: 80 }} active size="small" />
              </Flex>
            ))
          : productInfo.map((x, i) => (
              <Flex justify="space-between" key={i}>
                <Typography.Text>{x.label}</Typography.Text>
                <Typography.Text>{x.value}</Typography.Text>
              </Flex>
            ))}
      </Flex>

      <Flex justify="center">
        {isLoading ? (
          <Skeleton.Input style={{ width: 200 }} active />
        ) : (
          <Form layout="inline" form={form} onFinish={onAddClick}>
            <Form.Item
              rules={[
                {
                  required: true
                }
              ]}
              name="amountGrams"
            >
              <InputNumber suffix="g" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" block onClick={() => form.submit()}>
                Добавить
              </Button>
            </Form.Item>
          </Form>
        )}
      </Flex>
    </Flex>
  );
};
