import { Resolver, Query, ResolveProperty } from '@nestjs/graphql';
import { Context } from '@app/constants';
import { Node } from '@app/gql/generated/prisma';

@Resolver('Node')
export class GlobalReslover {
  @Query()
  async node(_, { id }, ctx: Context, info) {
    return await ctx.db.query.node({ id }, info);
  }

  @ResolveProperty('__resolveType')
  async resloveType(obj): Promise<Node> {
    return await obj.__resolveType;
  }
}
