import { gql } from 'apollo-angular';

export const GET_HOLIDAYS_GQL = gql`
  query GetHolidays ($tags: [String]!) {
    holidays (tags: $tags) {
      id
      title
      startAt
      endAt
      tags
    }
  }
`;

export const GET_HOLIDAY_GQL = gql`
  query GetHoliday ($id: ID!) {
    holiday (id: $id) {
      id
      title
      startAt
      endAt
      tags
    }
  }
`;
