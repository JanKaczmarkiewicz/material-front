import { gql } from "apollo-boost";

export const EntranceHouseFragment = gql`
  fragment EntranceHouseFragment on House {
    id
    number
    street {
      id
      name
    }
  }
`;

export const RELOCATE_ENTRANCE = gql`
  mutation RelocateEntrance($id: String!, $to: String!) {
    updateEntrance(input: { id: $id, pastoralVisit: $to }) {
      id
    }
  }
`;

export const DAY = gql`
  query Day($input: FindOneInput!) {
    day(input: $input) {
      id
      unusedHouses {
        ...EntranceHouseFragment
      }
      reeceDate
      visitDate
      pastoralVisits {
        id
        priest {
          id
          username
        }
        entrances {
          id
          comment
          house {
            ...EntranceHouseFragment
          }
        }
      }
    }
  }
  ${EntranceHouseFragment}
`;
