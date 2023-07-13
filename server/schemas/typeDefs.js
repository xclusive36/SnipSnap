const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    thoughts: [Thought]!
  }

  Type Stylist {
    _id: ID
    stylistName: String
  }

  type Service {
    _id: ID
    serviceName: String
    serviceDescription: String
    servicePrice: Number
    customerNotes: String
  }

  type Appointment {
    _id: ID
    customerName: String
    stylistName: String
    appointmentDate: Date
    appointmentTime: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    stylists: [Stylist]
    thoughts(username: String): [Thought]
    thought(thoughtId: ID!): Thought
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addStylist(stylistName: String!): Stylist
    addThought(thoughtText: String!): Thought
    addComment(thoughtId: ID!, commentText: String!): Thought
    removeThought(thoughtId: ID!): Thought
    removeComment(thoughtId: ID!, commentId: ID!): Thought
  }
`;

module.exports = typeDefs;
