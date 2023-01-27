import Button from '@components/ui/Button';
import { useGetCustomProductByShopifyIdQuery } from '@graphql/generated/graphql';
import { useShopifyGetProductByIdQuery } from '@graphql/generated/graphql-shopify';
import { useCustomiserStore } from '@store/customiser';
import { lazy, Suspense, useEffect } from 'react';

import { graphQLClient } from '@graphql/graphql-client';
import { useDesignStore } from '@store/design';

const Customiser = lazy(() => import('@components/layout/Customiser'));

export interface MainProps {
  product: string;
}

const Main = ({ product }: MainProps) => {
  const { show, setShow } = useDesignStore((state) => state);
  const setCustomProduct = useCustomiserStore((state) => state.setCustomProduct);

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
          <Customiser />
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
