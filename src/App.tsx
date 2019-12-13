import React from "react";
import { hot } from "react-hot-loader";
import "./App.css";
import Navigation from "./components/Navigation";

export default hot(module)(() => {
  return (
    <div className="App">
      <Navigation />
    </div>
  );
});
