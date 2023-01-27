import CustomiserNav from '@components/nav/CustomiserNav';
import Button from '@components/ui/Button';
import { useDesignStore } from '@store/design';
import cn from 'classnames';
import { lazy, Suspense } from 'react';
import Header from '../Header';

const CustomiserCanvas = lazy(() => import('@components/three/CustomiserCanvas'));

import styles from './Customiser.module.scss';

export interface CustomiserProps {
  className?: string;
}

const Customiser = ({ className }: CustomiserProps) => {
  const setShow = useDesignStore((state) => state.setShow);

  const rootClassName = cn(styles.root, className);
  return (
    <div className={rootClassName}>
      <CustomiserNav className={styles.nav} />
      <Header className={styles.header} />
      <Suspense>
        <CustomiserCanvas className={styles.model} />
      </Suspense>
      <Button className={styles.close} onClick={() => setShow(false)}>
        Close
      </Button>
    </div>
  );
};

export default Customiser;
