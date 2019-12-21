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
    projects {
      title
      id
      description
      photo
      updatedAt
      status
    }
  }
`;

export const TRENDING_PROJECTS = gql`
  {
    projects {
      title
      id
      description
      photo
      updatedAt
      status
    }
  }
`;

export const GET_LOCATIONS = gql`
  {
    getLocations {
      id
      location {
        lat
        lng
      }
      numberOfSerious
    }
  }
`;
