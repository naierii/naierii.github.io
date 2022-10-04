import CustomiserNav from '@components/nav/CustomiserNav';
import CustomiserCanvas from '@components/three/CustomiserCanvas';
import {
  CustomProductEntity,
  useGetCustomProductByShopifyIdQuery,
} from '@graphql/generated/graphql';
import graphQLClient from '@graphql/graphql-client';
import { useCustomiserStore } from '@store/customiser';
import cn from 'classnames';
import { useEffect } from 'react';

import styles from './Main.module.scss';

export interface MainProps {
  className?: string;
}

const Main = ({ className }: MainProps) => {
  // const id = 'gid://shopify/Product/7737134055648';
  const id = 'gid://shopify/Product/7745243447520';
  useCustomiserStore.persist.setOptions({
    name: `customiser-${id}`,
  });

  const setCustomProduct = useCustomiserStore((state) => state.setCustomProduct);
  const rootClassName = cn(styles.root, className);

  const { data } = useGetCustomProductByShopifyIdQuery(
    graphQLClient,
    { id },
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
    <div className={rootClassName}>
      <CustomiserCanvas className={styles.customiser} />
      <CustomiserNav className={styles.nav} data={data?.attributes} />
    </div>
  );
};

export default Main;
