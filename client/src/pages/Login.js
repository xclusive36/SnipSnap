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

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <main className="flex-row justify-center">
      {data ? (
        <p>
          Success! You may now head <Link to="/">back to the homepage.</Link>
        </p>
      ) : (
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

      {error && (
        <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
      )}
    </main>
  );
};

export default Login;
