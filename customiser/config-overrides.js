const { alias, configPaths } = require('react-app-rewire-alias');

/**
 * Override CRA default webpack to add custom paths.
 *
 * @param {*} config
 */
module.exports = function override(config) {
  alias(configPaths('./tsconfig.paths.json'))(config);

  // config.module.rules[1].oneOf.splice(2, 0, {
  //   test: /\.(glsl|vs|fs|vert|frag)$/,
  //   exclude: /node_modules/,
  //   use: ['raw-loader', 'glslify-loader'],
  // });

  return config;
};
