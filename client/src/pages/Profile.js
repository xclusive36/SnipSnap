import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { IonPage, IonToolbar, IonList, IonItem, IonLabel, IonText } from '@ionic/react';

import { QUERY_USER, QUERY_ME, QUERY_APPOINTMENT_BY_USER } from '../utils/queries';

import Auth from '../utils/auth';

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const { loading: appointmentloading, data: appointmentsData } = useQuery(QUERY_APPOINTMENT_BY_USER);

  const user = data?.me || data?.user || {};

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
            You need to be logged in to see this. Use the navigation links above to
            sign up or log in!
          </h4>
        </IonText>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonToolbar>
        <h2>
          Viewing {userParam ? `${user.username}'s` : 'your'} profile.
        </h2>
      </IonToolbar>
      <IonList>
        {appointmentsData?.length ? (
          appointmentsData.map((appointment, index) => (
            <IonItem key={index}>
              <IonLabel>{appointment.title}</IonLabel>
            </IonItem>
          ))
        ) : (
          <IonText>
            <p>No appointments found.</p>
          </IonText>
        )}
      </IonList>
    </IonPage>
  );
};

export default Profile;
