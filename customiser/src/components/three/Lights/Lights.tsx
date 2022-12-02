import { useHelper } from '@react-three/drei';
import { useRef } from 'react';
import { SpotLightHelper, Vector3 } from 'three';

const config = {
  ambientLight: {
    color: 16777215,
    groundColor: 4473924,
    intensity: 1,
  },
  directionalLights: [
    {
      color: 16777215,
      intensity: 0.4,
      position: new Vector3(0, 6, -200),
      castShadow: false,
    },
    {
      color: 16759931,
      intensity: 0.22,
      position: new Vector3(-150, 0, 200),
      castShadow: false,
    },
    {
      color: 10213119,
      intensity: 0.35,
      position: new Vector3(100, 0, 200),
    },
  ],
};

const Lights = () => {
  // const light = useRef();
  // useHelper(light, SpotLightHelper, 'cyan');
  return (
    <group>
      <hemisphereLight {...config.ambientLight}></hemisphereLight>
      {config.directionalLights.map((directionalLight, index) => (
        <directionalLight key={index} {...directionalLight}></directionalLight>
      ))}
      {/* <ambientLight intensity={1} />
      <spotLight intensity={0.4} angle={5} position={[0, 5, 0]} decay={2} distance={6} castShadow />
      <spotLight intensity={0.4} angle={0.3} position={[0, -15, 20]} decay={2} castShadow />
      <spotLight
        // ref={light}
        intensity={0.4}
        angle={0.3}
        position={[0, -15, -20]}
        decay={2}
        castShadow
      /> */}
    </group>
  );
};

export default Lights;
