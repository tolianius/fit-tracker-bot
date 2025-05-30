import { fakeDataList } from '@/const/fakedata';

export const searchProductByName = async (name: string, page = 1, pageSize = 20) => {
  /*const response = await axios.get('https://world.openfoodfacts.org/cgi/search.pl', {
    params: {
      search_terms: name,
      search_simple: 1,
      action: 'process',
      json: 1,
      page,
      page_size: pageSize
    }
  });*/

  /*return {
    products: response.data.products,
    total: response.data.count,
    page: response.data.page,
    pageSize
  };*/
  return {
    products: fakeDataList.products,
    total: fakeDataList.count,
    page: fakeDataList.page,
    pageSize
  };
};
