import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:1337/graphql',
  documents: './src/graphql/boxxer/**/*.graphql',
  hooks: {
    afterAllFileWrite: 'prettier --write',
  },
  generates: {
    './src/graphql/generated/graphql.ts': {
      plugins: [
        {
          add: {
            content: 'import { endpoint, fetchParams } from "./../graphql-client";',
          },
        },
        'typescript',
        'typescript-operations',
        'typescript-react-query',
      ],
      config: {
        fetcher: {
          endpoint: 'endpoint',
          fetchParams: 'fetchParams',
        },
        pureMagicComment: true,
        exposeQueryKeys: true,
        dedupeFragments: true,
      },
    },
  },
};
export default config;
