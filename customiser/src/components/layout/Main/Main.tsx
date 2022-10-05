import CustomiserNav from '@components/nav/CustomiserNav';
import CustomiserCanvas from '@components/three/CustomiserCanvas';
import Button from '@components/ui/Button';
import {
  CustomProductEntity,
  useGetCustomProductByShopifyIdQuery,
} from '@graphql/generated/graphql';
import graphQLClient from '@graphql/graphql-client';
import { useCustomiserStore } from '@store/customiser';
import cn from 'classnames';
import { useEffect, useState } from 'react';

import styles from './Main.module.scss';

export interface MainProps {
  className?: string;
  product: string;
}

const Main = ({ className, product }: MainProps) => {
  // const id = 'gid://shopify/Product/7737134055648';
  // const id = 'gid://shopify/Product/7745243447520';
  const [show, setShow] = useState(false);

  useCustomiserStore.persist.setOptions({
    name: `customiser-${product}`,
  });

  const setCustomProduct = useCustomiserStore((state) => state.setCustomProduct);
  const rootClassName = cn(styles.root, className);

  const { data } = useGetCustomProductByShopifyIdQuery(
    graphQLClient,
    { id: product },
    { select: (data) => data.customProductByShopifyId?.data as CustomProductEntity },
  );

  useEffect(() => {
    async function rehydrate() {
      await useCustomiserStore.persist.rehydrate();
    }
    rehydrate();
    if (data) {
      setCustomProduct(data);
    }
  }, [data]);

  return (
    <>
      {show ? (
        <div className={rootClassName}>
          <CustomiserNav className={styles.nav} data={data?.attributes} />
          <CustomiserCanvas className={styles.model} />
          <div className='header'></div>
        </div>
      ) : (
        <Button onClick={() => setShow(true)}>Customise</Button>
      )}
    </>
  );
};

export default Main;
