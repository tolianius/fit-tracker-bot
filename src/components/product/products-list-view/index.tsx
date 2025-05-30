'use client';

import { ScanOutlined } from '@ant-design/icons';
import { Button, Flex, Input, List, Skeleton } from 'antd';
import debounce from 'lodash/debounce';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { searchProductByName } from '@/api';
import { APP_ROUTES } from '@/const/routes';
import { getQueryString } from '@/lib/getQueryString';
import { IProductInfo } from '@/model/product';

import css from './products-list-view.module.css';
import { ProductListItem } from '../product-list-item';

export const ProductsListView = () => {
  const { push } = useRouter();
  const [state, setState] = useState({
    query: '',
    products: [] as IProductInfo[],
    page: 1,
    hasMore: true,
    loading: false
  });
  const searchParams = useSearchParams();

  const fetchData = async (search: string, pageNum = 1) => {
    if (!search.trim()) return;
    setState((prev) => ({ ...prev, loading: true }));
    try {
      const { products: newProducts, total } = await searchProductByName(search, pageNum, 10);
      setState((prev) => ({
        ...prev,
        products:
          pageNum === 1 ? (newProducts as IProductInfo[]) : ([...prev.products, ...newProducts] as IProductInfo[]),
        hasMore: pageNum * 10 < total,
        loading: false,
        page: pageNum
      }));
    } catch (e) {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  const debouncedSearch = useCallback(
    debounce((val: string) => {
      fetchData(val, 1);
    }, 500),
    []
  );

  useEffect(() => {
    if (state.query && debouncedSearch && !state.loading) debouncedSearch(state.query);
  }, [debouncedSearch, state.query]);

  const handleScroll = (e: any) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom && state.hasMore && !state.loading) {
      fetchData(state.query, state.page + 1);
    }
  };

  const onProductClick = (code: string) => {
    const query = getQueryString(searchParams);
    push(APP_ROUTES.PRODUCT(code) + `?${query}`);
  };

  const onScanClick = () => {
    const query = getQueryString(searchParams);
    push(APP_ROUTES.SCANNER + `?${query}`);
  };

  const onAddProductClick = () => {
    const query = getQueryString(searchParams);
    push(APP_ROUTES.ADD_PRODUCT + `?${query}`);
  };

  return (
    <Flex vertical className={css.searchBlockContainer} onScroll={handleScroll}>
      <Flex gap={16} vertical>
        <Flex gap={8}>
          <Input
            placeholder="Введите название продукта"
            value={state.query}
            onChange={(e) => setState((prev) => ({ ...prev, query: e.target.value }))}
          />
          <Button
            type="primary"
            icon={<ScanOutlined style={{ fontSize: '16px' }} />}
            shape="circle"
            size="middle"
            onClick={onScanClick}
          />
        </Flex>
        <Button type="primary" onClick={onAddProductClick}>
          Добавить свой продукт
        </Button>
      </Flex>

      {state.loading && state.page === 1 ? (
        <Skeleton active paragraph={{ rows: 4 }} />
      ) : (
        <List
          dataSource={state.products}
          renderItem={(item: IProductInfo) => {
            return <ProductListItem key={item._id} onProductClick={() => onProductClick(item._id)} item={item} />;
          }}
        />
      )}

      {state.loading && state.page > 1 && <Skeleton active paragraph={{ rows: 2 }} />}
    </Flex>
  );
};
