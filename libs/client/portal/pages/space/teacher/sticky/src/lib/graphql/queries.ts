import { gql } from 'apollo-angular';

export const GET_STICKIES_GQL = gql`
  query getStickies($tags: [String]!) {
    stickies(tags: $tags) {
      id
      title
    }
  }
`;

export const GET_STICKY_GQL = gql`
  query getSticky($id: ID!) {
    sticky(id: $id) {
      id
      title
      data
    }
  }
`;
