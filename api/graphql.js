const { ApolloServer, gql } = require('apollo-server-lambda');
const { prisma } = require('./prisma/client');

const typeDefs = gql`
  type Query {
    allHaiku: [Haiku!]!
    allSnaps: [Snap!]!
    haiku(id: ID!): Haiku!
  }

  type Haiku {
    id: ID!
    createdAt: String!
    updatedAt: String!
    title: String!
    slug: String!
    content: String!
    author: User!
    snapCount: Int!
    snaps: [Snap!]!
  }

  type User {
    id: ID!
    name: String
  }

  type Snap {
    id: ID!
    haiku: Haiku!
    user: User!
  }

  type Mutation {
    addHaiku(input: HaikuInput!): Haiku!
    addUser(input: UserInput!): User!
    addSnap(input: SnapInput!): Snap!
  }

  input HaikuInput {
    title: String!
    slug: String!
    content: String!
    userID: String!
  }

  input UserInput {
    name: String!
  }

  input SnapInput {
    haikuID: String!
    userID: String!
  }
`;

const resolvers = {
  Query: {
    allHaiku: () => prisma.haikus(),
    allSnaps: () => prisma.snaps(),
    haiku: (_, { id }) => prisma.haiku({ id })
  },
  Haiku: {
    author: parent => prisma.haiku({ id: parent.id }).author(),
    snaps: parent => prisma.haiku({ id: parent.id }).snaps(),
    snapCount: parent =>
      prisma
        .snapsConnection({ where: { haiku: { id: parent.id } } })
        .aggregate()
        .count()
  },
  Snap: {
    haiku: parent => prisma.snap({ id: parent.id }).haiku(),
    user: parent => prisma.snap({ id: parent.id }).user()
  },
  Mutation: {
    addUser: (_, { input }) => prisma.createUser(input),
    addHaiku: (_, { input }) =>
      prisma.createHaiku({
        title: input.title,
        slug: input.slug,
        content: input.content,
        author: {
          connect: { id: input.userID }
        }
      }),
    addSnap: (_, { input }) =>
      prisma.createSnap({
        haiku: { connect: { id: input.haikuID } },
        user: { connect: { id: input.userID } }
      })
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

exports.handler = server.createHandler();
