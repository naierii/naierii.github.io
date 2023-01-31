import Button from '@components/ui/Button';
import { useGetCustomProductByShopifyIdQuery } from '@graphql/generated/graphql';
import { useShopifyGetProductByIdQuery } from '@graphql/generated/graphql-shopify';
import { useCustomiserStore } from '@store/customiser';
import { lazy, Suspense, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { graphQLClient } from '@graphql/graphql-client';
import { useDesignStore } from '@store/design';

import styles from './Main.module.scss';

const Customiser = lazy(() => import('@components/layout/Customiser'));

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div className={styles.error} role='alert'>
      <h2>Something went wrong:</h2>
      <pre>{error.message}</pre>
      <Button onClick={resetErrorBoundary}>Try again</Button>
    </div>
  );
}

export interface MainProps {
  product: string;
}

const Main = ({ product }: MainProps) => {
  const { show, setShow } = useDesignStore((state) => state);
  const setCustomProduct = useCustomiserStore((state) => state.setCustomProduct);
  const reset = useCustomiserStore((state) => state.reset);

  const { data: customProduct } = useGetCustomProductByShopifyIdQuery(
    graphQLClient,
    { id: product },
    { select: (data) => data.customProductByShopifyId?.data },
  );

  const { data: shopifyProduct } = useShopifyGetProductByIdQuery({
    id: product,
  });

  useEffect(() => {
    async function rehydrate() {
      await useCustomiserStore.persist.rehydrate();
    }
    rehydrate();
    if (customProduct && shopifyProduct) {
      setCustomProduct(customProduct, shopifyProduct);
    }
  }, [customProduct, shopifyProduct]);

  return (
    <>
      {show ? (
        <Suspense fallback={<Button colour='red'>Loading...</Button>}>
          <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={() => {
              reset();
            }}
          >
            <Customiser />
          </ErrorBoundary>
        </Suspense>
      ) : (
        <Button colour='red' onClick={() => setShow(true)}>
          Customise
        </Button>
      )}
    </>
  );
};

export default Main;
