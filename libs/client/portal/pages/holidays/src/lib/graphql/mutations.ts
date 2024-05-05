import { gql } from 'apollo-angular';

export const CREATE_HOLIDAY_GQL = gql`
  mutation CreateHoliday($input: CreateHolidayInput!) {
    createHoliday(data: $input) {
      id
      title
      startAt
      endAt
      tags
    }
  }
`;

export const UPDATE_HOLIDAY_GQL = gql`
  mutation UpdateHoliday($id: ID!, $input: UpdateHolidayInput!) {
    updateHoliday(id: $id, data: $input) {
      id
      title
      startAt
      endAt
      tags
    }
  }
`;

export const DELETE_HOLIDAY_GQL = gql`
  mutation DeleteHoliday($id: ID!) {
    deleteHoliday(id: $id) {
      id
      title
      startAt
      endAt
      tags
    }
  }
`;
