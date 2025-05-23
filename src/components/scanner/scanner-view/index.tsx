import { Flex, Typography } from 'antd';
import React, { useState } from 'react';

import { ProductItem } from '@/components/product';
import { BarcodeScanner } from '@/components/shared';
import { fetchProduct } from '@/lib/fetchProduct';

export const ScannerView = () => {
  const [barcode, setBarcode] = useState<string | null>(null);
  const [product, setProduct] = useState<any>();
  const [error, setError] = useState<string | null>(null);

  const handleScan = async (code: string) => {
    setBarcode(code);
    setError(null);

    try {
      const productData = await fetchProduct(code);

      if (!productData) {
        setProduct(null);
        setError('Продукт не найден в базе Open Food Facts.');
      } else {
        setProduct(productData);
      }
    } catch (err) {
      setError('Ошибка при получении данных с сервера.');
      console.error(err);
    }
  };

  return (
    <Flex vertical style={{ width: '100%' }}>
      {!barcode && <BarcodeScanner onResult={handleScan} />}

      {barcode && (
        <Flex vertical gap={16}>
          <Typography.Title level={3} style={{ textAlign: 'center' }}>
            Продукт
          </Typography.Title>
          {product && <ProductItem product={product} />}
          {error && <Typography.Text>{error}</Typography.Text>}
        </Flex>
      )}
    </Flex>
  );
};
