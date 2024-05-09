import { gql } from 'apollo-angular';

export const GET_COURSE_GQL = gql`
  query GetGourse($id: ID!) {
    grades {
      id
      title
    }
    course(id: $id) {
      id
      days
      grades {
        id
      }
    }
  }
`;
