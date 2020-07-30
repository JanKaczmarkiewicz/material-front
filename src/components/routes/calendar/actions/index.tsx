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

export const EntranceFragment = gql`
  fragment EntranceFragment on Entrance {
    id
    comment
    house {
      ...EntranceHouseFragment
    }
  }
  ${EntranceHouseFragment}
`;

export const RELOCATE_ENTRANCE = gql`
  mutation RelocateEntrance($id: String!, $to: String!) {
    updateEntrance(input: { id: $id, pastoralVisit: $to }) {
      id
    }
  }
`;

export const ADD_ENTRANCE = gql`
  mutation AddEntrance($houseId: String!, $pastoralVisitId: String!) {
    addEntrance(input: { house: $houseId, pastoralVisit: $pastoralVisitId }) {
      ...EntranceFragment
    }
  }
  ${EntranceFragment}
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
      assignedStreets {
        id
        name
      }
      pastoralVisits {
        id
        priest {
          id
          username
        }
        entrances {
          ...EntranceFragment
        }
      }
    }
  }
  ${EntranceFragment}
`;
