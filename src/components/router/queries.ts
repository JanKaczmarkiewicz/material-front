import { gql } from "apollo-boost";

export const AUTH = gql`
  query AuthCheck {
    me {
      confirmed
    }
  }
`;
