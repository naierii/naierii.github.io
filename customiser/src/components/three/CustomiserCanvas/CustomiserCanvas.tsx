import Lights from '@components/three/Lights';
import Scene from '@components/three/Scene';
import { OrbitControls } from '@react-three/drei';
import { Canvas, ThreeEvent } from '@react-three/fiber';
import cn from 'classnames';
import { MutableRefObject, RefObject, useCallback, useRef } from 'react';

import { useCustomiserStore } from '@store/customiser';
import { Camera, Euler, Group, Mesh, Vector3 } from 'three';
import MouseHelper from '../MouseHelper';
import styles from './CustomiserCanvas.module.scss';

export interface CustomiserCanvasProps {
  className?: string;
  cameraRef: MutableRefObject<Camera | null>;
  canvasRef: RefObject<HTMLCanvasElement>;
}

const CustomiserCanvas = ({
  className,
  cameraRef,
  canvasRef,
}: CustomiserCanvasProps): JSX.Element => {
  const positionRef = useRef<Vector3>(new Vector3());
  const orientationRef = useRef<Euler>(new Euler());
  const groupRef = useRef<Group>(null);
  const editFlag = useCustomiserStore((state) => state.flags.find((f) => f.edit));
  const editText = useCustomiserStore((state) => state.texts.find((f) => f.edit));
  const updateFlag = useCustomiserStore((state) => state.updateFlag);
  const updateText = useCustomiserStore((state) => state.updateText);
  const setCanvasSize = useCustomiserStore((state) => state.setCanvasSize);
  const rootClassName = cn(styles.root, className);
  const mouseHelperRef = useRef<Mesh>(null);

  const setPosition = useCallback(
    (event: ThreeEvent<globalThis.PointerEvent>) => {
      const p = event.point;
      const n = event?.face?.normal.clone();
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
    if (editFlag?.key) {
      updateFlag(editFlag.key, { decalFreeze: false });
      setPosition(event);
      if (mouseHelperRef.current && positionRef.current && orientationRef.current) {
        positionRef.current.copy(event.point);
        orientationRef.current.copy(mouseHelperRef.current.rotation);
        updateFlag(editFlag.key, {
          decalPosition: positionRef.current.clone().toArray(),
          decalOrientation: orientationRef.current.clone().toArray(),
        });
      }
    }

    if (editText?.key) {
      updateText(editText.key, { decalFreeze: false });
      setPosition(event);
      if (mouseHelperRef.current && positionRef.current && orientationRef.current) {
        positionRef.current.copy(event.point);
        orientationRef.current.copy(mouseHelperRef.current.rotation);
        updateText(editText.key, {
          decalPosition: positionRef.current.clone().toArray(),
          decalOrientation: orientationRef.current.clone().toArray(),
        });
      }
    }
  };

  const onPointerup = () => {
    if (editFlag?.key) {
      updateFlag(editFlag.key, { decalFreeze: true });
    }

    if (editText?.key) {
      updateText(editText.key, { decalFreeze: true });
    }
  };

  return (
    <div className={rootClassName}>
      <Canvas
        linear
        flat
        camera={{
          position: [0, 2.1970893240496195e-15, 25.31024512625285],
          fov: 45,
        }}
        gl={{ preserveDrawingBuffer: true }}
        ref={canvasRef}
        onCreated={(state) => {
          setCanvasSize(state.size.width, state.size.height);
          cameraRef.current = state.camera;
        }}
      >
        <Lights />
        <Scene onPointerDown={onPointerDown} onPointerup={onPointerup} ref={groupRef} />
        <MouseHelper ref={mouseHelperRef} />
        <OrbitControls
          enableZoom={true}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.9}
        />
      </Canvas>
    </div>
  );
};

export default CustomiserCanvas;
