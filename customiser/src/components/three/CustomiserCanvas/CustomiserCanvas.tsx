import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import cn from 'classnames';
import { Suspense, useCallback, useRef } from 'react';
import Lights from '@components/three/Lights';
import Scene from '@components/three/Scene';
import Loader from '@components/three/Loader';

import styles from './CustomiserCanvas.module.scss';
import { Camera } from 'three';

export interface CustomiserCanvasProps {
  className?: string;
}

const CustomiserCanvas = ({ className }: CustomiserCanvasProps): JSX.Element => {
  const rootClassName = cn(styles.root, className);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cameraRef = useRef<Camera | null>(null);

  const saveImage = useCallback(() => {
    const camera = cameraRef.current;
    if (!camera) {
      return;
    }
    camera.position.set(-6.37546092557343, 2.1970893240496195e-15, 35.3102451262528);
    setTimeout(() => {
      const downloadLink = document.createElement('a');
      downloadLink.download = 'download.png';
      const dataURL = canvasRef?.current?.toDataURL('image/png');
      if (dataURL) {
        const url = dataURL.replace(/^data:image\/png/, 'data:application/octet-stream');
        downloadLink.href = url;
        downloadLink.click();
      }
    }, 0);
  }, []);

  return (
    <div className={rootClassName}>
      <Canvas
        linear
        flat
        camera={{
          position: [-6.37546092557343, 2.1970893240496195e-15, 35.31024512625285],
          fov: 20,
        }}
        gl={{ preserveDrawingBuffer: true }}
        ref={canvasRef}
        onCreated={({ camera }) => (cameraRef.current = camera)}
      >
        <Lights />
        <Suspense fallback={<Loader />}>
          <Scene />
        </Suspense>
        <OrbitControls enableZoom={true} />
      </Canvas>
      <button className={styles.save} onClick={saveImage}>
        Save Image
      </button>
    </div>
  );
};

export default CustomiserCanvas;
