'use client';

import { LeftOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Flex, Form, InputNumber, Radio, Row, Select, Typography } from 'antd';
import dayjs from 'dayjs';
import { observer } from 'mobx-react';
import { useRouter } from 'next/navigation';
import React from 'react';

import { updateUser, UpdateUserInput } from '@/api';
import { SERVER_DATE_FORMAT } from '@/const/date';
import { ActivityLevelType, GenderType, GoalType } from '@/model/user';
import { useSessionStore } from '@/providers';

export const ParametersView = observer(() => {
  const sessionStore = useSessionStore();
  const { back } = useRouter();
  const [form] = Form.useForm<UpdateUserInput>();

  const onAddClick = async (values: UpdateUserInput) => {
    const tgId = window?.Telegram?.WebApp?.initDataUnsafe?.user?.id;
    await updateUser({
      tgId,
      ...values,
      birthday: dayjs(values.birthday).format(SERVER_DATE_FORMAT)
    }).then((res) => {
      sessionStore.setUser(res);
    });
  };

  return (
    <Flex vertical gap={16}>
      <Flex align="center" gap={8}>
        <Button type="primary" icon={<LeftOutlined />} shape="circle" size="small" onClick={back} />
        <Typography.Title level={3} style={{ textAlign: 'center' }}>
          Мои параметры
        </Typography.Title>
      </Flex>
      <Form
        layout="vertical"
        variant="filled"
        form={form}
        onFinish={onAddClick}
        requiredMark="optional"
        initialValues={{
          ...sessionStore?.user,
          birthday: dayjs(sessionStore?.user?.birthday)
        }}
      >
        <Row gutter={[16, 0]}>
          <Col xs={8}>
            <Form.Item
              label="Вес"
              rules={[
                {
                  required: true
                }
              ]}
              name="weight"
            >
              <InputNumber placeholder="0" suffix="кг" />
            </Form.Item>
          </Col>
          <Col xs={16}>
            <Form.Item name="gender" label="Пол" rules={[{ required: true, message: 'Please pick an item!' }]}>
              <Radio.Group
                options={[
                  {
                    label: 'Мужской',
                    value: GenderType.MALE
                  },
                  {
                    label: 'Женский',
                    value: GenderType.FEMALE
                  }
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={8}>
            <Form.Item
              label="Рост"
              rules={[
                {
                  required: true
                }
              ]}
              name="height"
            >
              <InputNumber placeholder="0" suffix="см" />
            </Form.Item>
          </Col>
          <Col xs={16}>
            <Form.Item
              rules={[
                {
                  required: true
                }
              ]}
              name="birthday"
              label="Дата рождения"
            >
              <DatePicker />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item
              name="activityLevel"
              rules={[
                {
                  required: true
                }
              ]}
              label="Уровень активности"
            >
              <Select
                placeholder="Выберите из списка"
                options={[
                  {
                    label: 'Сидячий образ жизни',
                    value: ActivityLevelType.LOW
                  },
                  {
                    label: 'Умеренная активность',
                    value: ActivityLevelType.MODERATE
                  },
                  {
                    label: 'Высокая активность',
                    value: ActivityLevelType.HIGH
                  }
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item
              name="goal"
              rules={[
                {
                  required: true
                }
              ]}
              label="Цель"
            >
              <Select
                placeholder="Выберите из списка"
                options={[
                  {
                    label: 'Поддержание веса',
                    value: GoalType.MAINTAIN
                  },
                  {
                    label: 'Похудение',
                    value: GoalType.LOSE
                  },
                  {
                    label: 'Набор массы',
                    value: GoalType.GAIN
                  }
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item>
              <Button type="primary" block onClick={() => form.submit()}>
                Редактировать
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Flex>
  );
});
