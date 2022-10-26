import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: {
    'https://boxxerworld-dev-2022.myshopify.com/api/2022-10/graphql.json': {
      headers: {
        'X-Shopify-Storefront-Access-Token': '76bf6996309ef6cce6b5f6c5e6dca0fe',
      },
    },
  },
  documents: './src/graphql/shopify/**/*.graphql',
  hooks: {
    afterAllFileWrite: 'prettier --write',
  },
  generates: {
    './src/graphql/generated/graphql-shopify.ts': {
      plugins: [
        {
          add: {
            content: 'import { endpointShopify, fetchParamsShopify } from "./../graphql-client";',
          },
        },
        'typescript',
        'typescript-operations',
        'typescript-react-query',
      ],
      config: {
        fetcher: {
          endpoint: 'endpointShopify',
          fetchParams: 'fetchParamsShopify',
        },
        typesPrefix: 'Shopify',
        pureMagicComment: true,
        exposeQueryKeys: true,
        dedupeFragments: true,
      },
    },
  },
};
export default config;
