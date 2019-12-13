import React from "react";
import { hot } from "react-hot-loader";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ROUTES } from "./constants";
import "./App.css";
import Navigation from "./components/Navigation";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import client from "./contexts/apollo";

export default hot(module)(() => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Router>
          <Navigation />
          <Switch>
            <Route path={ROUTES.HOME} component={Home} exact />
            <Route path={ROUTES.SIGN_IN} component={SignIn} />
            <Route path={ROUTES.SIGN_UP} component={SignUp} />
          </Switch>
        </Router>
      </div>
    </ApolloProvider>
  );
});
