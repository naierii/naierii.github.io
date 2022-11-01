#ifdef USE_UV
    uniform mat4 viewMatrixCamera;
    uniform mat4 projectionMatrixCamera;
    uniform mat4 modelMatrixCamera;
    uniform mat4 meshMatrix;
    uniform vec3 projPosition;

    varying vec3 vNormal2;
    varying vec4 vWorldPosition;
    varying vec4 vTexCoords;
#endif