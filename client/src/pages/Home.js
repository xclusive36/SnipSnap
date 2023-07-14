import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_SERVICES, QUERY_STYLISTS } from "../utils/queries";

import {
  IonDatetime,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonChip,
  IonAvatar,
} from "@ionic/react";

const Home = () => {
  const businessAdress = "1234 Main St. Anytown, USA 12345";
  const { loading: stylistLoading, data: stylistData } =
    useQuery(QUERY_STYLISTS);
  const { loading: serviceLoading, data: serviceData } =
    useQuery(QUERY_SERVICES);
  const [stylists, setStylists] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    if (stylistData) {
      setStylists(stylistData.stylists);
    }
  }, [stylistData]);

  useEffect(() => {
    if (serviceData) {
      setServices(serviceData.services);
    }
  }, [serviceData]);

  return (
    <>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Our Address: </IonCardTitle>
          {businessAdress}
        </IonCardHeader>
      </IonCard>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Our Stylists: </IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          {stylistLoading ? (
              <div>Loading Stylists...</div>
            ) : (
              stylists.map((stylist) => (
                <IonChip key={stylist._id}>
            <IonAvatar>
              <img
                alt="Silhouette of a person's head"
                src="https://ionicframework.com/docs/img/demos/avatar.svg"
              />
            </IonAvatar>
            <IonLabel>{stylist.stylistName}</IonLabel>
          </IonChip>
              ))
            )}
        </IonCardContent>
      </IonCard>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Our Services: </IonCardTitle>
          <IonList>
            {serviceLoading ? (
              <div>Loading Services...</div>
            ) : (
              services.map((service) => (
                <IonItem key={service._id}>
                  <IonLabel>{service.serviceName}: {service.servicePrice}</IonLabel>
                </IonItem>
              ))
            )}
          </IonList>
        </IonCardHeader>
      </IonCard>
      <IonCard>
        <IonCardHeader>
          <h2>Book Your Appointment Here!</h2>
        </IonCardHeader>
        <IonCardContent>
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
        </IonCardContent>
      </IonCard>
    </>
  );
};

export default Home;
