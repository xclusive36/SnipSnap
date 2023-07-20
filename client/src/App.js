import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { IonPage, IonHeader, IonContent, IonFooter } from "@ionic/react";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Create the Apollo client with authentication middleware and a cache
const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    // Provide the Apollo client to the entire app using ApolloProvider
    <ApolloProvider client={client}>
      <Router>
        {/* Wrap the entire app with an IonPage to set up the Ionic page structure */}
        <IonPage>
          {/* Header component for the app */}
          <IonHeader>
            <Header />
          </IonHeader>
          {/* Main content of the app */}
          <IonContent className="ion-padding">
            {/* Define the app routes */}
            <Routes>
              {/* Home page route */}
              <Route path="/" element={<Home />} />
              {/* Login page route */}
              <Route path="/login" element={<Login />} />
              {/* Signup page route */}
              <Route path="/signup" element={<Signup />} />
              {/* User profile page route for the currently logged-in user */}
              <Route path="/me" element={<Profile />} />
              {/* User profile page route for other users */}
              <Route path="/profiles/:username" element={<Profile />} />
            </Routes>
          </IonContent>
          {/* Footer component for the app */}
          <IonFooter>
            <Footer />
          </IonFooter>
        </IonPage>
      </Router>
    </ApolloProvider>
  );
}

export default App;
