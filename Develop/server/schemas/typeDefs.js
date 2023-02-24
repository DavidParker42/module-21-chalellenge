const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    userName: String!
    email: String
    bookCount: int 
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
    tech: [Tech]
    matchups(_id: String): [Matchup]
  }

  type Mutation {
    createMatchup(tech1: String!, tech2: String!): Matchup
    createVote(_id: String!, techNum: Int!): Matchup
  }
`;

module.exports = typeDefs;
