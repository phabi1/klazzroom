import { gql } from "apollo-angular";

export const CREATE_STICKY_GQL = gql`
  mutation createSticky($input: CreateStickyInput!) {
    createSticky(input: $input) {
      id
      title
    }
  }
`;

export const UPDATE_STICKY_GQL = gql`
  mutation updateSticky($id: ID!, $input: UpdateStickyInput!) {
    updateSticky(id: $id, input: $input) {
      id
      title
    }
  }
`;

export const REMOVE_STICKY_GQL = gql`
  mutation removeSticky($id: ID!) {
    removeSticky(id: $id) {
      id
      title
    }
  }
`;