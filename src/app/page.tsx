'use client';

import React, { useState } from 'react';
import {BarcodeScanner} from "@/components/shared";
import {fetchProduct} from "@/lib/fetchProduct";

export default function HomePage() {
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
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Сканер продуктов</h1>

      {!barcode && <BarcodeScanner onResult={handleScan} />}

      {barcode && (
        <div className="mt-4">
          <p>📦 Штрихкод: <strong>{barcode}</strong></p>

          {error && <p className="text-red-500 mt-2">{error}</p>}

          {product && (
            <div className="mt-2">
              <p><strong>Название:</strong> {product.product_name || 'Не указано'}</p>
              <p><strong>Бренд:</strong> {product.brands}</p>
              {product.image_front_small_url && (
                <img
                  src={product.image_front_small_url}
                  alt="product"
                  className="mt-2 rounded w-32"
                />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
