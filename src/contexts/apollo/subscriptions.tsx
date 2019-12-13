import gql from "graphql-tag";

export const ME_SUBSCRIPTION = gql`
  subscription {
    me {
      id
      name
    }
  }
`;
