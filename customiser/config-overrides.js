const { alias, configPaths } = require('react-app-rewire-alias');

/**
 * Override CRA default webpack to add custom paths.
 *
 * @param {*} config
 */
module.exports = function override(config) {
  alias(configPaths('./tsconfig.paths.json'))(config);
  return config;
};
