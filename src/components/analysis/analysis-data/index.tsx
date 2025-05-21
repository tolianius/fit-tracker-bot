'use client';

import { Col, Flex, Row } from 'antd';

import { AnalysisDaily } from '@/components/analysis/analysis-daily';
import { AnalysisProgress } from '@/components/analysis/analysis-progress';

import css from './analysis-data.module.css';

export const AnalysisData = () => {
  return (
    <Flex gap={16} vertical className={css.dataContainer}>
      <AnalysisDaily value={1400} maxValue={2013} />
      <Row gutter={[16, 16]}>
        <Col xs={8}>
          <AnalysisProgress title={'Белки'} value={52.3} maxValue={99.7} color={'#8EDF81'} />
        </Col>
        <Col xs={8}>
          <AnalysisProgress title={'Жиры'} value={45.1} maxValue={29.5} color={'#D7A251'} />
        </Col>
        <Col xs={8}>
          <AnalysisProgress title={'Углеводы'} value={99.7} maxValue={166.2} color={'#A3A0CA'} />
        </Col>
      </Row>
    </Flex>
  );
};
