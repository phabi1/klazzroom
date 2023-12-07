/** @type {import('graphql-config').IGraphQLConfig } */

module.exports = {
  projects: {
    ['client-portal-stores-space-teacher-students']: {
      schema: 'https://api-klazzroom.docker.localhost/graphql',
      documents:
        'libs/client/portal/stores/space/teacher/students/src/**/*.gql',
      extensions: {
        codegen: {
          generates: {
            'libs/client/portal/stores/space/teacher/students/src/graphql/generated.ts':
              {
                plugins: [
                  'typescript',
                  'typescript-operations',
                  'typescript-apollo-angular',
                ],
                config: {
                  addExplicitOverride: true
                }
              },
          },
        },
      },
    },
    ['client-portal-stores-space-teacher-age-structure']: {
      schema: 'https://api-klazzroom.docker.localhost/graphql',
      documents:
        'libs/client/portal/stores/space/teacher/age-structure/src/**/*.gql',
      extensions: {
        codegen: {
          generates: {
            'libs/client/portal/stores/space/teacher/age-structure/src/graphql/generated.ts':
              {
                plugins: [
                  'typescript',
                  'typescript-operations',
                  'typescript-apollo-angular',
                ],
                config: {
                  addExplicitOverride: true
                }
              },
          },
        },
      },
    },
  },
};
