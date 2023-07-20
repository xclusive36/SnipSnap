import React from "react";
import { useLocation } from "react-router-dom";
import {
  IonButtons,
  IonButton,
  IonToolbar,
  IonTitle,
  IonIcon,
} from "@ionic/react";
import Auth from "../../utils/auth";
import { arrowBackOutline } from "ionicons/icons";

const Header = () => {
  const location = useLocation();
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header>
      <IonToolbar color="primary">
        {location.pathname !== "/" && (
          <IonButtons slot="start">
            <IonButton routerLink="/">
              <IonIcon icon={arrowBackOutline} />
            </IonButton>
          </IonButtons>
        )}
        <IonTitle mode="md">SnipSnap</IonTitle>
        <IonButtons slot="end">
          {Auth.loggedIn() ? (
            <>
              {location.pathname === "/" && (
                <IonButton routerLink="/me">My Appointments</IonButton>
              )}
              {location.pathname !== "/" && (
                <IonButton onClick={logout}>Logout</IonButton>
              )}
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
