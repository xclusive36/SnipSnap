import React from "react";

import { IonDatetime } from "@ionic/react";

const Home = () => {
  return (
    <div>
      <div className="book-here">
        <h2>Book Your Appointment Here!</h2>
      </div>
      <div className="info-input">
        <label htmlFor="info-input">Enter name and email:</label>
        <input type="text" id="name" name="Name" />
        <input type="text" id="email" name="Email" />
      </div>
      <div className="services">
        <label htmlFor="services">Select a service:</label>
        <button className="service-btn">Haircut</button>
        <button className="service-btn">Color</button>
        <button className="service-btn">Perm</button>
        <button className="service-btn">Extensions</button>
        <button className="service-btn">Style</button>
      </div>
      <IonDatetime
        value="2023-12-31T09:00"
        min="2023-07-13T09:00"
        max="2023-12-30T20:00"
      ></IonDatetime>
    </div>
  );
};

export default Home;
