import { gql } from '@apollo/client';

export const QUERY_TEMP = gql`
  query templates {
    templates {
      exercises {
        _id
        name
      }
    }
  }
`;
