import { queryClient } from '@graphql/graphql-client';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { LazyMotion } from 'framer-motion';
import { lazy, Suspense } from 'react';
import CurrentGraphicsContextProvider from '@context/CurrentGraphicsContext';

const Main = lazy(() => import('@components/layout/Main'));

const loadFeatures = () => import('./lib/framerFeatures').then((res) => res.default);

export interface AppProps {
  product?: string;
}

function App({ product }: AppProps) {
  // useCustomiserStore.persist.setOptions({
  //   name: `customiser-${product}`,
  //   version: 1,
  // });

  return (
    <QueryClientProvider client={queryClient}>
      <LazyMotion features={loadFeatures} strict>
        <CurrentGraphicsContextProvider>
          <Suspense fallback={<div>Loading...</div>}>
            {product && <Main product={product} />}
          </Suspense>
        </CurrentGraphicsContextProvider>
      </LazyMotion>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
