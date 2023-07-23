import React, { useState, useEffect } from "react";
import Auth from "../utils/auth";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_SERVICES, QUERY_STYLISTS } from "../utils/queries";
import { ADD_APPOINTMENT } from "../utils/mutations";
import Logo from "../images/SnipSnap.jpg";

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
  IonToast,
  IonImg,
} from "@ionic/react"; // Import Ionic components.

const Home = () => {
  // Begin Home Page component.
  const [isOpen, setIsOpen] = useState(false);
  const businessAdress = "1234 Main St. Anytown, USA 12345"; // Define business address.
  const { loading: stylistLoading, data: stylistData } =
    useQuery(QUERY_STYLISTS); // GraphQL query for stylists.
  const { loading: serviceLoading, data: serviceData } =
    useQuery(QUERY_SERVICES); // GraphQL query for services.
  const [addAppointment] = useMutation(ADD_APPOINTMENT); // GraphQL mutation for appointments.
  const [stylists, setStylists] = useState([]); // Set initial state for stylists array.
  const [services, setServices] = useState([]); // Set initial state for services array.

  const isWeekday = (dateString) => {
    // Checks if date is a weekday for the calendar.
    // Returns true if it is a weekday, false if it is not.
    // That way, we can disable weekends on the calendar.
    const date = new Date(dateString); // Create a new date object.
    const utcDay = date.getUTCDay(); // Get the UTC day of the week.
    return utcDay !== 0 && utcDay !== 6; // Return true if it is not a weekend.
  };

  useEffect(() => {
    // useEffect hook to set state for stylists.
    if (stylistData) {
      // If stylistData is available, then...
      setStylists(stylistData.stylists); // Set the state for stylists.
    }
  }, [stylistData]); // Run this hook when stylistData changes.

  useEffect(() => {
    // useEffect hook to set state for services.
    if (serviceData) {
      // If serviceData is available, then...
      setServices(serviceData.services); // Set the state for services.
    }
  }, [serviceData]); // Run this hook when serviceData changes.

  const handleSubmit = (e) => {
    // Handle form submission.
    e.preventDefault(); // Prevent default form submission.

    const headers = {
      // define headers variable for simplicity
      headers: {
        // define headers
        Authorization: `Bearer ${Auth.getToken()}`, // set Authorization to Bearer token
      },
    };

    const token = Auth.loggedIn() ? Auth.getToken() : null; // define token variable as Auth.loggedIn() ? Auth.getToken() : null

    if (!token) {
      // if token is null
      return false; // return false
    }

    try {
      // try
      const customerName = Auth.getProfile().data.username; // Get the customer name from the Auth object.
      const appointmentType = e.target[0].value; // Get the appointment type from the form.
      const serviceId = e.target[1].value; // Get the service ID from the form.
      let appointmentDateAndTime = e.target[2].value; // Get the appointment date from the form.
      appointmentDateAndTime = appointmentDateAndTime.split("T"); // Split the date and time string into an array.
      const appointmentDate = appointmentDateAndTime[0]; // Get the appointment date from the array.
      const appointmentTime = appointmentDateAndTime[1].substring(
        0,
        appointmentDateAndTime[1].length - 3
      ); // Get the appointment time from the array and remove the seconds.
      let appointmentCost = services.find(
        (service) => service.serviceName === appointmentType
      ); // Get the appointment cost from the services array.
      appointmentCost = appointmentCost.servicePrice;

      addAppointment({
        // Add the appointment to the database using the variables from the form.
        // The variables are defined in the ADD_APPOINTMENT mutation in client/src/utils/mutations.js.
        variables: {
          customerName: customerName,
          stylistName: serviceId,
          appointmentDate: appointmentDate,
          appointmentTime: appointmentTime,
          appointmentType: appointmentType,
          appointmentCost: appointmentCost,
        },
        context: headers, // set context to headers
      });
      setIsOpen(true);
      console.log("Appointment added!"); // console.log("Appointment added!")
    } catch (err) {
      // catch
      console.error(err); // console.error(err)
    }
  };

  return (
    <>
      <IonImg className="imgpadding" src={Logo}></IonImg>
      <IonCard>
        <IonCardHeader color="secondary">
          <IonCardTitle>Our Stylists: </IonCardTitle>
        </IonCardHeader>
        <IonCardContent className="ion-text-center">
          <div className="ion-padding">
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
          </div>
        </IonCardContent>
      </IonCard>
      <IonCard>
        <IonCardHeader color="secondary">
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
        <IonCardHeader color="secondary">
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
              <IonItem>
                <IonSelect
                  label="Select a stylist"
                  labelPlacement="floating"
                  disabled={Auth.loggedIn() ? false : true}
                >
                  {stylistLoading ? (
                    <div>Loading Stylists...</div>
                  ) : (
                    stylists.map((stylist) => (
                      <IonSelectOption key={stylist._id}>
                        {stylist.stylistName}
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
                {Auth.loggedIn() ? "Book Now!" : "Sign up / Log in to Book!"}
              </IonButton>
              <IonToast
                isOpen={isOpen}
                message="Your Appointment was booked!"
                onDidDismiss={() => setIsOpen(false)}
                duration={5000}
              ></IonToast>
            </IonList>
          </form>
        </IonCardContent>
      </IonCard>
      <IonText className="ion-text-center ion-padding-top">
        <IonCardTitle className="ion-padding-top">Our Address:</IonCardTitle>
        {/* Business address */}
        <p>{businessAdress}</p>
        {/* Operating hours */}
        <IonCardTitle className="ion-padding-top">Hours of Operation:</IonCardTitle>
        <p>Monday - Friday: 9am - 7pm</p>
        <p>Saturday: 9am - 6pm</p>
        <p>Sunday: 10am - 5pm</p>
      </IonText>
    </>
  );
};

export default Home;
