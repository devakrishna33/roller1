import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createUploadLink } from "apollo-upload-client";

const authMiddleware = new ApolloLink((operation, forward) => {
  const authToken = localStorage.getItem("authToken");
  console.log(authToken);
  if (authToken) {
    operation.setContext({
      headers: {
        authorization: `Bearer ${authToken || ""}`
      }
    });
  }

  return forward(operation);
});

let uri = "http://localhost:4000/";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([authMiddleware, createUploadLink({ uri })]),
  defaultOptions: {
    query: {
      errorPolicy: "all"
    },
    mutate: {
      fetchPolicy: "network-only",
      errorPolicy: "all"
    },
    watchQuery: {
      fetchPolicy: "cache-and-network",
      errorPolicy: "ignore"
    }
  }
});

export default client;
