import { ThreeElements, Vector3 } from '@react-three/fiber';
import { forwardRef } from 'react';
import { Mesh } from 'three';

export interface MouseHelperProps {
  position?: Vector3;
}

const MouseHelper = forwardRef<Mesh, MouseHelperProps>((props, ref) => {
  const MeshProps: ThreeElements['mesh'] = {
    visible: false,
    scale: 0.1,
  };

  const BoxProps: ThreeElements['boxGeometry'] = {
    args: [1, 1, 10],
  };

  return (
    <mesh ref={ref} {...MeshProps}>
      <boxGeometry {...BoxProps} />
      <meshNormalMaterial />
    </mesh>
  );
});

MouseHelper.displayName = 'MouseHelper';

export default MouseHelper;
