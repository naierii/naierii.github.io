import { queryClient } from '@graphql/graphql-client';
import { lazy, Suspense } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const Main = lazy(() => import('@components/layout/Main'));

export interface AppProps {
  product?: string;
}

function App({ product }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div>Loading...</div>}>{product && <Main product={product} />}</Suspense>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
