import { QueryClient } from '@tanstack/react-query';
import { GraphQLClient } from 'graphql-request';
import { EnvVars } from './env';

export const endpoint = EnvVars.API_URL as string;
export const fetchParams = {
  headers: {
    Authorization: `Bearer ${EnvVars.API_TOKEN as string}`,
    'Content-Type': 'application/json',
  },
};

export const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    Authorization: `Bearer ${EnvVars.API_TOKEN as string}`,
  },
});

export const endpointShopify = EnvVars.STOREFRONT_URL as string;
export const fetchParamsShopify = {
  headers: {
    'X-Shopify-Storefront-Access-Token': EnvVars.STOREFRONT_TOKEN as string,
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
