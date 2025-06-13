'use client';

import { FileOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Flex, Typography } from 'antd';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

import { ILinkButton, LinkButton } from '@/components/shared';
import { APP_ROUTES } from '@/const/routes';

import css from './profile-view.module.css';

export const ProfileView = () => {
  const { push } = useRouter();

  const avatarUrl = useMemo(() => {
    return window?.Telegram?.WebApp?.initDataUnsafe?.user?.photo_url;
  }, [window?.Telegram?.WebApp?.initDataUnsafe?.user?.photo_url]);

  const links: ILinkButton[] = [
    {
      icon: <UserOutlined />,
      title: 'Мои параметры',
      onClick: () => {
        push(APP_ROUTES.PROFILE_PARAMETERS);
      }
    },
    /*{
      icon: <SettingOutlined />,
      title: 'Настройки',
      onClick: () => {}
    },
    {
      icon: <StarOutlined />,
      title: 'Премиум',
      onClick: () => {}
    },*/
    {
      icon: <FileOutlined />,
      title: 'Политика конфиденциальности',
      onClick: () => {}
    }
  ];

  return (
    <Flex className={css.profileContainer} vertical gap={32}>
      <Flex vertical align="center" gap={16}>
        <Avatar className={css.profileAvatar} src={avatarUrl} />
        <Typography.Title level={4}>
          {`${window?.Telegram?.WebApp?.initDataUnsafe?.user?.first_name} ${window?.Telegram?.WebApp?.initDataUnsafe?.user?.last_name}`}
        </Typography.Title>
      </Flex>
      <Flex vertical gap={24} justify="space-between">
        {links.map((item, index) => {
          return <LinkButton key={index} {...item} />;
        })}
      </Flex>
    </Flex>
  );
};
