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
    book_id: ID!
    image: String
    link: String
    title: String
    description: String
    authors: [String]
  }
  type Auth {
    token: ID!
    User: String
  }

  type Query {
    me: User
  }

  input BookInput {
    book_id: ID!
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
