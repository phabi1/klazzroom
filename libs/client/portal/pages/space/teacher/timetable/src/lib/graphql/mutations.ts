import { gql } from 'apollo-angular';

export const CREATE_TIMETABLE_GQL = gql`
  mutation createTimetable($input: CreateTimetableInput!) {
    createTimetable(input: $input) {
      id
      title
    }
  }
`;

export const UPDATE_TIMETABLE_GQL = gql`
  mutation updateTimetable($input: UpdateTimetableInput!) {
    updateTimetable(input: $input) {
      id
      title
    }
  }
`;

export const DELETE_TIMETABLE_GQL = gql`
  mutation deleteTimetable($id: ID!) {
    deleteTimetable(id: $id)
  }
`;
