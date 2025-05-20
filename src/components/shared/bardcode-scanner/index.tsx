'use client';

import React, { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader, IScannerControls } from '@zxing/browser';

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
            onResult(result.getText());
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
    <div>
      <video ref={videoRef} style={{ width: '100%', borderRadius: '8px' }} />
      {error && <p>{error}</p>}
    </div>
  );
};
