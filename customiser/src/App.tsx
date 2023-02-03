import Main from '@components/layout/Main';
import { queryClient } from '@graphql/graphql-client';
import { useCustomiserStore } from '@store/customiser';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export interface AppProps {
  product?: string;
}

function App({ product }: AppProps) {
  useCustomiserStore.persist.setOptions({
    name: `customiser-${product}`,
    version: 2,
  });

  return (
    <QueryClientProvider client={queryClient}>
      {product && <Main product={product} />}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
