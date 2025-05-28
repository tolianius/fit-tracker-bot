'use client';

import { Flex, List, Typography } from 'antd';
import Image from 'next/image';

import { IProductInfo } from '@/model/product';

import css from './product-list-item.module.css';

interface IProps {
  item: IProductInfo;
  onProductClick: () => void;
}

export const ProductListItem = (props: IProps) => {
  const { item, onProductClick } = props;

  return (
    <List.Item onClick={onProductClick}>
      <Flex gap={16} align="center">
        <Image
          className={css.listItemImage}
          src={item?.image_front_small_url || ''}
          alt={item.product_name}
          height={50}
          width={50}
        />
        <Flex vertical>
          <Typography.Title level={5}>{item.product_name || 'Без названия'}</Typography.Title>
          <Typography.Text type="secondary">{item?.brands || 'Без бренда'}</Typography.Text>
          {Boolean(item?.product_quantity) && Boolean(item?.product_quantity_unit) && (
            <Typography.Text type="secondary">{`на ${item?.product_quantity} ${item?.product_quantity_unit} - ${item?.nutriments?.['energy-kcal_100g'] || 0} ккал`}</Typography.Text>
          )}
        </Flex>
      </Flex>
    </List.Item>
  );
};
