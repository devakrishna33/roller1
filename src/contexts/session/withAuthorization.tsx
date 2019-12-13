import React, { useContext, ComponentClass, StatelessComponent } from "react";
import { Redirect } from "react-router-dom";
import AuthUserContext from "./";
import { AuthUserObject } from "../../interfaces/AuthUser";

export default (
  condition: (authUser: AuthUserObject | null) => boolean,
  redirect: string
) => (Component: ComponentClass | StatelessComponent) => (props: any) => {
  const authUser: AuthUserObject | null = useContext(AuthUserContext);
  if (!condition(authUser)) {
    return <Redirect to={redirect} />;
  }
  return <Component {...props} />;
};
