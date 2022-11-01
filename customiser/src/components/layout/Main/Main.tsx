import CustomiserNav from '@components/nav/CustomiserNav';
import CustomiserCanvas from '@components/three/CustomiserCanvas';
import GraphicsCanvas from '@components/three/GraphicsCanvas';
import Button from '@components/ui/Button';
import { useGetCustomProductByShopifyIdQuery } from '@graphql/generated/graphql';
import { useShopifyGetProductByIdQuery } from '@graphql/generated/graphql-shopify';
import { useCustomiserStore } from '@store/customiser';
import cn from 'classnames';
import { useEffect, useState } from 'react';
import { useCurrentGraphics } from '@context/CurrentGraphicsContext';
import Header from '../Header';

import styles from './Main.module.scss';
import GraphicsWrapper from '@components/three/GraphicsWrapper';

export interface MainProps {
  className?: string;
  product: string;
}

const Main = ({ className, product }: MainProps) => {
  const [show, setShow] = useState(false);
  const { graphic } = useCurrentGraphics();
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
          <Header className={styles.header} />
          <CustomiserCanvas className={styles.model} />
          {editFlag?.flag && <GraphicsWrapper graphic={editFlag} className={styles.model} />}

          {/* {graphic && graphic.imageurl && (
            <GraphicsCanvas graphic={graphic} className={styles.model} />
          )} */}
        </div>
      ) : (
        <Button onClick={() => setShow(true)}>Customise</Button>
      )}
    </>
  );
};

export default Main;
