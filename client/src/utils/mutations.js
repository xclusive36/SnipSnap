import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_STYLIST = gql`
  mutation addStylist($stylistName: String!) {
    addStylist(stylistName: $stylistName) {
      _id
      stylistName
    }
  }
`;

export const ADD_APPOINTMENT = gql`
  mutation addAppointment(
    $customerName: String!
    $stylistName: String!
    $appointmentDate: String!
    $appointmentTime: String!
    $appointmentType: String!
    $appointmentCost: String!
  ) {
    addAppointment(
      customerName: $customerName
      stylistName: $stylistName
      appointmentDate: $appointmentDate
      appointmentTime: $appointmentTime
      appointmentType: $appointmentType
      appointmentCost: $appointmentCost
    ) {
      _id
      customerName
      stylistName
      appointmentDate
      appointmentTime
      appointmentType
      appointmentCost
    }
  }
`;

export const ADD_SERVICE = gql`
  mutation addService(
    $serviceName: String!
    $serviceDescription: String!
    $servicePrice: String!
    $customerNotes: String!
  ) {
    addService(
      serviceName: $serviceName
      serviceDescription: $serviceDescription
      servicePrice: $servicePrice
      customerNotes: $customerNotes
    ) {
      _id
      serviceName
      serviceDescription
      servicePrice
      customerNotes
    }
  }
`;

export const REMOVE_APPOINTMENT = gql`
  mutation removeAppointment($appointmentId: ID!) {
    removeAppointment(appointmentId: $appointmentId) {
      _id
      customerName
      stylistName
      appointmentDate
      appointmentTime
      appointmentType
    }
  }
`;
