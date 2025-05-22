'use client';

import { BrowserMultiFormatReader, IScannerControls } from '@zxing/browser';
import { Flex, Typography } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

import css from './bardcode-scanner.module.css';

type Props = {
  onResult: (text: string) => void;
};

export const BarcodeScanner: React.FC<Props> = ({ onResult }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    let controls: IScannerControls;

    if (videoRef.current) {
      codeReader
        .decodeFromVideoDevice(undefined, videoRef.current!, (result, err, ctrl) => {
          controls = ctrl;
          if (result) {
            onResult((result as any)?.getText());
            controls.stop();
          }
        })
        .catch((err) => {
          setError('Ошибка доступа к камере');
          console.error(err);
        });
    }

    return () => {
      if (controls) controls.stop();
    };
  }, []);

  // TODO: ПОПРАВИТЬ СТИЛИ И ВЫВОД ОШИБКИ В ПОП АП
  return (
    <Flex vertical className={css.barcodeContainer}>
      <Typography.Title level={4}>Отсканируйте штрихкод</Typography.Title>
      <video className={css.barcode} ref={videoRef} />
      {error && <Typography.Text>{error}</Typography.Text>}
    </Flex>
  );
};
