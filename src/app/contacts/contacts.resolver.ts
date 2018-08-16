import { Resolver, Query, Mutation } from '@nestjs/graphql';
import { Context } from '@app/constants';
import { Contact } from '@app/gql/generated/prisma';
type Contacts = Contact[];

@Resolver('Contact')
export class ContactsResolver {
  @Query('contacts')
  async getContacts(_, { limit }, ctx: Context, info): Promise<Contacts> {
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
  async addContact(_, { data }, ctx: Context, info): Promise<Contact> {
    return await ctx.db.mutation.createContact(
      {
        data,
      },
      info,
    );
  }

  @Mutation()
  async updateContact(_, { data, where }, ctx: Context, info): Promise<Contact | null> {
    return await ctx.db.mutation.updateContact({ data, where }, info);
  }

  @Mutation()
  async deleteContact(_, { where }, ctx: Context, info): Promise<Contact | null> {
    return await ctx.db.mutation.deleteContact({ where }, info);
  }
}
