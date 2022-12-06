import { useGLTF, useHelper } from '@react-three/drei';
import { ThreeElements, ThreeEvent } from '@react-three/fiber';
import { useCustomiserStore } from '@store/customiser';
import { useCallback, useRef } from 'react';
import { Camera, CameraHelper, Euler, Mesh, Vector3 } from 'three';
import { GLTF } from 'three-stdlib';
import DecalGraphic from '../DecalGraphic';
import MouseHelper from '../MouseHelper';

const position = new Vector3();
const orientation = new Euler();

export interface TestModelProps {
  className?: string;
}

type GLTFResult = GLTF & {
  nodes: { [name: string]: THREE.Mesh };
  materials: { [name: string]: THREE.Material };
};

const TestModel = ({ className }: TestModelProps) => {
  const meshRef = useRef<Mesh>(null);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const cameraRef = useRef<Camera>(null!);
  useHelper(cameraRef, CameraHelper);
  const mouseHelperRef = useRef<Mesh>(null);
  const { nodes } = useGLTF('/LeePerrySmith.glb') as unknown as GLTFResult;
  const decalPosition = useCustomiserStore((state) => state.decalPosition);
  const decalRotation = useCustomiserStore((state) => state.decalRotation);
  const decalFreeze = useCustomiserStore((state) => state.decalFreeze);
  const setDecalPosition = useCustomiserStore((state) => state.setDecalPosition);
  const setDecalRotation = useCustomiserStore((state) => state.setDecalRotation);
  const setDecalFreeze = useCustomiserStore((state) => state.setDecalFreeze);

  const setPosition = useCallback(
    (event: ThreeEvent<globalThis.PointerEvent>) => {
      const p = event.point;
      const n = event?.face?.normal.clone();
      if (mouseHelperRef.current && n && meshRef.current) {
        n.transformDirection(meshRef.current.matrixWorld);
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

  const graphicProps: ThreeElements['mesh'] = {
    geometry: nodes.LeePerrySmith.geometry,
    dispose: null,
  };

  const graphicMaterialProps: ThreeElements['meshStandardMaterial'] = {
    transparent: true,
  };

  return (
    <>
      <mesh
        {...graphicProps}
        ref={meshRef}
        onPointerMove={onPointerMove}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerup}
      >
        <meshStandardMaterial {...graphicMaterialProps} />
        {/* {decalPosition && decalRotation && decalFreeze && (
          <DecalGraphic position={decalPosition} rotation={decalRotation} scale={1} />
        )} */}
      </mesh>
      <MouseHelper ref={mouseHelperRef} />
    </>
  );
};

export default TestModel;
