module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app/app.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__("@nestjs/common");
const apollo_server_express_1 = __webpack_require__("apollo-server-express");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const utils_1 = __webpack_require__("./src/app/utils/index.ts");
const contacts_module_1 = __webpack_require__("./src/app/contacts/contacts.module.ts");
const prisma_1 = __webpack_require__("./src/app/gql/generated/prisma.ts");
const global_resolver_1 = __webpack_require__("./src/app/global.resolver.ts");
let ApplicationModule = class ApplicationModule {
    constructor(graphQLFactory) {
        this.graphQLFactory = graphQLFactory;
    }
    async configureGraphQL(app, httpServer) {
        const typeDefs = __webpack_require__("./src/app/gql/schema.graphql");
        const schema = this.graphQLFactory.createSchema({ typeDefs, logger: new common_1.Logger('Schema') });
        const db = new prisma_1.Prisma({
            debug: true,
            endpoint: utils_1.Env('PRISMA_ENDPOINT', 'http://localhost:4466'),
            secret: utils_1.Env('PRISMA_MANAGEMENT_API_SECRET', ''),
        });
        console.log({
            PRISMA_ENDPOINT: utils_1.Env('PRISMA_ENDPOINT', 'http://localhost:4466'),
            PRISMA_MANAGEMENT_API_SECRET: utils_1.Env('PRISMA_MANAGEMENT_API_SECRET', ''),
        });
        const server = new apollo_server_express_1.ApolloServer({
            schema,
            tracing: true,
            playground: true,
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
};
ApplicationModule = __decorate([
    common_1.Module({
        imports: [graphql_1.GraphQLModule, contacts_module_1.ContactsModule],
        providers: [global_resolver_1.GlobalReslover],
    }),
    __metadata("design:paramtypes", [graphql_1.GraphQLFactory])
], ApplicationModule);
exports.ApplicationModule = ApplicationModule;


/***/ }),

/***/ "./src/app/contacts/contacts.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__("@nestjs/common");
const contacts_resolver_1 = __webpack_require__("./src/app/contacts/contacts.resolver.ts");
let ContactsModule = class ContactsModule {
};
ContactsModule = __decorate([
    common_1.Module({
        providers: [contacts_resolver_1.ContactsResolver],
    })
], ContactsModule);
exports.ContactsModule = ContactsModule;


/***/ }),

/***/ "./src/app/contacts/contacts.resolver.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = __webpack_require__("@nestjs/graphql");
const apollo_server_core_1 = __webpack_require__("apollo-server-core");
let ContactsResolver = class ContactsResolver {
    async getContacts(_, { limit }, ctx, info) {
        if (limit > 50)
            throw new apollo_server_core_1.UserInputError('Limit Cannot be greater than 50', { limit });
        return await ctx.db.query.contacts({
            first: limit,
        }, info);
    }
    async getContactById(_, { id }, ctx, info) {
        return await ctx.db.query.contact({
            where: {
                id,
            },
        }, info);
    }
    async addContact(_, { name, phoneNumber, type }, ctx, info) {
        return await ctx.db.mutation.createContact({
            data: {
                name,
                phone: {
                    create: {
                        number: phoneNumber,
                        type,
                    },
                },
            },
        }, info);
    }
    async updateContact(_, { data, id }, ctx, info) {
        return await ctx.db.mutation.updateContact({ data, where: { id } }, info);
    }
    async deleteContact(_, { id }, ctx, info) {
        return await ctx.db.mutation.deleteContact({ where: { id } }, info);
    }
};
__decorate([
    graphql_1.Query('contacts'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ContactsResolver.prototype, "getContacts", null);
__decorate([
    graphql_1.Query('contact'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ContactsResolver.prototype, "getContactById", null);
__decorate([
    graphql_1.Mutation(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ContactsResolver.prototype, "addContact", null);
__decorate([
    graphql_1.Mutation(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ContactsResolver.prototype, "updateContact", null);
__decorate([
    graphql_1.Mutation(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ContactsResolver.prototype, "deleteContact", null);
ContactsResolver = __decorate([
    graphql_1.Resolver('Contact')
], ContactsResolver);
exports.ContactsResolver = ContactsResolver;


/***/ }),

/***/ "./src/app/global.resolver.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = __webpack_require__("@nestjs/graphql");
let GlobalReslover = class GlobalReslover {
    async node(_, { id }, ctx, info) {
        return await ctx.db.query.node({ id }, info);
    }
    async resloveType(obj) {
        return await obj.__resolveType;
    }
};
__decorate([
    graphql_1.Query(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], GlobalReslover.prototype, "node", null);
__decorate([
    graphql_1.ResolveProperty('__resolveType'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GlobalReslover.prototype, "resloveType", null);
GlobalReslover = __decorate([
    graphql_1.Resolver('Node')
], GlobalReslover);
exports.GlobalReslover = GlobalReslover;


/***/ }),

/***/ "./src/app/gql/generated/prisma.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const prisma_binding_1 = __webpack_require__("prisma-binding");
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
exports.Prisma = prisma_binding_1.makePrismaBindingClass({ typeDefs });


/***/ }),

/***/ "./src/app/gql/schema.graphql":
/***/ (function(module, exports) {

module.exports = `type Query {
  contacts(limit: Int = 20): [Contact]!
  contact(id: ID!): Contact
  node(id: ID!): Node
}

type Mutation {
  addContact(name: String!, phoneNumber: String!, type: PhoneType = HOME): Contact!
  updateContact(data: ContactUpdateInput!, id: ID!): Contact
  deleteContact(id: ID!): Contact
}

type Contact implements Node {
  id: ID!
  name: String!
  phone(where: PhoneNumberWhereInput): PhoneNumber!
}

"""
An object with an ID
"""
interface Node {
  """
  The id of the object.
  """
  id: ID!
}

enum PhoneType {
  MOBILE
  HOME
  WORK
}

input ContactUpdateInput {
  name: String
  phone: PhoneNumberUpdateOneInput
}

type PhoneNumber implements Node {
  id: ID!
  number: String!
  type: PhoneType
}

input PhoneNumberWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [PhoneNumberWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [PhoneNumberWhereInput!]
  """
  Logical NOT on all given filters combined by AND.
  """
  NOT: [PhoneNumberWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  number: String
  """
  All values that are not equal to given value.
  """
  number_not: String
  """
  All values that are contained in given list.
  """
  number_in: [String!]
  """
  All values that are not contained in given list.
  """
  number_not_in: [String!]
  """
  All values less than the given value.
  """
  number_lt: String
  """
  All values less than or equal the given value.
  """
  number_lte: String
  """
  All values greater than the given value.
  """
  number_gt: String
  """
  All values greater than or equal the given value.
  """
  number_gte: String
  """
  All values containing the given string.
  """
  number_contains: String
  """
  All values not containing the given string.
  """
  number_not_contains: String
  """
  All values starting with the given string.
  """
  number_starts_with: String
  """
  All values not starting with the given string.
  """
  number_not_starts_with: String
  """
  All values ending with the given string.
  """
  number_ends_with: String
  """
  All values not ending with the given string.
  """
  number_not_ends_with: String
  type: PhoneType
  """
  All values that are not equal to given value.
  """
  type_not: PhoneType
  """
  All values that are contained in given list.
  """
  type_in: [PhoneType!]
  """
  All values that are not contained in given list.
  """
  type_not_in: [PhoneType!]
}

input PhoneNumberUpdateOneInput {
  create: PhoneNumberCreateInput
  connect: PhoneNumberWhereUniqueInput
  delete: Boolean
  update: PhoneNumberUpdateDataInput
  upsert: PhoneNumberUpsertNestedInput
}

input PhoneNumberCreateInput {
  number: String!
  type: PhoneType
}

input PhoneNumberWhereUniqueInput {
  id: ID
}

input PhoneNumberUpdateDataInput {
  number: String
  type: PhoneType
}

input PhoneNumberUpsertNestedInput {
  update: PhoneNumberUpdateDataInput!
  create: PhoneNumberCreateInput!
}
`

/***/ }),

/***/ "./src/app/utils/env.util.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __webpack_require__("dotenv");
const ramda_1 = __webpack_require__("ramda");
dotenv_1.config();
function Env(key, fallback) {
    const val = process.env[key];
    return ramda_1.isNil(val) ? fallback : val;
}
exports.Env = Env;


/***/ }),

/***/ "./src/app/utils/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("./src/app/utils/env.util.ts"));


/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__("@nestjs/core");
const app_module_1 = __webpack_require__("./src/app/app.module.ts");
const utils_1 = __webpack_require__("./src/app/utils/index.ts");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.ApplicationModule);
    const appModule = app.get(app_module_1.ApplicationModule);
    const httpServer = app.getHttpServer();
    appModule.configureGraphQL(app, httpServer);
    await app
        .disable('etag')
        .disable('x-powered-by')
        .listen(utils_1.Env('PORT', '3000'));
}
bootstrap();


/***/ }),

/***/ "@nestjs/common":
/***/ (function(module, exports) {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/core":
/***/ (function(module, exports) {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/graphql":
/***/ (function(module, exports) {

module.exports = require("@nestjs/graphql");

/***/ }),

/***/ "apollo-server-core":
/***/ (function(module, exports) {

module.exports = require("apollo-server-core");

/***/ }),

/***/ "apollo-server-express":
/***/ (function(module, exports) {

module.exports = require("apollo-server-express");

/***/ }),

/***/ "dotenv":
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),

/***/ "prisma-binding":
/***/ (function(module, exports) {

module.exports = require("prisma-binding");

/***/ }),

/***/ "ramda":
/***/ (function(module, exports) {

module.exports = require("ramda");

/***/ })

/******/ });