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
      {/* Toolbar with primary color */}
      <IonToolbar color="primary">
        {/* Show back button if not on the home page */}
        {location.pathname !== "/" && (
          <IonButtons slot="start">
            <IonButton routerLink="/">
              <IonIcon icon={arrowBackOutline} />
            </IonButton>
          </IonButtons>
        )}
        {/* Title */}
        <IonTitle mode="md">SnipSnap</IonTitle>
        <IonButtons slot="end">
          {/* If the user is logged in */}
          {Auth.loggedIn() ? (
            <>
              {/* Show "My Appointments" button if on the home page */}
              {location.pathname === "/" && (
                <>
                  <IonButton routerLink="/me">My Appointments</IonButton>
                  <IonButton routerLink="/about">About</IonButton>
                </>
              )}
              {/* Show "Logout" button if not on the home page */}
              {location.pathname !== "/" && (
                <IonButton onClick={logout}>Logout</IonButton>
              )}
            </>
          ) : location.pathname === "/" ? (
            // Show "Login", "Signup", and "About" buttons if not logged in
            <>
              <IonButton routerLink="/login">Login</IonButton>
              <IonButton routerLink="/signup">Signup</IonButton>
              {/* Add the "About" button */}
              <IonButton routerLink="/about">About</IonButton>
            </>
          ) : (
            // Show "Login" and "Signup" buttons if not logged in
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
