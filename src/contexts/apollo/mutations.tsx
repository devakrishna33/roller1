import gql from "graphql-tag";

export const SIGN_UP = gql`
  mutation($email: String!, $password: String!, $name: String!) {
    signUp(email: $email, password: $password, name: $name) {
      token
      user {
        id
      }
    }
  }
`;

export const SIGN_IN = gql`
  mutation($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      token
      user {
        id
      }
    }
  }
`;

export const CREATE_PROJECT = gql`
  mutation(
    $title: String!
    $description: String!
    $photo: String!
    $lng: Float!
    $lat: Float!
  ) {
    createProject(
      data: {
        title: $title
        description: $description
        photo: $photo
        location: { lng: $lng, lat: $lat }
      }
    ) {
      id
    }
  }
`;

export const EDIT_PROJECT = gql`
  mutation(
    $id: String!
    $title: String!
    $description: String!
    $photo: String!
  ) {
    editProject(
      id: $id
      data: { title: $title, description: $description, photo: $photo }
    ) {
      id
    }
  }
`;

export const DELETE_PROJECT = gql`
  mutation($id: String!) {
    deleteProject(id: $id) {
      id
    }
  }
`;

export const CREATE_GROUP = gql`
  mutation($id: String!, $name: String!, $projectId: String!) {
    createGroup(id: $id, name: $name, projectId: $projectId) {
      id
    }
  }
`;

export const CREATE_POINT = gql`
  mutation($parent: String, $project: String!, $lat: Float!, $lng: Float!) {
    createPoint(
      parent: $parent
      project: $project
      coordinate: { lat: $lat, lng: $lng }
    ) {
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
`;

export const MARK_PROJECT_COMPLETED = gql`
  mutation($id: String!) {
    markComplete(id: $id) {
      id
    }
  }
`;
