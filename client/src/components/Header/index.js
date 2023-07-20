import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  IonButtons,
  IonButton,
  IonToolbar,
  IonTitle,
  IonIcon,
  IonModal,
  IonHeader,
  IonContent,
} from "@ionic/react";
import Auth from "../../utils/auth";
import { arrowBackOutline } from "ionicons/icons";

const Header = () => {
  const location = useLocation();
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  // State for the About modal
  const [showAboutModal, setShowAboutModal] = useState(false);

  // Function to toggle the About modal
  const toggleAboutModal = () => {
    setShowAboutModal(!showAboutModal);
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
              {/* Add the About button */}
              <IonButton onClick={toggleAboutModal}>About</IonButton>
            </>
          )}
        </IonButtons>
      </IonToolbar>

      {/* About Modal */}
      <IonModal
        isOpen={showAboutModal}
        onDidDismiss={() => setShowAboutModal(false)}
      >
        <IonHeader>
          <IonToolbar>
            <IonTitle>About</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          {/* Flipped section: How to Use the App */}
          <h2 className="about-modal-heading">How to Use the App</h2>
          <p>To book an appointment, follow these steps:</p>
          <ol>
            <li>
              <strong>Account Creation:</strong> Sign up for an account to
              access our booking system. Provide essential details for a smooth
              registration process.
            </li>
            <li>
              <strong>Service Selection:</strong> Choose your desired options,
              including services, pricing, and stylist preferences, from the
              provided list.
            </li>
            <li>
              <strong>Date and Time Selection:</strong> After selecting your
              preferences, pick a suitable date and time for your appointment
              from our available slots.
            </li>
            <li>
              <strong>Appointment Confirmation:</strong> Once you've chosen the
              date and time, confirm your appointment to secure your booking.
            </li>
            <li>
              <strong>View Appointment:</strong> You can easily review and
              manage your booked appointments by visiting the "My Appointments"
              page.
            </li>
          </ol>
          <p>Experience hassle-free booking with us today!</p>
          {/* Add other content for the How to Use the App section */}

          <h2 className="about-modal-heading">Contact Information</h2>
          <p>
            You can get directly in contact with one of our stylists by sending
            and email to{" "}
            <a
              className="about-modal-link"
              href="https://github.com/xclusive36/SnipSnap"
            >
              https://github.com/xclusive36/SnipSnap
            </a>{" "}
            or calling us on our business hours at 1-800-SNIP.{" "}
          </p>

          <IonButton expand="block" onClick={() => setShowAboutModal(false)}>
            Click out of this pop-up to close it
          </IonButton>
        </IonContent>
      </IonModal>
    </header>
  );
};

export default Header;
