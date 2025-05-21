'use client';

import { StyleProvider } from '@ant-design/cssinjs';
import { ConfigProvider } from 'antd';
import { PropsWithChildren } from 'react';

import { Page } from '@/components/main';
import { lightTheme } from '@/theme';

export const Root = (props: PropsWithChildren) => {
  return (
    <StyleProvider hashPriority="high">
      <ConfigProvider theme={lightTheme}>
        <Page>{props.children}</Page>
      </ConfigProvider>
    </StyleProvider>
  );
};
