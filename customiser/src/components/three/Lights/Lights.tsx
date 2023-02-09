import { SpotLight, useHelper } from '@react-three/drei';
import { useRef } from 'react';
import { SpotLightHelper, Vector3, SpotLight as SpotLightRef } from 'three';
const config = {
  ambientLight: {
    // color: 16777215,
    // groundColor: 4473924,
    intensity: 0.1,
  },
  directionalLights: [
    {
      color: 16777215,
      intensity: 0.3,
      position: new Vector3(0, 6, -200),
      castShadow: true,
    },
    {
      color: 16759931,
      intensity: 0.2,
      position: new Vector3(-150, 0, 200),
      castShadow: true,
    },
    {
      color: 10213119,
      intensity: 0.2,
      position: new Vector3(100, 0, 200),
    },
  ],
};

const Lights = () => {
  const light = useRef<SpotLightRef>(null);
  // useHelper(light.current, SpotLightHelper, 'cyan');
  return (
    <group>
      <hemisphereLight {...config.ambientLight}></hemisphereLight>
      <pointLight position={[-800, 0, -1000]} intensity={0.5} decay={12} power={7} castShadow />
      <pointLight position={[-800, 0, 1000]} intensity={0.5} decay={12} power={7} castShadow />
      <pointLight position={[800, 0, 1000]} intensity={0.5} decay={120} power={7} castShadow />
      <pointLight position={[800, 0, -1000]} intensity={0.5} decay={12} power={7} castShadow />
    </group>
  );
};

export default Lights;
