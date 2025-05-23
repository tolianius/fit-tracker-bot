'use client';

import { RightOutlined } from '@ant-design/icons';
import { Flex, Typography } from 'antd';
import { ReactNode } from 'react';

import css from './link-button.module.css';

export interface ILinkButton {
  icon: ReactNode;
  title: string;
  onClick: () => void;
}

export const LinkButton = (props: ILinkButton) => {
  const { icon, title, onClick } = props;

  return (
    <Flex className={css.linkButton} justify="space-between" onClick={onClick}>
      <Flex gap={8} align="center">
        {icon && <Flex className={css.linkIcon}>{icon}</Flex>}
        <Typography.Text>{title}</Typography.Text>
      </Flex>
      <RightOutlined />
    </Flex>
  );
};
