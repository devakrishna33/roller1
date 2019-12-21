import React from "react";
import { hot } from "react-hot-loader";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ROUTES } from "./constants";
import "./styles/app.less";
import "./App.css";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import NewProject from "./components/NewProject";
import AllProjects from "./components/AllProjects";
import HeatMap from "./components/HeatMap";
import Trending from "./components/Trending";
import { withAuthUserProvider } from "./contexts/session";

export default withAuthUserProvider(
  hot(module)(() => (
    <div className="App">
      <Router>
        <Switch>
          <Route path={ROUTES.HOME} component={Home} exact />
          <Route path={ROUTES.SIGN_IN} component={SignIn} />
          <Route path={ROUTES.SIGN_UP} component={SignUp} />
          <Route path={ROUTES.NEW_PROJECT} component={NewProject} />
          <Route path={ROUTES.ALL_PROJECTS} component={AllProjects} />
          <Route path={ROUTES.HEAT_MAP} component={HeatMap} />
          <Route path={ROUTES.TRENDING} component={Trending} />
        </Switch>
      </Router>
    </div>
  ))
);
