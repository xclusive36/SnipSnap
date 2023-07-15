import React, { useState, useEffect } from "react";
import Auth from "../utils/auth";
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
  IonText,
  IonSelect,
  IonSelectOption,
  IonButton,
} from "@ionic/react";

const Home = () => {
  const businessAdress = "1234 Main St. Anytown, USA 12345";
  const { loading: stylistLoading, data: stylistData } =
    useQuery(QUERY_STYLISTS);
  const { loading: serviceLoading, data: serviceData } =
    useQuery(QUERY_SERVICES);
  const [stylists, setStylists] = useState([]);
  const [services, setServices] = useState([]);

  const isWeekday = (dateString) => {
    // Checks if date is a weekday
    const date = new Date(dateString);
    const utcDay = date.getUTCDay();
    return utcDay !== 0 && utcDay !== 6;
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted!");
  };

  return (
    <>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Our Address: </IonCardTitle>
        </IonCardHeader>
        <IonCardContent>{businessAdress}</IonCardContent>
      </IonCard>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Our Stylists: </IonCardTitle>
        </IonCardHeader>
        <IonCardContent className="ion-text-center">
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
        </IonCardHeader>
        <IonCardContent>
          <IonList>
            {serviceLoading ? (
              <div>Loading Services...</div>
            ) : (
              services.map((service) => (
                <IonItem key={service._id}>
                  <IonLabel>{service.serviceName}</IonLabel>
                  <IonText slot="end">{service.servicePrice}</IonText>
                </IonItem>
              ))
            )}
          </IonList>
        </IonCardContent>
      </IonCard>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Book Your Appointment Here!</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <form onSubmit={handleSubmit}>
            <IonList>
              <IonItem>
                <IonSelect
                  label="Select a service"
                  labelPlacement="floating"
                  disabled={Auth.loggedIn() ? false : true}
                >
                  {serviceLoading ? (
                    <div>Loading Services...</div>
                  ) : (
                    services.map((service) => (
                      <IonSelectOption key={service._id}>
                        {service.serviceName}
                      </IonSelectOption>
                    ))
                  )}
                </IonSelect>
              </IonItem>
              <IonItem className="ion-padding-top ion-padding-bottom">
                <IonDatetime
                  minuteValues="0,30"
                  isDateEnabled={isWeekday}
                  mode="md"
                  readonly={Auth.loggedIn() ? false : true}
                ></IonDatetime>
              </IonItem>
              <IonButton
                type="submit"
                expand="block"
                disabled={Auth.loggedIn() ? false : true}
              >
                {Auth.loggedIn() ? "Book Now!" : "Login to Book!"}
              </IonButton>
            </IonList>
          </form>
        </IonCardContent>
      </IonCard>
    </>
  );
};

export default Home;
