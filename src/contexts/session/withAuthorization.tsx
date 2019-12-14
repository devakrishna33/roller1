import React, { useContext, ComponentClass, StatelessComponent } from "react";
import { Redirect } from "react-router-dom";
import AuthUserContext from "./";
import { AuthUserObject } from "../../interfaces";

export default (
  condition: (authUser: AuthUserObject | null) => boolean,
  redirect: string
) => (Component: ComponentClass | StatelessComponent) => (props: any) => {
  const authUser: AuthUserObject | null = useContext(AuthUserContext);
  if (!condition(authUser)) {
    console.log(authUser);
    console.log("coming here");
    return <Redirect to={redirect} />;
  }
  return <Component {...props} />;
};
