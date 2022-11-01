#if ( defined( USE_UV ) && ! defined( UVS_VERTEX_ONLY ) )

    uniform vec3 projPosition;
    uniform sampler2D projectedTexture;
    uniform bool isTextureLoaded;
    uniform bool isTextureProjected;
    uniform float widthScaled;
	uniform float heightScaled;

	vec2 vUv;

    float mapRange(float value, float min1, float max1, float min2, float max2) {
        return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
    }
    varying vec4 vTexCoords;
    varying vec4 vWorldPosition;
    varying vec3 vNormal2;
    uniform bool frontFacesOnly;

#endif