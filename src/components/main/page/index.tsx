'use client';

import { Flex, Spin } from 'antd';
import { observer } from 'mobx-react';
import { PropsWithChildren, useEffect } from 'react';

import { fetchOrCreateUser } from '@/api';
import { Footer } from '@/components/main';
import { useSessionStore } from '@/providers';

import css from './page.module.css';

export const Page = observer((props: PropsWithChildren) => {
  const sessionStore = useSessionStore();

  useEffect(() => {
    const interval = setInterval(() => {
      const tg = window?.Telegram?.WebApp;
      const tgId = tg?.initDataUnsafe?.user?.id;
      if (tgId) {
        fetchOrCreateUser(tgId.toString())
          .then((res) => sessionStore.setUser(res))
          .catch(console.error);
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return sessionStore.user ? (
    <Flex className={css.pageContainer} vertical gap={16}>
      <Flex className={css.pageContent} vertical gap={16}>
        {props.children}
      </Flex>
      <Footer />
    </Flex>
  ) : (
    <Flex align="center" justify="center" style={{ width: '100vw', height: '100vh' }}>
      <Spin />
    </Flex>
  );
});
