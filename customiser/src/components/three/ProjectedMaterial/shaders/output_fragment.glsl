float w = max(vTexCoords.w, 0.0);
vec2 vUv = (vTexCoords.xy / w) * 0.5 + 0.5;

vUv.x = mapRange(vUv.x, 0.0, 1.0, 0.5 - widthScaled / 2.0, 0.5 + widthScaled / 2.0);
vUv.y = mapRange(vUv.y, 0.0, 1.0, 0.5 - heightScaled / 2.0, 0.5 + heightScaled / 2.0);

vec4 outColor = vec4( outgoingLight, diffuseColor.a );
vec3 color = vec3(1, 0, 0);

bool isInTexture = (max(vUv.x, vUv.y) <= 1.0 && min(vUv.x, vUv.y) >= 0.0);

// this makes sure we don't render the texture also on the back of the object
#ifdef ORTHOGRAPHIC
    vec3 projectorDirection = projDirection;
#else
    vec3 projectorDirection = normalize(projPosition - vWorldPosition.xyz);
#endif
float dotProduct = dot(vNormal2, projectorDirection);
bool isFacingProjector = frontFacesOnly ? dotProduct > 0.0000001 : true;

if (isFacingProjector && isInTexture && isTextureLoaded && isTextureProjected) {
    vec4 textureColor = texture2D(projectedTexture, vUv);

    outColor = textureColor * textureColor.a + outColor * (1.0 - textureColor.a);

    gl_FragColor = outColor;
}

