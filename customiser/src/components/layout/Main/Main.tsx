import CustomiserNav from '@components/nav/CustomiserNav';
import CustomiserCanvas from '@components/three/CustomiserCanvas';
import Button from '@components/ui/Button';
import { useGetCustomProductByShopifyIdQuery } from '@graphql/generated/graphql';
import { useShopifyGetProductByIdQuery } from '@graphql/generated/graphql-shopify';
import { useCustomiserStore } from '@store/customiser';
import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';
import Header from '../Header';

import { useGraphics } from '@context/GraphicsContext';
import { graphQLClient } from '@graphql/graphql-client';
import { useHydration } from '@hooks';
import { Camera } from 'three';
import styles from './Main.module.scss';

export interface MainProps {
  className?: string;
  product: string;
}

const Main = ({ className, product }: MainProps) => {
  const cameraRef = useRef<Camera | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [show, setShow] = useState(false);
  const { graphics, loadGraphic } = useGraphics();
  const setCustomProduct = useCustomiserStore((state) => state.setCustomProduct);
  const flags = useCustomiserStore((state) => state.flags);
  const isHydrated = useHydration();
  const rootClassName = cn(styles.root, className);

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
        <div className={rootClassName}>
          <CustomiserNav className={styles.nav} />
          <Header className={styles.header} cameraRef={cameraRef} canvasRef={canvasRef} />
          <CustomiserCanvas className={styles.model} cameraRef={cameraRef} canvasRef={canvasRef} />
          <Button className={styles.close} onClick={() => setShow(false)}>
            Close
          </Button>
        </div>
      ) : (
        <Button colour='red' onClick={() => setShow(true)}>
          Customise
        </Button>
      )}
    </>
  );
};

export default Main;
