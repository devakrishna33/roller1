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
  mutation($name: String!) {
    createProject(name: $name) {
      id
    }
  }
`;

export const EDIT_PROJECT = gql`
  mutation(
    $id: String!
    $name: String!
    $description: String
    $thumbnail: String
  ) {
    editProject(
      id: $id
      data: { name: $name, description: $description, thumbnail: $thumbnail }
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
