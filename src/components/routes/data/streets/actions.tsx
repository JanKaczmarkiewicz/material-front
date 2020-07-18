import { gql } from "apollo-boost";

export const StreetFragment = gql`
  fragment StreetFragment on Street {
    id
    name
  }
`;

export const STREETS = gql`
  query Streets {
    streets {
      ...StreetFragment
    }
  }
  ${StreetFragment}
`;

export const UPDATE_STREET = gql`
  mutation UpdateStreet($input: UpdateStreetInput!) {
    updateStreet(input: $input) {
      ...StreetFragment
    }
  }
  ${StreetFragment}
`;
