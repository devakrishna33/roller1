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

  const authUser =
    subscriptionData?.me ||
    queryData?.me ||
    JSON.parse(localStorage.getItem("authUser") || "{}");

  console.log(queryData);

  return (
    <AuthUserContext.Provider
      value={{
        ...authUser
      }}
    >
      <Component {...props} />
    </AuthUserContext.Provider>
  );
};
