import { Prisma } from '@app/gql/generated/prisma';

export interface Context {
  db: Prisma;
  req: Express.Request;
  res: Express.Response;
}
