import { queryClient } from '@graphql/graphql-client';
import { lazy, Suspense } from 'react';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const Main = lazy(() => import('@components/layout/Main'));

export interface AppProps {
  product?: string;
}

function App({ product }: AppProps) {
  if (!product) {
    return null
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div>Loading...</div>}>
        <Main product={product} />
      </Suspense>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
