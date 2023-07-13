const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
  }

  type Stylist {
    _id: ID
    stylistName: String
  }

  type Service {
    _id: ID
    serviceName: String
    serviceDescription: String
    servicePrice: String
    customerNotes: String
  }

  type Appointment {
    _id: ID
    customerName: String
    stylistName: String
    appointmentDate: String
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
    appointments: [Appointment]
    appointment(appointmentId: ID!): Appointment
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addStylist(stylistName: String!): Stylist
    addAppointment(customerName: String!, stylistName: String!, appointmentDate: String!, appointmentTime: String!): Appointment
    removeAppointment(appointmentId: ID!): Appointment
  }
`;

module.exports = typeDefs;
