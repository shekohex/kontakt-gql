import { GraphQLResolveInfo, GraphQLSchema } from 'graphql';
import { IResolvers } from 'graphql-tools/dist/Interfaces';
import { Options } from 'graphql-binding';
import { makePrismaBindingClass, BasePrismaOptions } from 'prisma-binding';

export interface Query {
  contacts: <T = Contact[]>(
    args: {
      where?: ContactWhereInput;
      orderBy?: ContactOrderByInput;
      skip?: Int;
      after?: String;
      before?: String;
      first?: Int;
      last?: Int;
    },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>;
  phoneNumbers: <T = PhoneNumber[]>(
    args: {
      where?: PhoneNumberWhereInput;
      orderBy?: PhoneNumberOrderByInput;
      skip?: Int;
      after?: String;
      before?: String;
      first?: Int;
      last?: Int;
    },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>;
  contact: <T = Contact | null>(
    args: { where: ContactWhereUniqueInput },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>;
  phoneNumber: <T = PhoneNumber | null>(
    args: { where: PhoneNumberWhereUniqueInput },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>;
  contactsConnection: <T = ContactConnection>(
    args: {
      where?: ContactWhereInput;
      orderBy?: ContactOrderByInput;
      skip?: Int;
      after?: String;
      before?: String;
      first?: Int;
      last?: Int;
    },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>;
  phoneNumbersConnection: <T = PhoneNumberConnection>(
    args: {
      where?: PhoneNumberWhereInput;
      orderBy?: PhoneNumberOrderByInput;
      skip?: Int;
      after?: String;
      before?: String;
      first?: Int;
      last?: Int;
    },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>;
  node: <T = Node | null>(
    args: { id: ID_Output },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>;
}

export interface Mutation {
  createContact: <T = Contact>(
    args: { data: ContactCreateInput },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>;
  createPhoneNumber: <T = PhoneNumber>(
    args: { data: PhoneNumberCreateInput },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>;
  updateContact: <T = Contact | null>(
    args: { data: ContactUpdateInput; where: ContactWhereUniqueInput },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>;
  updatePhoneNumber: <T = PhoneNumber | null>(
    args: { data: PhoneNumberUpdateInput; where: PhoneNumberWhereUniqueInput },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>;
  deleteContact: <T = Contact | null>(
    args: { where: ContactWhereUniqueInput },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>;
  deletePhoneNumber: <T = PhoneNumber | null>(
    args: { where: PhoneNumberWhereUniqueInput },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>;
  upsertContact: <T = Contact>(
    args: {
      where: ContactWhereUniqueInput;
      create: ContactCreateInput;
      update: ContactUpdateInput;
    },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>;
  upsertPhoneNumber: <T = PhoneNumber>(
    args: {
      where: PhoneNumberWhereUniqueInput;
      create: PhoneNumberCreateInput;
      update: PhoneNumberUpdateInput;
    },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>;
  updateManyContacts: <T = BatchPayload>(
    args: { data: ContactUpdateInput; where?: ContactWhereInput },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>;
  updateManyPhoneNumbers: <T = BatchPayload>(
    args: { data: PhoneNumberUpdateInput; where?: PhoneNumberWhereInput },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>;
  deleteManyContacts: <T = BatchPayload>(
    args: { where?: ContactWhereInput },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>;
  deleteManyPhoneNumbers: <T = BatchPayload>(
    args: { where?: PhoneNumberWhereInput },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>;
}

export interface Subscription {
  contact: <T = ContactSubscriptionPayload | null>(
    args: { where?: ContactSubscriptionWhereInput },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<AsyncIterator<T>>;
  phoneNumber: <T = PhoneNumberSubscriptionPayload | null>(
    args: { where?: PhoneNumberSubscriptionWhereInput },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<AsyncIterator<T>>;
}

export interface Exists {
  Contact: (where?: ContactWhereInput) => Promise<boolean>;
  PhoneNumber: (where?: PhoneNumberWhereInput) => Promise<boolean>;
}

export interface Prisma {
  query: Query;
  mutation: Mutation;
  subscription: Subscription;
  exists: Exists;
  request: <T = any>(query: string, variables?: { [key: string]: any }) => Promise<T>;
  delegate(
    operation: 'query' | 'mutation',
    fieldName: string,
    args: {
      [key: string]: any;
    },
    infoOrQuery?: GraphQLResolveInfo | string,
    options?: Options,
  ): Promise<any>;
  delegateSubscription(
    fieldName: string,
    args?: {
      [key: string]: any;
    },
    infoOrQuery?: GraphQLResolveInfo | string,
    options?: Options,
  ): Promise<AsyncIterator<any>>;
  getAbstractResolvers(filterSchema?: GraphQLSchema | string): IResolvers;
}

export interface BindingConstructor<T> {
  new (options: BasePrismaOptions): T;
}
/**
 * Type Defs
 */

const typeDefs = `type AggregateContact {
  count: Int!
}

type AggregatePhoneNumber {
  count: Int!
}

type BatchPayload {
  """The number of nodes that have been affected by the Batch operation."""
  count: Long!
}

type Contact implements Node {
  id: ID!
  name: String!
  phone(where: PhoneNumberWhereInput): PhoneNumber!
}

"""A connection to a list of items."""
type ContactConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [ContactEdge]!
  aggregate: AggregateContact!
}

input ContactCreateInput {
  name: String!
  phone: PhoneNumberCreateOneInput!
}

"""An edge in a connection."""
type ContactEdge {
  """The item at the end of the edge."""
  node: Contact!

  """A cursor for use in pagination."""
  cursor: String!
}

enum ContactOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type ContactPreviousValues {
  id: ID!
  name: String!
}

type ContactSubscriptionPayload {
  mutation: MutationType!
  node: Contact
  updatedFields: [String!]
  previousValues: ContactPreviousValues
}

input ContactSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [ContactSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [ContactSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [ContactSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: ContactWhereInput
}

input ContactUpdateInput {
  name: String
  phone: PhoneNumberUpdateOneInput
}

input ContactWhereInput {
  """Logical AND on all given filters."""
  AND: [ContactWhereInput!]

  """Logical OR on all given filters."""
  OR: [ContactWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [ContactWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  name: String

  """All values that are not equal to given value."""
  name_not: String

  """All values that are contained in given list."""
  name_in: [String!]

  """All values that are not contained in given list."""
  name_not_in: [String!]

  """All values less than the given value."""
  name_lt: String

  """All values less than or equal the given value."""
  name_lte: String

  """All values greater than the given value."""
  name_gt: String

  """All values greater than or equal the given value."""
  name_gte: String

  """All values containing the given string."""
  name_contains: String

  """All values not containing the given string."""
  name_not_contains: String

  """All values starting with the given string."""
  name_starts_with: String

  """All values not starting with the given string."""
  name_not_starts_with: String

  """All values ending with the given string."""
  name_ends_with: String

  """All values not ending with the given string."""
  name_not_ends_with: String
  phone: PhoneNumberWhereInput
}

input ContactWhereUniqueInput {
  id: ID
}

"""
The \`Long\` scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
"""
scalar Long

type Mutation {
  createContact(data: ContactCreateInput!): Contact!
  createPhoneNumber(data: PhoneNumberCreateInput!): PhoneNumber!
  updateContact(data: ContactUpdateInput!, where: ContactWhereUniqueInput!): Contact
  updatePhoneNumber(data: PhoneNumberUpdateInput!, where: PhoneNumberWhereUniqueInput!): PhoneNumber
  deleteContact(where: ContactWhereUniqueInput!): Contact
  deletePhoneNumber(where: PhoneNumberWhereUniqueInput!): PhoneNumber
  upsertContact(where: ContactWhereUniqueInput!, create: ContactCreateInput!, update: ContactUpdateInput!): Contact!
  upsertPhoneNumber(where: PhoneNumberWhereUniqueInput!, create: PhoneNumberCreateInput!, update: PhoneNumberUpdateInput!): PhoneNumber!
  updateManyContacts(data: ContactUpdateInput!, where: ContactWhereInput): BatchPayload!
  updateManyPhoneNumbers(data: PhoneNumberUpdateInput!, where: PhoneNumberWhereInput): BatchPayload!
  deleteManyContacts(where: ContactWhereInput): BatchPayload!
  deleteManyPhoneNumbers(where: PhoneNumberWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

"""An object with an ID"""
interface Node {
  """The id of the object."""
  id: ID!
}

"""Information about pagination in a connection."""
type PageInfo {
  """When paginating forwards, are there more items?"""
  hasNextPage: Boolean!

  """When paginating backwards, are there more items?"""
  hasPreviousPage: Boolean!

  """When paginating backwards, the cursor to continue."""
  startCursor: String

  """When paginating forwards, the cursor to continue."""
  endCursor: String
}

type PhoneNumber implements Node {
  id: ID!
  number: String!
  type: PhoneType
}

"""A connection to a list of items."""
type PhoneNumberConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [PhoneNumberEdge]!
  aggregate: AggregatePhoneNumber!
}

input PhoneNumberCreateInput {
  number: String!
  type: PhoneType
}

input PhoneNumberCreateOneInput {
  create: PhoneNumberCreateInput
  connect: PhoneNumberWhereUniqueInput
}

"""An edge in a connection."""
type PhoneNumberEdge {
  """The item at the end of the edge."""
  node: PhoneNumber!

  """A cursor for use in pagination."""
  cursor: String!
}

enum PhoneNumberOrderByInput {
  id_ASC
  id_DESC
  number_ASC
  number_DESC
  type_ASC
  type_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type PhoneNumberPreviousValues {
  id: ID!
  number: String!
  type: PhoneType
}

type PhoneNumberSubscriptionPayload {
  mutation: MutationType!
  node: PhoneNumber
  updatedFields: [String!]
  previousValues: PhoneNumberPreviousValues
}

input PhoneNumberSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [PhoneNumberSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [PhoneNumberSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [PhoneNumberSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: PhoneNumberWhereInput
}

input PhoneNumberUpdateDataInput {
  number: String
  type: PhoneType
}

input PhoneNumberUpdateInput {
  number: String
  type: PhoneType
}

input PhoneNumberUpdateOneInput {
  create: PhoneNumberCreateInput
  connect: PhoneNumberWhereUniqueInput
  delete: Boolean
  update: PhoneNumberUpdateDataInput
  upsert: PhoneNumberUpsertNestedInput
}

input PhoneNumberUpsertNestedInput {
  update: PhoneNumberUpdateDataInput!
  create: PhoneNumberCreateInput!
}

input PhoneNumberWhereInput {
  """Logical AND on all given filters."""
  AND: [PhoneNumberWhereInput!]

  """Logical OR on all given filters."""
  OR: [PhoneNumberWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [PhoneNumberWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  number: String

  """All values that are not equal to given value."""
  number_not: String

  """All values that are contained in given list."""
  number_in: [String!]

  """All values that are not contained in given list."""
  number_not_in: [String!]

  """All values less than the given value."""
  number_lt: String

  """All values less than or equal the given value."""
  number_lte: String

  """All values greater than the given value."""
  number_gt: String

  """All values greater than or equal the given value."""
  number_gte: String

  """All values containing the given string."""
  number_contains: String

  """All values not containing the given string."""
  number_not_contains: String

  """All values starting with the given string."""
  number_starts_with: String

  """All values not starting with the given string."""
  number_not_starts_with: String

  """All values ending with the given string."""
  number_ends_with: String

  """All values not ending with the given string."""
  number_not_ends_with: String
  type: PhoneType

  """All values that are not equal to given value."""
  type_not: PhoneType

  """All values that are contained in given list."""
  type_in: [PhoneType!]

  """All values that are not contained in given list."""
  type_not_in: [PhoneType!]
  _MagicalBackRelation_ContactToPhoneNumber_every: ContactWhereInput
  _MagicalBackRelation_ContactToPhoneNumber_some: ContactWhereInput
  _MagicalBackRelation_ContactToPhoneNumber_none: ContactWhereInput
}

input PhoneNumberWhereUniqueInput {
  id: ID
}

enum PhoneType {
  MOBILE
  HOME
  WORK
}

type Query {
  contacts(where: ContactWhereInput, orderBy: ContactOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Contact]!
  phoneNumbers(where: PhoneNumberWhereInput, orderBy: PhoneNumberOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [PhoneNumber]!
  contact(where: ContactWhereUniqueInput!): Contact
  phoneNumber(where: PhoneNumberWhereUniqueInput!): PhoneNumber
  contactsConnection(where: ContactWhereInput, orderBy: ContactOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ContactConnection!
  phoneNumbersConnection(where: PhoneNumberWhereInput, orderBy: PhoneNumberOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PhoneNumberConnection!

  """Fetches an object given its ID"""
  node(
    """The ID of an object"""
    id: ID!
  ): Node
}

type Subscription {
  contact(where: ContactSubscriptionWhereInput): ContactSubscriptionPayload
  phoneNumber(where: PhoneNumberSubscriptionWhereInput): PhoneNumberSubscriptionPayload
}
`;

export const Prisma = makePrismaBindingClass<BindingConstructor<Prisma>>({ typeDefs });

/**
 * Types
 */

export type ContactOrderByInput =
  | 'id_ASC'
  | 'id_DESC'
  | 'name_ASC'
  | 'name_DESC'
  | 'updatedAt_ASC'
  | 'updatedAt_DESC'
  | 'createdAt_ASC'
  | 'createdAt_DESC';

export type PhoneType = 'MOBILE' | 'HOME' | 'WORK';

export type MutationType = 'CREATED' | 'UPDATED' | 'DELETED';

export type PhoneNumberOrderByInput =
  | 'id_ASC'
  | 'id_DESC'
  | 'number_ASC'
  | 'number_DESC'
  | 'type_ASC'
  | 'type_DESC'
  | 'updatedAt_ASC'
  | 'updatedAt_DESC'
  | 'createdAt_ASC'
  | 'createdAt_DESC';

export interface ContactCreateInput {
  name: String;
  phone: PhoneNumberCreateOneInput;
}

export interface PhoneNumberUpsertNestedInput {
  update: PhoneNumberUpdateDataInput;
  create: PhoneNumberCreateInput;
}

export interface ContactWhereInput {
  AND?: ContactWhereInput[] | ContactWhereInput;
  OR?: ContactWhereInput[] | ContactWhereInput;
  NOT?: ContactWhereInput[] | ContactWhereInput;
  id?: ID_Input;
  id_not?: ID_Input;
  id_in?: ID_Input[] | ID_Input;
  id_not_in?: ID_Input[] | ID_Input;
  id_lt?: ID_Input;
  id_lte?: ID_Input;
  id_gt?: ID_Input;
  id_gte?: ID_Input;
  id_contains?: ID_Input;
  id_not_contains?: ID_Input;
  id_starts_with?: ID_Input;
  id_not_starts_with?: ID_Input;
  id_ends_with?: ID_Input;
  id_not_ends_with?: ID_Input;
  name?: String;
  name_not?: String;
  name_in?: String[] | String;
  name_not_in?: String[] | String;
  name_lt?: String;
  name_lte?: String;
  name_gt?: String;
  name_gte?: String;
  name_contains?: String;
  name_not_contains?: String;
  name_starts_with?: String;
  name_not_starts_with?: String;
  name_ends_with?: String;
  name_not_ends_with?: String;
  phone?: PhoneNumberWhereInput;
}

export interface PhoneNumberUpdateDataInput {
  number?: String;
  type?: PhoneType;
}

export interface PhoneNumberWhereInput {
  AND?: PhoneNumberWhereInput[] | PhoneNumberWhereInput;
  OR?: PhoneNumberWhereInput[] | PhoneNumberWhereInput;
  NOT?: PhoneNumberWhereInput[] | PhoneNumberWhereInput;
  id?: ID_Input;
  id_not?: ID_Input;
  id_in?: ID_Input[] | ID_Input;
  id_not_in?: ID_Input[] | ID_Input;
  id_lt?: ID_Input;
  id_lte?: ID_Input;
  id_gt?: ID_Input;
  id_gte?: ID_Input;
  id_contains?: ID_Input;
  id_not_contains?: ID_Input;
  id_starts_with?: ID_Input;
  id_not_starts_with?: ID_Input;
  id_ends_with?: ID_Input;
  id_not_ends_with?: ID_Input;
  number?: String;
  number_not?: String;
  number_in?: String[] | String;
  number_not_in?: String[] | String;
  number_lt?: String;
  number_lte?: String;
  number_gt?: String;
  number_gte?: String;
  number_contains?: String;
  number_not_contains?: String;
  number_starts_with?: String;
  number_not_starts_with?: String;
  number_ends_with?: String;
  number_not_ends_with?: String;
  type?: PhoneType;
  type_not?: PhoneType;
  type_in?: PhoneType[] | PhoneType;
  type_not_in?: PhoneType[] | PhoneType;
  _MagicalBackRelation_ContactToPhoneNumber_every?: ContactWhereInput;
  _MagicalBackRelation_ContactToPhoneNumber_some?: ContactWhereInput;
  _MagicalBackRelation_ContactToPhoneNumber_none?: ContactWhereInput;
}

export interface PhoneNumberCreateOneInput {
  create?: PhoneNumberCreateInput;
  connect?: PhoneNumberWhereUniqueInput;
}

export interface PhoneNumberCreateInput {
  number: String;
  type?: PhoneType;
}

export interface ContactUpdateInput {
  name?: String;
  phone?: PhoneNumberUpdateOneInput;
}

export interface PhoneNumberUpdateOneInput {
  create?: PhoneNumberCreateInput;
  connect?: PhoneNumberWhereUniqueInput;
  delete?: Boolean;
  update?: PhoneNumberUpdateDataInput;
  upsert?: PhoneNumberUpsertNestedInput;
}

export interface PhoneNumberUpdateInput {
  number?: String;
  type?: PhoneType;
}

export interface ContactSubscriptionWhereInput {
  AND?: ContactSubscriptionWhereInput[] | ContactSubscriptionWhereInput;
  OR?: ContactSubscriptionWhereInput[] | ContactSubscriptionWhereInput;
  NOT?: ContactSubscriptionWhereInput[] | ContactSubscriptionWhereInput;
  mutation_in?: MutationType[] | MutationType;
  updatedFields_contains?: String;
  updatedFields_contains_every?: String[] | String;
  updatedFields_contains_some?: String[] | String;
  node?: ContactWhereInput;
}

export interface PhoneNumberWhereUniqueInput {
  id?: ID_Input;
}

export interface ContactWhereUniqueInput {
  id?: ID_Input;
}

export interface PhoneNumberSubscriptionWhereInput {
  AND?: PhoneNumberSubscriptionWhereInput[] | PhoneNumberSubscriptionWhereInput;
  OR?: PhoneNumberSubscriptionWhereInput[] | PhoneNumberSubscriptionWhereInput;
  NOT?: PhoneNumberSubscriptionWhereInput[] | PhoneNumberSubscriptionWhereInput;
  mutation_in?: MutationType[] | MutationType;
  updatedFields_contains?: String;
  updatedFields_contains_every?: String[] | String;
  updatedFields_contains_some?: String[] | String;
  node?: PhoneNumberWhereInput;
}

/*
 * An object with an ID

 */
export interface Node {
  id: ID_Output;
}

/*
 * An edge in a connection.

 */
export interface PhoneNumberEdge {
  node: PhoneNumber;
  cursor: String;
}

export interface BatchPayload {
  count: Long;
}

export interface PhoneNumberPreviousValues {
  id: ID_Output;
  number: String;
  type?: PhoneType;
}

export interface AggregatePhoneNumber {
  count: Int;
}

/*
 * A connection to a list of items.

 */
export interface PhoneNumberConnection {
  pageInfo: PageInfo;
  edges: PhoneNumberEdge[];
  aggregate: AggregatePhoneNumber;
}

export interface Contact extends Node {
  id: ID_Output;
  name: String;
  phone: PhoneNumber;
}

/*
 * An edge in a connection.

 */
export interface ContactEdge {
  node: Contact;
  cursor: String;
}

export interface ContactSubscriptionPayload {
  mutation: MutationType;
  node?: Contact;
  updatedFields?: String[];
  previousValues?: ContactPreviousValues;
}

/*
 * A connection to a list of items.

 */
export interface ContactConnection {
  pageInfo: PageInfo;
  edges: ContactEdge[];
  aggregate: AggregateContact;
}

export interface ContactPreviousValues {
  id: ID_Output;
  name: String;
}

export interface AggregateContact {
  count: Int;
}

export interface PhoneNumberSubscriptionPayload {
  mutation: MutationType;
  node?: PhoneNumber;
  updatedFields?: String[];
  previousValues?: PhoneNumberPreviousValues;
}

export interface PhoneNumber extends Node {
  id: ID_Output;
  number: String;
  type?: PhoneType;
}

/*
 * Information about pagination in a connection.

 */
export interface PageInfo {
  hasNextPage: Boolean;
  hasPreviousPage: Boolean;
  startCursor?: String;
  endCursor?: String;
}

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. 
*/
export type Int = number;

/*
The `Long` scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
*/
export type Long = string;

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number;
export type ID_Output = string;

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string;

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean;
