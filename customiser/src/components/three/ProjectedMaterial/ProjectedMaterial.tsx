/* eslint-disable react/no-unknown-property */
import { ThreeElements, useThree } from '@react-three/fiber';
import { forwardRef, useCallback, useEffect, useRef } from 'react';
import { IUniform, MeshPhongMaterial } from 'three';

import outputFragment from './shaders/output_fragment.glsl';
import uvParsFragment from './shaders/uv_pars_fragment.glsl';
import uvParsVertex from './shaders/uv_pars_vertex.glsl';
import uvVertex from './shaders/uv_vertex.glsl';

interface UniformProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [uniform: string]: IUniform<any>;
}

type MeshPhongMaterialProps = ThreeElements['meshPhongMaterial'];

export interface ProjectedMaterialProps extends MeshPhongMaterialProps {
  freeze?: boolean;
}

const ProjectedMaterial = forwardRef<MeshPhongMaterial, ProjectedMaterialProps>(
  ({ freeze, ...props }: ProjectedMaterialProps, materialRef) => {
    const { camera, scene } = useThree();

    const meshGroup = scene.getObjectByName('meshGroup');

    // Uniforms variable
    const uniforms = useRef<UniformProps>();

    const getCameraMatrixWorldInverse = useCallback(() => {
      if (freeze) {
        return camera.matrixWorldInverse.clone();
      }

      return camera.matrixWorldInverse;
    }, [freeze, camera]);

    const getCameraPosition = useCallback(() => {
      return freeze ? camera.position.clone() : camera.position;
    }, [freeze, camera]);

    const getMeshMatrix = useCallback(() => {
      if (meshGroup) {
        meshGroup.updateMatrixWorld();

        return freeze ? meshGroup.matrixWorld.clone() : meshGroup.matrixWorld;
      }
    }, [freeze, meshGroup]);

    useEffect(() => {
      if (uniforms.current) {
        uniforms.current.viewMatrixCamera.value = getCameraMatrixWorldInverse();
        uniforms.current.projPosition.value = getCameraPosition();
        uniforms.current.meshMatrix.value = getMeshMatrix();
      }
    }, [uniforms]);

    const materialProps: ThreeElements['meshPhongMaterial'] = {
      onBeforeCompile: (shader) => {
        console.log('onBeforeCompile');
        if (uniforms.current) {
          shader.uniforms = uniforms.current;
        } else {
          camera.updateProjectionMatrix();
          camera.updateMatrixWorld();
          camera.updateWorldMatrix(true, true);

          const _uniforms = {
            ...shader.uniforms,
            viewMatrixCamera: {
              type: 'm4',
              value: getCameraMatrixWorldInverse(),
            },
            projectionMatrixCamera: {
              type: 'm4',
              value: camera.projectionMatrix,
            },
            modelMatrixCamera: { type: 'mat4', value: camera.matrixWorld },
            projPosition: { type: 'v3', value: getCameraPosition() },
            meshMatrix: {
              type: 'mat4',
              value: getMeshMatrix(),
            },
          };

          uniforms.current = _uniforms;
          shader.uniforms = _uniforms;

          // TEMP
          // materialRef.current.userData.uniforms = _uniforms;
        }

        shader.vertexShader = shader.vertexShader.replace(
          '#include <uv_pars_vertex>',
          uvParsVertex,
        );

        shader.vertexShader = shader.vertexShader.replace('#include <uv_vertex>', uvVertex);

        shader.fragmentShader = shader.fragmentShader.replace(
          '#include <uv_pars_fragment>',
          uvParsFragment,
        );

        shader.fragmentShader = shader.fragmentShader.replace(
          '#include <output_fragment>',
          outputFragment,
        );
      },
      ...props,
      needsUpdate: true,
    };

    return <meshPhongMaterial ref={materialRef} {...materialProps}></meshPhongMaterial>;
  },
);

ProjectedMaterial.displayName = 'ProjectedMaterial';

export default ProjectedMaterial;
