import { gql } from "apollo-boost";

export const StreetFragment = gql`
  fragment StreetFragment on Street {
    id
    name
  }
`;

export const STREETS = gql`
  query {
    streets {
      ...StreetFragment
    }
  }
  ${StreetFragment}
`;

export const UPDATE_STREET = gql`
  mutation updateStreet($input: UpdateStreetInput!) {
    updateStreet(input: $input) {
      ...StreetFragment
    }
  }
  ${StreetFragment}
`;
