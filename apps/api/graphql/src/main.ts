import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloGateway, IntrospectAndCompose } from '@apollo/gateway';

async function bootstrap() {
  const gateway = new ApolloGateway({
    supergraphSdl: new IntrospectAndCompose({
      subgraphs: [
        { name: 'accounts', url: 'http://localhost:3002/graphql' },
        { name: 'spaces', url: 'http://localhost:3003/graphql' },
      ],
    }),
  });

  const server = new ApolloServer({ gateway });

  const port = +process.env['PORT'] || 3000;
  const host = process.env['HOST'] || 'localhost';

  const { url } = await startStandaloneServer(server, {
    listen: {
      port,
      host,
      path: '/'
    },
  });
  console.log(`🚀  Server ready at ${url}`);
}

bootstrap().catch((err) => console.error(err));
