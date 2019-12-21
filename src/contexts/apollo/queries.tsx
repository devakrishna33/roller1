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
    }
  }
`;

export const GET_PROJECT = gql`
  query($id: String!) {
    getProject(id: $id) {
      id
      annotations {
        name
        id
        isLeaf
      }
      points {
        id
        name
        color
        description
        coordinate {
          lng
          lat
        }
        size
      }
    }
  }
`;

export const GET_ANNOTATION = gql`
  query($id: String!) {
    getAnnotation(id: $id) {
      id
      name
      parent {
        id
      }
      isLeaf
      points {
        id
        name
        color
        description
        coordinate {
          lng
          lat
        }
        size
      }
    }
  }
`;
