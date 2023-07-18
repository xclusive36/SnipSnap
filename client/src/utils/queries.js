import { gql } from "@apollo/client";

export const QUERY_STYLISTS = gql`
  query getStylists {
    stylists {
      _id
      stylistName
    }
  }
`;

export const QUERY_SERVICES = gql`
  query getServices {
    services {
      _id
      serviceName
      serviceDescription
      servicePrice
      customerNotes
    }
  }
`;

export const QUERY_APPOINTMENTS = gql`
  query getAppointments {
    appointments {
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

export const QUERY_APPOINTMENT = gql`
  query getAppointment($appointmentId: ID!) {
    appointment(appointmentId: $appointmentId) {
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

export const QUERY_APPOINTMENT_BY_USER = gql`
  query getAppointmentByUser($username: String!) {
    appointmentByUser(username: $username) {
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

export const QUERY_USER = gql`
  query getUser($username: String!) {
    user(username: $username) {
      _id
      username
      email
      appointments {
        _id
        customerName
        stylistName
        appointmentDate
        appointmentTime
        appointmentType
        appointmentCost
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      appointments {
        _id
        customerName
        stylistName
        appointmentDate
        appointmentTime
        appointmentType
        appointmentCost
      }
    }
  }
`;
