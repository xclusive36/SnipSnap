// Import the gql function from apollo-server-express to define GraphQL type definitions.
const { gql } = require("apollo-server-express");

// Define the GraphQL type definitions using the gql template literal tag.
const typeDefs = gql`
  # Define the 'Stylist' type with its fields.

  type Stylist {
    _id: ID        # The unique identifier for the stylist.
    stylistName: String    # The name of the stylist.
  }

  # Define the 'Service' type with its fields.


  type Service {
    _id: ID        # The unique identifier for the service.
    serviceName: String    # The name of the service.
    serviceDescription: String    # The description of the service.
    servicePrice: String    # The price of the service.
    customerNotes: String    # Any additional notes for the service.
  }

  # Define the 'Appointment' type with its fields.

  type Appointment {
    _id: ID        # The unique identifier for the appointment.
    customerName: String    # The name of the customer for the appointment.
    stylistName: String    # The name of the stylist for the appointment.
    appointmentDate: String    # The date of the appointment.
    appointmentTime: String    # The time of the appointment.
    appointmentType: String    # The type of the appointment.
    appointmentCost: String    # The cost of the appointment.
  }

  # Define the 'Auth' type with its fields.

  type Auth {
    token: ID!        # The authentication token for the user.
    user: User        # The associated user object after login.
  }

  # Define the 'User' type with its fields.

  type User {
    _id: ID        # The unique identifier for the user.
    username: String    # The username of the user.
    email: String    # The email of the user.
    password: String    # The hashed password of the user.
    appointments: [Appointment]    # The list of appointments associated with the user.
  }

  # Define the 'Query' type with its fields.

  type Query {
    users: [User]    # Get a list of all users.
    user(username: String!): User    # Get a specific user by their username.
    stylists: [Stylist]    # Get a list of all stylists.
    services: [Service]    # Get a list of all services.
    appointments: [Appointment]    # Get a list of all appointments.
    appointment(appointmentId: ID!): Appointment    # Get a specific appointment by its ID.
    appointmentByUser(username: String!): [Appointment]    # Get a list of appointments for a specific user by their username.
    me: User    # Get the authenticated user's own profile.
  }

  # Define the 'Mutation' type with its fields.

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth    # Register a new user.
    login(email: String!, password: String!): Auth    # Authenticate a user during login.
    addStylist(stylistName: String!): Stylist    # Add a new stylist.
    addService(serviceName: String!, serviceDescription: String, servicePrice: String!, customerNotes: String): Service    # Add a new service.
    addAppointment(customerName: String!, stylistName: String!, appointmentDate: String!, appointmentTime: String!, appointmentType: String!, appointmentCost: String!): Appointment    # Add a new appointment.
    removeAppointment(appointmentId: ID!): Appointment    # Remove an appointment by its ID.
  }
`;

// Export the 'typeDefs' to make them available for use in the Apollo Server.

module.exports = typeDefs;
