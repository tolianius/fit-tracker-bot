'use client';

import { LeftOutlined } from '@ant-design/icons';
import { Button, Col, Flex, Form, Input, InputNumber, Row, Typography } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

import { addMeal } from '@/api';
import { APP_ROUTES } from '@/const/routes';
import { MealType } from '@/model/meal';

interface IAddNewProductValues {
  productName: string;
  kcal: number;
  carbs: number;
  fat: number;
  protein: number;
  amountGrams: number;
}

export const ProductAddView = () => {
  const { back, replace } = useRouter();
  const searchParams = useSearchParams();
  const [form] = Form.useForm<IAddNewProductValues>();

  const type = searchParams.get('type');
  const date = searchParams.get('date');

  const onAddClick = async (values: IAddNewProductValues) => {
    const tgId = window?.Telegram?.WebApp?.initDataUnsafe?.user?.id;

    await addMeal({
      date,
      type: type as MealType,
      tgId: tgId?.toString(),
      ...values
    }).then(() => {
      replace(APP_ROUTES.ANALYSIS);
    });
  };

  return (
    <Flex vertical gap={16}>
      <Flex align="center" gap={8}>
        <Button type="primary" icon={<LeftOutlined />} shape="circle" size="small" onClick={back} />
        <Typography.Title level={3} style={{ textAlign: 'center' }}>
          Добавление продукта
        </Typography.Title>
      </Flex>

      <Form layout="vertical" variant="filled" form={form} onFinish={onAddClick} requiredMark="optional">
        <Row gutter={[16, 0]}>
          <Col xs={24}>
            <Form.Item
              rules={[
                {
                  required: true
                }
              ]}
              name="productName"
              label="Название продукта"
            >
              <Input placeholder="Введите название продукта" />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item
              rules={[
                {
                  required: true
                }
              ]}
              name="kcal"
              label="Калорийность"
              tooltip="на 100г"
            >
              <InputNumber style={{ width: '100%' }} placeholder="0" />
            </Form.Item>
          </Col>
          <Col xs={8}>
            <Form.Item
              rules={[
                {
                  required: true
                }
              ]}
              name="protein"
              label="Белки"
            >
              <InputNumber style={{ width: '100%' }} placeholder="0" />
            </Form.Item>
          </Col>
          <Col xs={8}>
            <Form.Item
              rules={[
                {
                  required: true
                }
              ]}
              name="fat"
              label="Жиры"
            >
              <InputNumber style={{ width: '100%' }} placeholder="0" />
            </Form.Item>
          </Col>
          <Col xs={8}>
            <Form.Item
              rules={[
                {
                  required: true
                }
              ]}
              name="carbs"
              label="Углеводы"
            >
              <InputNumber style={{ width: '100%' }} placeholder="0" />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item
              rules={[
                {
                  required: true
                }
              ]}
              name="amountGrams"
              label="В граммах"
            >
              <InputNumber style={{ width: '100%' }} placeholder="0" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" block onClick={() => form.submit()}>
            Добавить
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};
