/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
let mix = require('laravel-mix');
const path = require('path');

const ASSET_DIR = '../shopify-theme/assets';

mix.setPublicPath(ASSET_DIR);

mix.webpackConfig({
  resolve: {
    alias: {
      '@graphql': path.resolve(__dirname, 'src/graphql/'),
      '@components': path.resolve(__dirname, 'src/components/'),
      '@hooks': path.resolve(__dirname, 'src/hooks/'),
      '@layouts': path.resolve(__dirname, 'src/layouts/'),
      '@models': path.resolve(__dirname, 'src/models/'),
      '@pages': path.resolve(__dirname, 'src/pages/'),
      '@store': path.resolve(__dirname, 'src/store/'),
      '@styles': path.resolve(__dirname, 'src/styles/'),
      '@context': path.resolve(__dirname, 'src/context/'),
      '@services': path.resolve(__dirname, 'src/services/'),
      '@lib': path.resolve(__dirname, 'src/lib/'),
    },
  },
});

mix.extend('addWebpackLoaders', (webpackConfig, loaderRules) => {
  loaderRules.forEach((loaderRule) => {
    webpackConfig.module.rules.push(loaderRule);
  });
});

mix.addWebpackLoaders([
  {
    test: /\.(glsl|vs|fs|vert|frag)$/,
    exclude: /node_modules/,
    use: ['raw-loader', 'glslify-loader'],
  },
]);

mix.ts('src/index.tsx', 'customiser.js');
