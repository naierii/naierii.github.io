import CustomiserNav from '@components/nav/CustomiserNav';
import CustomiserCanvas from '@components/three/CustomiserCanvas';
import Button from '@components/ui/Button';
import { useDesignStore } from '@store/design';
import cn from 'classnames';
import { useRef } from 'react';
import { Camera } from 'three';
import Header from '../Header';

import styles from './Customiser.module.scss';

export interface CustomiserProps {
  className?: string;
}

const Customiser = ({ className }: CustomiserProps) => {
  const cameraRef = useRef<Camera | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const setShow = useDesignStore((state) => state.setShow);

  const rootClassName = cn(styles.root, className);
  return (
    <div className={rootClassName}>
      <CustomiserNav className={styles.nav} />
      <Header className={styles.header} cameraRef={cameraRef} canvasRef={canvasRef} />
      <CustomiserCanvas className={styles.model} cameraRef={cameraRef} canvasRef={canvasRef} />
      <Button className={styles.close} onClick={() => setShow(false)}>
        Close
      </Button>
    </div>
  );
};

export default Customiser;
