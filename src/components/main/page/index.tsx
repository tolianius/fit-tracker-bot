import { Flex } from 'antd';
import { PropsWithChildren } from 'react';

import { Footer } from '@/components/main';

import css from './page.module.css';

export const Page = (props: PropsWithChildren) => {
  return (
    <Flex className={css.pageContainer} vertical gap={16}>
      <Flex className={css.pageContent} vertical gap={16}>
        {props.children}
      </Flex>
      <Footer />
    </Flex>
  );
};
