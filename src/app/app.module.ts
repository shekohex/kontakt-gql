import { Module } from '@nestjs/common';
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
  configureGraphQL(app: any, httpServer?) {
    const typeDefs = require('./gql/schema.graphql');
    const schema = this.graphQLFactory.createSchema({ typeDefs });
    const server = new ApolloServer({
      schema,
      tracing: true,
      debug: false,
      playground: false,
      context: req => ({
        ...req,
        db: new Prisma({
          debug: false,
          endpoint: Env('PRISMA_ENDPOINT', 'http://localhost:4466'),
          secret: Env('PRISMA_MANAGEMENT_API_SECRET', ''),
        }),
      }),
    });
    server.applyMiddleware({ app });
    if (httpServer !== undefined) {
      server.installSubscriptionHandlers(httpServer);
    }
  }
}
