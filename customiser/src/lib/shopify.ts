/* eslint-disable @typescript-eslint/no-explicit-any */
export const addToCart = async (data: any) => {
  return fetch(window.Shopify.routes.root + 'cart/add.js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};
