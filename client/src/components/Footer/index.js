import React from "react";
import { IonToolbar } from "@ionic/react";

const Footer = () => {
  return (
    // Footer section containing contact and copyright information
    <footer>
      {/* IonToolbar for consistent styling and alignment */}
      <IonToolbar color="primary" className="ion-text-center">
        {/* Copyright notice */}
        <p>Copyright 2023 &#169; SnipSnap</p>
      </IonToolbar>
    </footer>
  );
};

export default Footer;
