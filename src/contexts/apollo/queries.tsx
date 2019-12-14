import gql from "graphql-tag";

export const ME_QUERY = gql`
  {
    me {
      id
      name
      email
    }
  }
`;

export const ALL_PROJECTS = gql`
  {
    me {
      id
      projects {
        name
        id
        description
        thumbnail
        updatedAt
      }
    }
  }
`;
