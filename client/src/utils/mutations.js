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
  ) {
    addAppointment(
      customerName: $customerName
      stylistName: $stylistName
      appointmentDate: $appointmentDate
      appointmentTime: $appointmentTime
    ) {
      _id
      customerName
      stylistName
      appointmentDate
      appointmentTime
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
    }
  }
`;
