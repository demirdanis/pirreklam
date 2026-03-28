import type { CodegenConfig } from '@graphql-codegen/cli';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.DIRECTUS_GRAPHQL_URL) {
  throw new Error('DIRECTUS_GRAPHQL_URL not set');
}

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      [process.env.DIRECTUS_GRAPHQL_URL]: {
        headers: {
          authorization: `Bearer ${process.env.DIRECTUS_STATIC_TOKEN}`,
        },
      },
    },
  ],
  documents: 'src/app/**/*.graphql',
  generates: {
    'src/generated/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-graphql-request',
      ],
      config: {
        rawRequest: false,
        skipTypename: false,
        withHooks: false,
      },
    },
  },
};

export default config;
