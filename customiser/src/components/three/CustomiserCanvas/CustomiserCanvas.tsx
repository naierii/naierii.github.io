import Lights from '@components/three/Lights';
import Scene from '@components/three/Scene';
import { OrbitControls, useContextBridge } from '@react-three/drei';
import { Canvas, ThreeEvent } from '@react-three/fiber';
import cn from 'classnames';
import { MutableRefObject, RefObject, useCallback, useRef } from 'react';

import { GraphicsContext } from '@context/GraphicsContext';
import { useCustomiserStore } from '@store/customiser';
import { Camera, Euler, Group, Mesh, Vector3 } from 'three';
import MouseHelper from '../MouseHelper';
import styles from './CustomiserCanvas.module.scss';

export interface CustomiserCanvasProps {
  className?: string;
  cameraRef: MutableRefObject<Camera | null>;
  canvasRef: RefObject<HTMLCanvasElement>;
}

const position = new Vector3();
const orientation = new Euler();

const CustomiserCanvas = ({
  className,
  cameraRef,
  canvasRef,
}: CustomiserCanvasProps): JSX.Element => {
  const groupRef = useRef<Group>(null);
  const setCanvasSize = useCustomiserStore((state) => state.setCanvasSize);
  const setDecalPosition = useCustomiserStore((state) => state.setDecalPosition);
  const setDecalRotation = useCustomiserStore((state) => state.setDecalRotation);
  const setDecalFreeze = useCustomiserStore((state) => state.setDecalFreeze);
  const rootClassName = cn(styles.root, className);
  const mouseHelperRef = useRef<Mesh>(null);
  const ContextBridge = useContextBridge(GraphicsContext);

  const setPosition = useCallback(
    (event: ThreeEvent<globalThis.PointerEvent>) => {
      const p = event.point;
      const n = event?.face?.normal.clone();

      // console.log(event?.face?.normal);

      if (mouseHelperRef.current && n && groupRef.current) {
        n.transformDirection(groupRef.current.matrixWorld);
        n.multiplyScalar(10);
        n.add(p);
        mouseHelperRef.current.position.copy(p);
        mouseHelperRef.current.lookAt(n);
      }
    },
    [mouseHelperRef],
  );

  const onPointerDown = (event: ThreeEvent<globalThis.PointerEvent>) => {
    setDecalFreeze(false);
    setPosition(event);
    if (mouseHelperRef.current) {
      position.copy(event.point);
      position.setY(event.point.x + 8.8);
      orientation.copy(mouseHelperRef.current.rotation);
      setDecalPosition(position);
      setDecalRotation(orientation);
    }
  };

  const onPointerup = () => {
    setDecalFreeze(true);
  };

  const onPointerMove = (event: ThreeEvent<globalThis.PointerEvent>) => {
    setPosition(event);
  };

  return (
    <div className={rootClassName}>
      <Canvas
        linear
        flat
        camera={{
          position: [0, 2.1970893240496195e-15, 25.31024512625285],
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
          <Scene
            onPointerMove={onPointerMove}
            onPointerDown={onPointerDown}
            onPointerup={onPointerup}
            ref={groupRef}
          />
        </ContextBridge>
        <MouseHelper ref={mouseHelperRef} />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
};

export default CustomiserCanvas;
