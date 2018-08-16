import { Resolver, Query, Mutation } from '@nestjs/graphql';
import { Context } from '@app/constants';
import { Contact } from '@app/gql/generated/prisma';
import { UserInputError } from 'apollo-server-core';
type Contacts = Contact[];

@Resolver('Contact')
export class ContactsResolver {
  @Query('contacts')
  async getContacts(_, { limit }, ctx: Context, info): Promise<Contacts> {
    if (limit > 50) throw new UserInputError('Limit Cannot be greater than 50', { limit });
    return await ctx.db.query.contacts(
      {
        first: limit,
      },
      info,
    );
  }

  @Query('contact')
  async getContactById(_, { id }, ctx: Context, info): Promise<Contact | null> {
    return await ctx.db.query.contact(
      {
        where: {
          id,
        },
      },
      info,
    );
  }

  @Mutation()
  async addContact(_, { name, phoneNumber, type }, ctx: Context, info): Promise<Contact> {
    return await ctx.db.mutation.createContact(
      {
        data: {
          name,
          phone: {
            create: {
              number: phoneNumber,
              type,
            },
          },
        },
      },
      info,
    );
  }

  @Mutation()
  async updateContact(_, { data, id }, ctx: Context, info): Promise<Contact | null> {
    return await ctx.db.mutation.updateContact({ data, where: { id } }, info);
  }

  @Mutation()
  async deleteContact(_, { id }, ctx: Context, info): Promise<Contact | null> {
    return await ctx.db.mutation.deleteContact({ where: { id } }, info);
  }
}
