import { Prisma } from "@app/gql/generated/prisma";

export interface Context {
  db: Prisma;
  request: any;
}
