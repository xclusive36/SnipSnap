import React, { useState } from "react";
import {
  IonCard,
  IonCardContent,
  IonInput,
  IonButton,
  IonText,
  IonItem,
} from "@ionic/react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const Signup = () => {
  // State to manage form input values
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Use mutation to add a new user
  const [addUser, { error, data }] = useMutation(ADD_USER);

  // Function to handle form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // Execute the addUser mutation with the formState values
      const { data } = await addUser({
        variables: { ...formState },
      });

      // If successful, log in the user with the returned token
      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <IonCard>
      <IonCardContent className="ion-padding">
        {/* If data exists (successful user creation), show success message */}
        {data ? (
          <p>
            Success! You may now head <Link to="/">back to the homepage.</Link>
          </p>
        ) : (
          /* If no data (user not yet created), show the signup form */
          <form onSubmit={handleFormSubmit}>
            <IonItem>
              <IonInput
                placeholder="Your username"
                name="username"
                type="text"
                value={formState.username}
                onIonChange={handleChange}
              />
            </IonItem>
            <IonItem>
              <IonInput
                placeholder="Your email"
                name="email"
                type="email"
                value={formState.email}
                onIonChange={handleChange}
              />
            </IonItem>
            <IonItem>
              <IonInput
                placeholder="Your new password"
                name="password"
                type="password"
                value={formState.password}
                onIonChange={handleChange}
              />
            </IonItem>
            <IonButton expand="block" type="submit" className="ion-margin-top">
              Submit
            </IonButton>
          </form>
        )}

        {/* Show error message if there's an error */}
        {error && (
          <div className="ion-margin-top ion-text-center">
            <IonText color="danger">{error.message}</IonText>
          </div>
        )}
      </IonCardContent>
    </IonCard>
  );
};

export default Signup;
