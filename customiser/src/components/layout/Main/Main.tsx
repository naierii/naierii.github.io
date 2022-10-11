import CustomiserNav from '@components/nav/CustomiserNav';
import CustomiserCanvas from '@components/three/CustomiserCanvas';
import Button from '@components/ui/Button';
import {
  CustomProductEntity,
  useGetCustomProductByShopifyIdQuery,
} from '@graphql/generated/graphql';
import { useShopifyGetProductByIdQuery } from '@graphql/generated/graphql-shopify';
import graphQLClient, { graphQLClientShopify } from '@graphql/graphql-client';
import { useCustomiserStore } from '@store/customiser';
import cn from 'classnames';
import { useEffect, useState } from 'react';
import Header from '../Header';

import styles from './Main.module.scss';

export interface MainProps {
  className?: string;
  product: string;
}

const Main = ({ className, product }: MainProps) => {
  const [show, setShow] = useState(false);

  const setCustomProduct = useCustomiserStore((state) => state.setCustomProduct);
  const rootClassName = cn(styles.root, className);

  const { data: customProduct } = useGetCustomProductByShopifyIdQuery(
    graphQLClient,
    { id: product },
    { select: (data) => data.customProductByShopifyId?.data as CustomProductEntity },
  );

  const { data: shopifyProduct } = useShopifyGetProductByIdQuery(graphQLClientShopify, {
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
        <div className={rootClassName}>
          <CustomiserNav className={styles.nav} />
          <Header className={styles.header} />
          <CustomiserCanvas className={styles.model} />
        </div>
      ) : (
        <Button onClick={() => setShow(true)}>Customise</Button>
      )}
    </>
  );
};

export default Main;
