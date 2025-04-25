import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:3000/graphql',
  overwrite: true,
  generates: {
    './libs/client/portal/graphql/space/src/generated.ts': {
      documents: 'libs/client/portal/graphql/space/src/gql/**/*.gql',
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-apollo-angular',
      ],
    },
    './libs/client/portal/graphql/teacher-students/src/generated.ts': {
      documents: 'libs/client/portal/graphql/teacher-students/src/gql/**/*.gql',
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-apollo-angular',
      ],
    },
    './libs/client/portal/graphql/course/src/generated.ts': {
      documents: 'libs/client/portal/graphql/course/src/gql/**/*.gql',
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-apollo-angular',
      ],
    },
  },
};
export default config;
