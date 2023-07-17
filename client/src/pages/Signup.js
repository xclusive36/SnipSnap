import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonButton,
  IonText,
} from "@ionic/react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const Signup = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sign Up</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {data ? (
          <p>
            Success! You may now head <Link to="/">back to the homepage.</Link>
          </p>
        ) : (
          <form onSubmit={handleFormSubmit}>
            <IonInput
              placeholder="Your username"
              name="username"
              type="text"
              value={formState.username}
              onIonChange={handleChange}
            />
            <IonInput
              placeholder="Your email"
              name="email"
              type="email"
              value={formState.email}
              onIonChange={handleChange}
            />
            <IonInput
              placeholder="******"
              name="password"
              type="password"
              value={formState.password}
              onIonChange={handleChange}
            />
            <IonButton expand="block" type="submit" className="ion-margin-top">
              Submit
            </IonButton>
          </form>
        )}

        {error && (
          <div className="ion-margin-top ion-text-center">
            <IonText color="danger">{error.message}</IonText>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Signup;
