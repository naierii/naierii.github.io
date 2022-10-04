/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
let mix = require('laravel-mix');
const path = require('path');

const ASSET_DIR = 'shopify-build';

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
    },
  },
});

mix.ts('src/index.tsx', '').react();
