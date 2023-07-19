import React from "react";
import { IonToolbar } from "@ionic/react";

const Footer = () => {
  return (
    <footer>
      <IonToolbar className="ion-text-center">Hours of Operation:</IonToolbar>
      <IonToolbar className="ion-text-center">Monday - Friday: 9am - 7pm</IonToolbar>
      <IonToolbar className="ion-text-center">Saturday: 9am - 6pm</IonToolbar>
      <IonToolbar className="ion-text-center">Sunday: 10am - 5pm</IonToolbar>
      <IonToolbar className="ion-text-center">Copyright 2023 &#169; SnipSnap</IonToolbar>
    </footer>
  );
};

export default Footer;
