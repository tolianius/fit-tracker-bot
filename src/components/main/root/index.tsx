'use client';

import { StyleProvider } from '@ant-design/cssinjs';
import { ConfigProvider, Flex, Spin } from 'antd';
import { PropsWithChildren, useEffect, useState } from 'react';

import { fetchOrCreateUser } from '@/api';
import { Page } from '@/components/main';
import { lightTheme } from '@/theme';

export const Root = (props: PropsWithChildren) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const tg = window?.Telegram?.WebApp;
      const tgId = tg?.initDataUnsafe?.user?.id;
      if (tgId) {
        fetchOrCreateUser(tgId.toString()).then(setUser).catch(console.error);
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <StyleProvider hashPriority="high">
      <ConfigProvider theme={lightTheme}>
        {user ? (
          <Page>{props.children}</Page>
        ) : (
          <Flex align="center" justify="center" style={{ width: '100vw', height: '100vh' }}>
            <Spin />
          </Flex>
        )}
      </ConfigProvider>
    </StyleProvider>
  );
};
