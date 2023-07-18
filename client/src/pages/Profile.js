import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import {
  IonPage,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonText,
  IonCardTitle,
  IonCardSubtitle,
  IonButton,
  IonIcon,
} from "@ionic/react";

import {
  QUERY_USER,
  QUERY_ME,
  QUERY_APPOINTMENT_BY_USER,
} from "../utils/queries";

import Auth from "../utils/auth";
import { closeCircleOutline } from "ionicons/icons";

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const { loading: appointmentloading, data: appointmentsData } = useQuery(
    QUERY_APPOINTMENT_BY_USER,
    {
      variables: { username: Auth.getProfile().data.username },
    }
  );

  const [userAppointments, setUserAppointments] = useState([]); // Set initial state for appointments array.

  useEffect(() => {
    // useEffect hook to set state for appointments.
    if (appointmentsData) {
      // If appointmentsData is available, then...
      setUserAppointments(appointmentsData.appointmentByUser); // Set the state for appointments.
      console.log(appointmentsData.appointmentByUser);
    }
  }, [appointmentsData]); // Run this hook when appointmentsData changes.

  const user = data?.me || data?.user || {};

  const convertTime = (time) => {
    let hours = time.substring(0, 2);
    let minutes = time.substring(3, 5);
    let ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour "0" should be "12"
    minutes = minutes < 10 ? "" + minutes : minutes;
    let strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  };

  // Navigate to personal profile page if the username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading || appointmentloading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <IonPage>
        <IonToolbar>
          <h4>You need to be logged in</h4>
        </IonToolbar>
        <IonText>
          <h4>
            You need to be logged in to see this. Use the navigation links above
            to sign up or log in!
          </h4>
        </IonText>
      </IonPage>
    );
  }

  return (
    <>
      <h2>Viewing {userParam ? `${user.username}'s` : "your"} profile.</h2>
      <IonList>
        {userAppointments.length ? (
          userAppointments.map((appointment, index) => (
            <IonItem key={index}>
              <IonButton color="danger" slot="start" fill="clear">
                <IonIcon slot="icon-only" icon={closeCircleOutline} />
              </IonButton>
              <IonLabel className="ion-text-wrap">
                <IonCardTitle>{appointment.appointmentType}</IonCardTitle>
                <IonCardSubtitle>
                  Scheduled on: {appointment.appointmentDate} at{" "}
                  {convertTime(appointment.appointmentTime)}
                  <br />
                  with: {appointment.stylistName}
                </IonCardSubtitle>
              </IonLabel>
              <IonText slot="end">{appointment.appointmentCost}</IonText>
            </IonItem>
          ))
        ) : (
          <IonText>
            <p>No appointments found.</p>
          </IonText>
        )}
      </IonList>
    </>
  );
};

export default Profile;
