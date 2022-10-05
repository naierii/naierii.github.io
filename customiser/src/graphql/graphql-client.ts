import { GraphQLClient } from 'graphql-request';
import { QueryClient } from '@tanstack/react-query';

const endpoint = process.env.REACT_APP_API_URL as string;

const graphQLClient = new GraphQLClient(endpoint);

graphQLClient.setHeader('authorization', `Bearer ${process.env.REACT_APP_API_TOKEN}`)

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      staleTime: 60 * 1000,
    },
  },
});

export default graphQLClient;
