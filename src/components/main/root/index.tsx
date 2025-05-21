'use client';

import { StyleProvider } from '@ant-design/cssinjs';
import { ConfigProvider } from 'antd';
import { PropsWithChildren } from 'react';

import { Page } from '@/components/main';

export const Root = (props: PropsWithChildren) => {
  return (
    <StyleProvider hashPriority="high">
      <ConfigProvider>
        <Page>{props.children}</Page>
      </ConfigProvider>
    </StyleProvider>
  );
};
