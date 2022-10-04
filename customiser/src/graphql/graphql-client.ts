import { GraphQLClient } from 'graphql-request';
import { QueryClient } from 'react-query';

const endpoint = process.env.REACT_APP_API_URL as string;

const graphQLClient = new GraphQLClient(endpoint);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      staleTime: 60 * 1000,
    },
  },
});

export default graphQLClient;
