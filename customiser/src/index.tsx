// eslint-disable-next-line camelcase
__webpack_public_path__ = window.assetsPath;

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.scss';

const container = document.getElementById('BoxxerCustomiser') as Element;
const product = container.getAttribute('data-product')?.toString();

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App product={product} />
  </React.StrictMode>,
);
