import { GraphQLClient } from 'graphql-request';
import { QueryClient } from '@tanstack/react-query';

const endpoint = process.env.REACT_APP_API_URL as string;

const graphQLClient = new GraphQLClient(endpoint);

graphQLClient.setHeader('authorization', `Bearer ${process.env.REACT_APP_API_TOKEN}`);

const endpointShopify = process.env.REACT_APP_STOREFRONT_URL as string;

export const graphQLClientShopify = new GraphQLClient(endpointShopify, {
  headers: {
    'X-Shopify-Storefront-Access-Token': process.env.REACT_APP_STOREFRONT_TOKEN as string,
  },
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      staleTime: 60 * 1000 * 5,
    },
  },
});

export default graphQLClient;
