import React from "react";
import { hot } from "react-hot-loader";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ROUTES } from "./constants";
import "./styles/app.less";
import "./App.css";
import Navigation from "./components/Navigation";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import Project from "./components/Project";
import NewProject from "./components/NewProject";
import AllProjects from "./components/AllProjects";
import { withAuthUserProvider } from "./contexts/session";

export default withAuthUserProvider(
  hot(module)(() => (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route path={ROUTES.HOME} component={Home} exact />
          <Route path={ROUTES.SIGN_IN} component={SignIn} />
          <Route path={ROUTES.SIGN_UP} component={SignUp} />
          <Route path={ROUTES.PROJECT} component={Project} />
          <Route path={ROUTES.NEW_PROJECT} component={NewProject} />
          <Route path={ROUTES.ALL_PROJECTS} component={AllProjects} />
        </Switch>
      </Router>
    </div>
  ))
);
