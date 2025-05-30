import { LeftOutlined } from '@ant-design/icons';
import { Button, Flex } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

import { BarcodeScanner } from '@/components/shared';
import { APP_ROUTES } from '@/const/routes';
import { getQueryString } from '@/lib/getQueryString';

export const ScannerView = () => {
  const { replace, back } = useRouter();
  const searchParams = useSearchParams();

  const handleScan = async (code: string) => {
    const query = getQueryString(searchParams);
    replace(APP_ROUTES.PRODUCT(code) + `?${query}`);
  };

  return (
    <Flex vertical style={{ width: '100%' }}>
      <Button
        type="primary"
        icon={<LeftOutlined />}
        shape="circle"
        size="small"
        onClick={back}
        style={{ position: 'absolute', left: '16px', top: '27px', zIndex: 2 }}
      />
      <BarcodeScanner onResult={handleScan} />
    </Flex>
  );
};
