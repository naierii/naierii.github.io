import { QueryClient } from '@tanstack/react-query';

export const endpoint = process.env.REACT_APP_API_URL as string;
export const fetchParams = {
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN as string}`,
    'Content-Type': 'application/json',
  },
};

export const endpointShopify = process.env.REACT_APP_STOREFRONT_URL as string;
export const fetchParamsShopify = {
  headers: {
    'X-Shopify-Storefront-Access-Token': process.env.REACT_APP_STOREFRONT_TOKEN as string,
    'Content-Type': 'application/json',
  },
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      staleTime: 60 * 1000 * 5,
    },
  },
});
