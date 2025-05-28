import { ReadonlyURLSearchParams } from 'next/navigation';

export const getQueryString = (searchParams: ReadonlyURLSearchParams) => {
  const params = new URLSearchParams(searchParams);
  return params.toString();
};
