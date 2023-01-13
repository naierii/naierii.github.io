import { ThreeElements, Vector3 } from '@react-three/fiber';
import { forwardRef } from 'react';
import { Mesh } from 'three';

export interface MouseHelperProps {
  position?: Vector3;
}

const MouseHelper = forwardRef<Mesh, MouseHelperProps>((props, ref) => {
  const BoxProps: ThreeElements['boxGeometry'] = {
    args: [1, 1, 200],
  };

  return (
    <mesh ref={ref} visible={false} scale={0.1}>
      <boxGeometry {...BoxProps} />
      <meshNormalMaterial />
    </mesh>
  );
});

MouseHelper.displayName = 'MouseHelper';

export default MouseHelper;
