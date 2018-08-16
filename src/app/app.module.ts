import { Module, Logger } from '@nestjs/common';
import { ApolloServer } from 'apollo-server-express';
import { GraphQLModule, GraphQLFactory } from '@nestjs/graphql';
import { Env } from '@app/utils';
import { ContactsModule } from '@app/contacts/contacts.module';
import { Prisma } from '@app/gql/generated/prisma';
import { GlobalReslover } from '@app/global.resolver';

@Module({
  imports: [GraphQLModule, ContactsModule],
  providers: [GlobalReslover],
})
export class ApplicationModule {
  constructor(private readonly graphQLFactory: GraphQLFactory) {}
  async configureGraphQL(app: any, httpServer?) {
    const typeDefs = require('./gql/schema.graphql');

    const schema = this.graphQLFactory.createSchema({ typeDefs, logger: new Logger('Schema') });
    const db = new Prisma({
      debug: true,
      endpoint: Env('PRISMA_ENDPOINT', 'http://localhost:4466'),
      secret: Env('PRISMA_MANAGEMENT_API_SECRET', ''),
    });
    const server = new ApolloServer({
      schema,
      tracing: true,
      playground: false,
      introspection: true,
      context: ({ req, res }) => ({
        req,
        res,
        db,
      }),
    });

    server.applyMiddleware({ app });
    if (httpServer !== undefined) {
      server.installSubscriptionHandlers(httpServer);
    }
  }
}
