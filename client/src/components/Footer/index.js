import React from "react";
import { IonToolbar } from "@ionic/react";

const Footer = () => {
  return (
    // Footer section containing contact and copyright information
    <footer>
      {/* IonToolbar for consistent styling and alignment */}
      <IonToolbar color="primary" className="ion-text-center">
        {/* Operating hours */}
        <p>Hours of Operation:</p>
        <p>Monday - Friday: 9am - 7pm</p>
        <p>Saturday: 9am - 6pm</p>
        <p>Sunday: 10am - 5pm</p>
        {/* Copyright notice */}
        <p>Copyright 2023 &#169; SnipSnap</p>
      </IonToolbar>
    </footer>
  );
};

export default Footer;
