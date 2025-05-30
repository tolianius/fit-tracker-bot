export const APP_ROUTES = {
  ANALYSIS: '/',
  PRODUCTS: '/products',
  PROFILE: '/profile',
  PRODUCT: (code: string) => `/products/${code}`,
  SCANNER: '/scanner',
  ADD_PRODUCT: '/products/add'
};
