import { gql } from 'apollo-angular';

export const GET_DOMAINS_GQL = gql`
  query GetDomains {
    skillDomains {
      id
      title
      color
    }
  }
`;

export const GET_DOMAIN_GQL = gql`
  query GetDomain($id: ID!) {
    skillDomain(id: $id) {
      id
      title
      color
    }
  }
`;

export const GET_ITEMS_GQL = gql`
  query GetItems($domain: ID!) {
    skillItemsByDomain(domain: $domain) {
      id
      title
    }
  }
`;

export const GET_ITEM_GQL = gql`
  query GetItem($id: ID!) {
    skillItem(id: $id) {
      id
      title
    }
  }
`;
