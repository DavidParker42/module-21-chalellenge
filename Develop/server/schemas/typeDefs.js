const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    bookId: ID!
    image: String
    link: String
    title: String
    description: String
    authors: [String]
  }
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

  input BookInput {
    bookId: String
    image: String
    link: String
    title: String
    description: String
    authors: [String]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBooks(bookData: BookInput): User
    deleteBooks(bookId: ID): User
  }
`;

module.exports = typeDefs;
