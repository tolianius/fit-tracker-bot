'use client';

import { BarChartOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Button, Flex } from 'antd';
import { useRouter } from 'next/navigation';

import { APP_ROUTES } from '@/const/routes';

import css from './footer.module.css';

export const Footer = () => {
  const { replace } = useRouter();

  const onAnalysisClick = () => {
    replace(APP_ROUTES.ANALYSIS);
  };

  const onProfileClick = () => {
    replace(APP_ROUTES.PROFILE);
  };

  return (
    <Flex className={css.footerMask} align="center" justify="center">
      <Flex gap={32} className={css.footerContainer}>
        <Button
          type="primary"
          icon={<BarChartOutlined style={{ fontSize: '16px' }} />}
          shape="circle"
          size="large"
          onClick={onAnalysisClick}
        />
        <Button
          type="primary"
          icon={<UnorderedListOutlined style={{ fontSize: '16px' }} />}
          shape="circle"
          size="large"
          onClick={onProfileClick}
        />
      </Flex>
    </Flex>
  );
};
