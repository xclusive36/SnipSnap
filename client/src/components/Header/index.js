import React from "react";
import { Link } from "react-router-dom";
import { IonButtons, IonButton, IonToolbar, IonTitle } from "@ionic/react";

import Auth from "../../utils/auth";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header>
      <IonToolbar>
        <IonButtons slot="start">
          <IonButton routerLink="/">Home</IonButton>
        </IonButtons>
        <IonTitle>SnipSnap</IonTitle>
        <IonButtons slot="end">
          {Auth.loggedIn() ? (
            <>
              <IonButton routerLink="/me">
                {Auth.getProfile().data.username}'s profile
              </IonButton>
              <IonButton onClick={logout}>Logout</IonButton>
            </>
          ) : (
            <>
              <IonButton routerLink="/login">Login</IonButton>
              <IonButton routerLink="/signup">Signup</IonButton>
            </>
          )}
        </IonButtons>
      </IonToolbar>
    </header>
  );
};

export default Header;
