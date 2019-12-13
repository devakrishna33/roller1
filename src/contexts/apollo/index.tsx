import ApolloClient from "apollo-boost";
import * as queries from "./queries";
import * as mutations from "./mutations";

const client = new ApolloClient({
  uri: "https://48p1r2roz4.sse.codesandbox.io"
});

export default client;
export { queries, mutations };
