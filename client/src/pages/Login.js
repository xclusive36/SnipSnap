import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import {
  IonCard,
  IonInput,
  IonButton,
  IonItem,
  IonCardContent,
} from "@ionic/react";

import Auth from "../utils/auth";

const Login = (props) => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // Function to update state based on form input changes
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
      const { data } = await login({
        variables: { ...formState },
      });

      // Call Auth.login function if login is successful
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // Clear form values after submission
    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <main className="flex-row justify-center">
      {/* If login is successful, show success message */}
      {data ? (
        <p>
          Success! You may now head <Link to="/">back to the homepage.</Link>
        </p>
      ) : (
        // If login is not successful, show login form
        <IonCard>
          <IonCardContent>
            <form onSubmit={handleFormSubmit}>
              <IonItem>
                <IonInput
                  label="Your email"
                  labelPlacement="stacked"
                  className="form-input"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onIonChange={handleChange}
                />
              </IonItem>
              <IonItem className="ion-padding-bottom">
                <IonInput
                  label="Password"
                  labelPlacement="stacked"
                  className="form-input"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onIonChange={handleChange}
                />
              </IonItem>
              {/* Submit button */}
              <IonButton
                expand="full"
                style={{ cursor: "pointer" }}
                type="submit"
              >
                Submit
              </IonButton>
            </form>
          </IonCardContent>
        </IonCard>
      )}

      {/* Show error message if login fails */}
      {error && (
        <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
      )}
    </main>
  );
};

export default Login;
