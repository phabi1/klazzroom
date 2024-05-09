import { gql } from "apollo-angular";

export const GET_TIMETABLES_GQL = gql`
  query getTimetables ($tags: [String]!) {
    timetables (tags: $tags) {
      id
      title
    }
  }
`;

export const GET_TIMETABLE_GQL = gql`
  query getTimetable($id: ID!) {
    timetable(id: $id) {
      id
      title
      events {
        id
        title
        start
        end
      }
    }
  }
`;
