import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { REMOVE_APPOINTMENT } from "../utils/mutations";
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
  IonToast,
  useIonAlert,
} from "@ionic/react";

import {
  QUERY_USER,
  QUERY_ME,
  QUERY_APPOINTMENT_BY_USER,
} from "../utils/queries";

import Auth from "../utils/auth";
import { closeCircleOutline } from "ionicons/icons";

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userAppointments, setUserAppointments] = useState([]); // Set initial state for appointments array.
  const [removeAppointment] = useMutation(REMOVE_APPOINTMENT);
  const { username: userParam } = useParams();
  const [presentAlert] = useIonAlert();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const { loading: appointmentloading, data: appointmentsData } = useQuery(
    QUERY_APPOINTMENT_BY_USER,
    {
      variables: { username: Auth.getProfile().data.username },
    }
  );

  useEffect(() => {
    // useEffect hook to set state for appointments.
    if (appointmentsData) {
      // If appointmentsData is available, then...
      setUserAppointments(appointmentsData.appointmentByUser); // Set the state for appointments.
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

  const handleDelete = (e, appointmentId, index) => {
    // Define the handleDelete function.
    e.preventDefault(); // Prevent the default form action.
    const headers = {
      // define headers variable for simplicity
      headers: {
        // define headers
        Authorization: `Bearer ${Auth.getToken()}`, // set Authorization to Bearer token
      },
    };

    try {
      removeAppointment({
        // run removeAppointment mutation
        variables: { appointmentId: appointmentId }, // set variables
        context: headers, // set context to headers
      });
      setIsOpen(true); // setIsOpen to true
      console.log("Appointment cancelled!"); // console.log("Appointment cancelled!")
      window.location.reload(); // reload the page
    } catch (err) {
      // catch errors
      console.error(err); // console.error(err) to the console
    }
  };

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
          userAppointments?.map((appointment, index) => (
            <IonItem key={index}>
              <IonButton
                onClick={(e) =>
                  presentAlert({
                    header: "Delete Appointment",
                    subHeader:
                      "Are you sure you want to delete this appointment?",
                    message: "This action cannot be undone.",
                    buttons: [
                      {
                        text: "Cancel",
                        role: "cancel",
                      },
                      {
                        text: "OK",
                        role: "confirm",
                        handler: () => {
                          handleDelete(e, appointment?._id, index);
                        },
                      },
                    ],
                  })
                }
                color="danger"
                slot="start"
              >
                <IonIcon slot="icon-only" icon={closeCircleOutline} />
              </IonButton>
              <IonLabel className="ion-text-wrap">
                <IonCardTitle>{appointment?.appointmentType}</IonCardTitle>
                <IonCardSubtitle>
                  Scheduled on: {appointment?.appointmentDate} at{" "}
                  {convertTime(appointment?.appointmentTime)}
                  <br />
                  with: {appointment?.stylistName}
                </IonCardSubtitle>
                <IonToast
                  isOpen={isOpen}
                  message="Your appointment was cancelled! Reloading page..."
                  onDidDismiss={() => setIsOpen(false)}
                  duration={5000}
                ></IonToast>
              </IonLabel>
              <IonText slot="end">{appointment?.appointmentCost}</IonText>
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
