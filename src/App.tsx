import React from "react";
import { hot } from "react-hot-loader";
import { ApolloProvider } from "@apollo/react-hooks";
import "./App.css";
import Navigation from "./components/Navigation";
import client from "./contexts/apollo";

export default hot(module)(() => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Navigation />
      </div>
    </ApolloProvider>
  );
});
