import CustomiserNav from '@components/nav/CustomiserNav';
import CustomiserCanvas from '@components/three/CustomiserCanvas';
import GraphicsCanvas from '@components/three/GraphicsCanvas';
import Button from '@components/ui/Button';
import { useGetCustomProductByShopifyIdQuery } from '@graphql/generated/graphql';
import {
  useShopifyGetCartByIdQuery,
  useShopifyGetProductByIdQuery,
} from '@graphql/generated/graphql-shopify';
import { useCustomiserStore } from '@store/customiser';
import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';
import Header from '../Header';

import { useGraphics } from '@context/GraphicsContext';
import styles from './Main.module.scss';
import { Camera } from 'three';

export interface MainProps {
  className?: string;
  product: string;
}

const Main = ({ className, product }: MainProps) => {
  const cameraRef = useRef<Camera | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [show, setShow] = useState(false);
  const { graphics } = useGraphics();
  const flags = useCustomiserStore((state) => state.flags);
  const editFlag = flags.find((f) => f.editMode);
  const setCustomProduct = useCustomiserStore((state) => state.setCustomProduct);
  const rootClassName = cn(styles.root, className);

  const { data: customProduct } = useGetCustomProductByShopifyIdQuery(
    { id: product },
    { select: (data) => data.customProductByShopifyId?.data },
  );

  const { data: shopifyProduct } = useShopifyGetProductByIdQuery({
    id: product,
  });

  useEffect(() => {
    // async function rehydrate() {
    //   await useCustomiserStore.persist.rehydrate();
    // }
    // rehydrate();
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
          {graphics?.map((graphic) => (
            <GraphicsCanvas key={graphic.key} graphic={graphic} className={styles.model} />
          ))}
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
