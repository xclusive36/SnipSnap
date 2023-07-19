import React from "react";
import { IonToolbar } from "@ionic/react";

const Footer = () => {
  return (
    <footer>
        <IonToolbar className="ion-text-center">
          <p>Hours of Operation:</p>
          <p>Monday - Friday: 9am - 7pm</p>
          <p>Saturday: 9am - 6pm</p>
          <p>Sunday: 10am - 5pm</p>
          <p>Copyright 2023 &#169; SnipSnap</p>
        </IonToolbar>
    </footer>
  );
};

export default Footer;
