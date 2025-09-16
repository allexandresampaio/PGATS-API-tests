const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    username: String!
    favorecidos: [String]
    saldo: Float
  }

  type Transfer {
    from: String
    to: String
    amount: Float
    date: String
  }

  type Query {
    users: [User]
    transfers: [Transfer]
  }

  type Mutation {
    registerUser(username: String!, password: String!, favorecidos: [String]): User
    login(username: String!, password: String!): String
    transfer(from: String!, to: String!, amount: Float!): Transfer
  }
`;

module.exports = typeDefs;
