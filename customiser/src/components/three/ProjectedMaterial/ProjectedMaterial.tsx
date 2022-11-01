/* eslint-disable react/no-unknown-property */
import { MeshPhongMaterialProps, ThreeElements, useThree } from '@react-three/fiber';
import { forwardRef, useCallback, useEffect, useRef } from 'react';
import { CanvasTexture, IUniform, MeshPhongMaterial } from 'three';

import outputFragment from './shaders/output_fragment.glsl';
import uvParsFragment from './shaders/uv_pars_fragment.glsl';
import uvParsVertex from './shaders/uv_pars_vertex.glsl';
import uvVertex from './shaders/uv_vertex.glsl';

interface UniformProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [uniform: string]: IUniform<any>;
}

export interface ProjectedMaterialProps extends MeshPhongMaterialProps {
  freeze?: boolean;
  texture: CanvasTexture | null;
}

const ProjectedMaterial = forwardRef<MeshPhongMaterial, ProjectedMaterialProps>(
  ({ freeze, texture, ...props }: ProjectedMaterialProps, materialRef) => {
    const { camera, scene } = useThree();

    const meshGroup = scene.getObjectByName('meshGroup');

    // Uniforms variable
    const uniforms = useRef<UniformProps>();

    const getCameraMatrixWorldInverse = useCallback(() => {
      return freeze ? camera.matrixWorldInverse.clone() : camera.matrixWorldInverse;
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
        uniforms.current.isTextureProjected.value = freeze;
      }
      if (uniforms.current && freeze) {
        console.log('update camera position');
        uniforms.current.viewMatrixCamera.value = getCameraMatrixWorldInverse();
        uniforms.current.projPosition.value = getCameraPosition();
        uniforms.current.meshMatrix.value = getMeshMatrix();
        setTimeout(() => {
          if (uniforms.current) {
            uniforms.current.viewMatrixCamera.value = getCameraMatrixWorldInverse();
            uniforms.current.projPosition.value = getCameraPosition();
            uniforms.current.meshMatrix.value = getMeshMatrix();

            console.log(uniforms.current);
          }
        }, 100);
      }
    }, [camera, freeze, uniforms, meshGroup]);

    const materialProps: ThreeElements['meshPhongMaterial'] = {
      onBeforeCompile: (shader) => {
        if (uniforms.current) {
          shader.uniforms = uniforms.current;
        } else {
          camera.updateProjectionMatrix();
          camera.updateMatrixWorld();
          camera.updateWorldMatrix(true, true);

          const _uniforms = {
            ...shader.uniforms,
            projectedTexture: { value: texture },
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
            isTextureLoaded: { value: true },
            isTextureProjected: { value: false },
            widthScaled: { value: 1 },
            heightScaled: { value: 1 },
            frontFacesOnly: { value: true },
          };

          uniforms.current = _uniforms;
          shader.uniforms = _uniforms;
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
      needsUpdate: true,
      ...props,
    };

    return <meshPhongMaterial ref={materialRef} {...materialProps}></meshPhongMaterial>;
  },
);

ProjectedMaterial.displayName = 'ProjectedMaterial';

export default ProjectedMaterial;
