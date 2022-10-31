import { ThreeElements, useFrame, useThree } from '@react-three/fiber';
import { ForwardedRef, forwardRef, useEffect, useRef } from 'react';
import { ShaderMaterial } from 'three';
import './ProjectedMaterial';

type ShaderMaterialProps = ThreeElements['shaderMaterial'];

export interface ProjectedProps extends ShaderMaterialProps {
  freeze?: boolean;
}

const useForwardRef = <T,>(ref: ForwardedRef<T>, initialValue: any = null) => {
  const targetRef = useRef<T>(initialValue);

  useEffect(() => {
    if (!ref) return;

    if (typeof ref === 'function') {
      ref(targetRef.current);
    } else {
      ref.current = targetRef.current;
    }
  }, [ref]);

  return targetRef;
};

const Projected = forwardRef<ShaderMaterial, ProjectedProps>(
  ({ freeze, ...rest }: ProjectedProps, materialRef) => {
    const { camera, scene } = useThree();
    const shaderMat = useForwardRef<ShaderMaterial>(materialRef);

    // useFrame(() => {
    //   camera.lookAt(0, 0, 0);
    //   camera.updateProjectionMatrix();
    //   camera.updateMatrixWorld();
    //   camera.updateWorldMatrix(true, true);
    //   shaderMat.current.viewMatrixCamera = camera.matrixWorldInverse.clone();
    //   shaderMat.current.projectionMatrixCamera = camera.projectionMatrix.clone();
    //   shaderMat.current.modelMatrixCamera = camera.matrixWorld.clone();
    //   shaderMat.current.projPosition = camera.position.clone();
    // });

    return <projectedMaterial ref={shaderMat} {...rest} />;
  },
);

Projected.displayName = 'Projected';

export default Projected;
