const { gql } = require("apollo-server-express");

const typeDefs = gql`
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
    appointmentType: String
    appointmentCost: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type User {
    _id: ID
    username: String
    email: String
    password: String
    appointments: [Appointment]
  }

  type Query {
    users: [User]
    user(username: String!): User
    stylists: [Stylist]
    services: [Service]
    appointments: [Appointment]
    appointment(appointmentId: ID!): Appointment
    appointmentByUser(username: String!): [Appointment]
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addStylist(stylistName: String!): Stylist
    addService(serviceName: String!, serviceDescription: String, servicePrice: String!, customerNotes: String): Service
    addAppointment(customerName: String!, stylistName: String!, appointmentDate: String!, appointmentTime: String!, appointmentType: String!, appointmentCost: String!): Appointment
    removeAppointment(appointmentId: ID!): Appointment
  }
`;

module.exports = typeDefs;
