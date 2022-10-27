#ifdef USE_UV
    vNormal2 = mat3(meshMatrix) * normal;
    vWorldPosition =  meshMatrix * vec4(position, 1.0);
    vTexCoords = projectionMatrixCamera * viewMatrixCamera * vWorldPosition;

    vUv = mat2(uvTransform) * ((vTexCoords.xy / vTexCoords.w) * 0.5 + 0.5);

    // gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0) * mat4(uvTransform);

#endif