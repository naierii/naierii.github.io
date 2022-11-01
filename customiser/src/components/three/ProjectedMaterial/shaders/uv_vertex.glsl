#ifdef USE_UV
    vNormal2 = mat3(meshMatrix) * normal;
    vWorldPosition =  meshMatrix * vec4(position, 1.0);
    vTexCoords = projectionMatrixCamera * viewMatrixCamera * meshMatrix * vec4(position, 1.0);
#endif