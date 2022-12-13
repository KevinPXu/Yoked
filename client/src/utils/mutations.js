import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation Login($name: String!, $password: String!) {
    login(name: $name, password: $password) {
      token
      user {
        name
      }
    }
  }
`;