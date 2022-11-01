import Lights from '@components/three/Lights';
import Scene from '@components/three/Scene';
import { OrbitControls, useContextBridge } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import cn from 'classnames';
import { useRef } from 'react';

import { GraphicsContext } from '@context/GraphicsContext';
import { useCustomiserStore } from '@store/customiser';
import { Camera } from 'three';
import styles from './CustomiserCanvas.module.scss';

export interface CustomiserCanvasProps {
  className?: string;
}

const CustomiserCanvas = ({ className }: CustomiserCanvasProps): JSX.Element => {
  const setCanvasSize = useCustomiserStore((state) => state.setCanvasSize);
  const rootClassName = cn(styles.root, className);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cameraRef = useRef<Camera | null>(null);

  const ContextBridge = useContextBridge(GraphicsContext);

  // const saveImage = useCallback(() => {
  //   const camera = cameraRef.current;
  //   if (!camera) {
  //     return;
  //   }
  //   camera.position.set(-6.37546092557343, 2.1970893240496195e-15, 35.3102451262528);
  //   setTimeout(() => {
  //     const downloadLink = document.createElement('a');
  //     downloadLink.download = 'download.png';
  //     const dataURL = canvasRef?.current?.toDataURL('image/png');
  //     if (dataURL) {
  //       const url = dataURL.replace(/^data:image\/png/, 'data:application/octet-stream');
  //       downloadLink.href = url;
  //       downloadLink.click();
  //     }
  //   }, 0);
  // }, []);

  return (
    <div className={rootClassName}>
      <Canvas
        linear
        flat
        camera={{
          position: [-6.37546092557343, 2.1970893240496195e-15, 25.31024512625285],
          fov: 20,
        }}
        gl={{ preserveDrawingBuffer: true }}
        ref={canvasRef}
        onCreated={(state) => {
          setCanvasSize(state.size.width, state.size.height);
          cameraRef.current = state.camera;
        }}
      >
        <Lights />

        <ContextBridge>
          <Scene />
        </ContextBridge>

        <OrbitControls enableZoom={false} />
      </Canvas>
      {/* <button className={styles.save} onClick={saveImage}>
        Save Image
      </button> */}
    </div>
  );
};

export default CustomiserCanvas;
