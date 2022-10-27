#ifdef USE_UV
    uniform mat4 viewMatrixCamera;
    uniform mat4 projectionMatrixCamera;
    uniform mat4 modelMatrixCamera;
    uniform mat4 meshMatrix;
    uniform vec3 projPosition;

    varying vec3 vNormal2;
    varying vec4 vWorldPosition;
    vec4 vTexCoords;

	#ifdef UVS_VERTEX_ONLY
		vec2 vUv;
	#else
		varying vec2 vUv;
	#endif
	uniform mat3 uvTransform;
#endif