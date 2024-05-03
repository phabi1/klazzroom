import { gql } from 'apollo-angular';

export const CREATE_DOMAIN_GQL = gql`
  mutation CreateDomain($input: CreateSkillDomainInput!) {
    createSkillDomain(data: $input) {
      id
      title
      color
    }
  }
`;

export const UPDATE_DOMAIN_GQL = gql`
  mutation UpdateDomain($id: ID!, $input: UpdateSkillDomainInput!) {
    updateSkillDomain(id: $id, data: $input) {
      id
      title
      color
    }
  }
`;

export const DELETE_DOMAIN_GQL = gql`
  mutation DeleteDomain($id: ID!) {
    deleteSkillDomain(id: $id)
  }
`;

export const CREATE_ITEM_GQL = gql`
  mutation CreateItem($input: CreateSkillItemInput!) {
    createSkillItem(data: $input) {
      id
      title
    }
  }
`;

export const UPDATE_ITEM_GQL = gql`
  mutation UpdateItem($id: ID!, $input: UpdateSkillItemInput!) {
    updateSkillItem(id: $id, data: $input) {
      id
      title
    }
  }
`;

export const DELETE_ITEM_GQL = gql`
  mutation DeleteItem($id: ID!) {
    deleteSkillItem(id: $id)
  }
`;
