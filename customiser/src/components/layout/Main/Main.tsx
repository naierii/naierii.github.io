import Button from '@components/ui/Button';
import { useGetCustomProductByShopifyIdQuery } from '@graphql/generated/graphql';
import { useShopifyGetProductByIdQuery } from '@graphql/generated/graphql-shopify';
import { useCustomiserStore } from '@store/customiser';
import { lazy, Suspense, useEffect, useState } from 'react';

import { useGraphics } from '@context/GraphicsContext';
import { graphQLClient } from '@graphql/graphql-client';
import { useHydration } from '@hooks';
import { useDesignStore } from '@store/design';

const Customiser = lazy(() => import('@components/layout/Customiser'));

export interface MainProps {
  product: string;
}

const Main = ({ product }: MainProps) => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const { show, setShow } = useDesignStore((state) => state);
  const { graphics, loadGraphic } = useGraphics();
  const setCustomProduct = useCustomiserStore((state) => state.setCustomProduct);
  const flags = useCustomiserStore((state) => state.flags);
  const isHydrated = useHydration();

  const { data: customProduct } = useGetCustomProductByShopifyIdQuery(
    graphQLClient,
    { id: product },
    { select: (data) => data.customProductByShopifyId?.data },
  );

  const { data: shopifyProduct } = useShopifyGetProductByIdQuery({
    id: product,
  });

  useEffect(() => {
    if (isHydrated && flags.length !== graphics?.length && !dataLoaded) {
      for (const flag of flags) {
        if (flag.materialJSON) {
          loadGraphic(flag);
        }
      }
      setDataLoaded(true);
    }
  }, [isHydrated, flags, graphics]);

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
        <Suspense fallback={null}>
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
