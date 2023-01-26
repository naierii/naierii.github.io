import { Vector3 } from 'three';

const config = {
  ambientLight: {
    color: 16777215,
    groundColor: 4473924,
    intensity: 1.05,
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
  // const light = useRef();
  // useHelper(light, SpotLightHelper, 'cyan');
  return (
    <group>
      <hemisphereLight {...config.ambientLight}></hemisphereLight>
      {config.directionalLights.map((directionalLight, index) => (
        <directionalLight key={index} {...directionalLight}></directionalLight>
      ))}
    </group>
  );
};

export default Lights;
