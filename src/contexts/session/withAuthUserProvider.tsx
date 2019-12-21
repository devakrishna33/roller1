import React, { ComponentClass, StatelessComponent } from "react";
import { useSubscription, useQuery } from "@apollo/react-hooks";
import { ME_QUERY } from "../apollo/queries";
import { ME_SUBSCRIPTION } from "../apollo/subscriptions";
import AuthUserContext from "./context";

export default (Component: ComponentClass | StatelessComponent) => (
  props: any
) => {
  const { data: queryData } = useQuery(ME_QUERY);
  const { data: subscriptionData } = useSubscription(ME_SUBSCRIPTION);
  // const userJson = localStorage.getItem("authUser") || "";
  // console.log(userJson);
  // const authUser =
  //   subscriptionData?.me || queryData?.me || userJson
  //     ? JSON.parse(userJson)
  //     : null;
  const authUser = null;
  return (
    <AuthUserContext.Provider value={authUser}>
      <Component {...props} />
    </AuthUserContext.Provider>
  );
};
