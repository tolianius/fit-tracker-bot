import { Flex, Typography } from 'antd';
import Image from 'next/image';
import React, { useState } from 'react';

import { BarcodeScanner } from '@/components/shared';
import { fetchProduct } from '@/lib/fetchProduct';

import css from './scanner-view.module.css';

export const ScannerView = () => {
  const [barcode, setBarcode] = useState<string | null>(null);
  const [product, setProduct] = useState<any>(null);
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
    <Flex vertical align="center">
      <Typography.Title>Наведите камеру на штрихкод</Typography.Title>
      {!barcode && <BarcodeScanner onResult={handleScan} />}

      {barcode && (
        <Flex vertical gap={8}>
          <Typography.Text>
            <strong>Штрихкод:</strong> {barcode}
          </Typography.Text>
          {error && <Typography.Text>{error}</Typography.Text>}
          {product && (
            <Flex vertical gap={8}>
              <Typography.Text>
                <strong>Название:</strong> {product.product_name || 'Не указано'}
              </Typography.Text>
              <Typography.Text>
                <strong>Бренд:</strong> {product.brands}
              </Typography.Text>
              <Typography.Text>
                <strong>БЖУ:</strong> {product?.nutriments?.proteins} {product?.nutriments?.proteins_unit} |{' '}
                {product?.nutriments?.fat} {product?.nutriments?.fat_unit} | {product?.nutriments?.carbohydrates}{' '}
                {product?.nutriments?.carbohydrates_unit}
              </Typography.Text>
              {product.image_front_small_url && (
                <Image
                  src={product.image_front_small_url}
                  width={200}
                  height={200}
                  alt="product"
                  className={css.scannerView}
                />
              )}
            </Flex>
          )}
        </Flex>
      )}
    </Flex>
  );
};
