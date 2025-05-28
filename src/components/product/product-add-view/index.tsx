'use client';

import { LeftOutlined } from '@ant-design/icons';
import { Button, Col, Flex, Form, Input, InputNumber, Row, Typography } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react';

interface IAddNewProductValues {
  productName: string;
  kcal: number;
  carbs: number;
  fat: number;
  protein: number;
  amountGrams: number;
}

export const ProductAddView = () => {
  const { back } = useRouter();
  const [form] = Form.useForm<IAddNewProductValues>();

  const onAddClick = async (values: IAddNewProductValues) => {
    console.log(values);
  };

  return (
    <Flex vertical gap={16}>
      <Flex align="center" gap={8}>
        <Button type="primary" icon={<LeftOutlined />} shape="circle" size="small" onClick={back} />
        <Typography.Title level={3} style={{ textAlign: 'center' }}>
          Добавление продукта
        </Typography.Title>
      </Flex>
      <Form layout="vertical" variant="filled" form={form} onFinish={onAddClick}>
        <Row gutter={[16, 0]}>
          <Col xs={24}>
            <Form.Item required name="productName" label="Название продукта">
              <Input placeholder="Введите название продукта" />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item required name="kcal" label="Калорийность">
              <InputNumber style={{ width: '100%' }} placeholder="0" />
            </Form.Item>
          </Col>
          <Col xs={8}>
            <Form.Item required name="protein" label="Белки">
              <InputNumber style={{ width: '100%' }} placeholder="0" />
            </Form.Item>
          </Col>
          <Col xs={8}>
            <Form.Item required name="fat" label="Жиры">
              <InputNumber style={{ width: '100%' }} placeholder="0" />
            </Form.Item>
          </Col>
          <Col xs={8}>
            <Form.Item required name="carbs" label="Углеводы">
              <InputNumber style={{ width: '100%' }} placeholder="0" />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item required name="amountGrams" label="в граммах">
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
