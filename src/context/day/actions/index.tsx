import { gql } from "apollo-boost";

//fragments
export const StreetFragment = gql`
  fragment StreetFragment on Street {
    id
    name
  }
`;

export const HouseFragment = gql`
  fragment HouseFragment on House {
    id
    number
    street {
      ...StreetFragment
    }
  }
  ${StreetFragment}
`;

export const EntranceFragment = gql`
  fragment EntranceFragment on Entrance {
    id
    comment
    house {
      ...HouseFragment
    }
  }
  ${HouseFragment}
`;

export const BaseUserFragment = gql`
  fragment BaseUserFragment on User {
    id
    username
  }
`;
export const PastoralVisitFragment = gql`
  fragment PastoralVisitFragment on PastoralVisit {
    id
    priest {
      ...BaseUserFragment
    }
    acolytes {
      ...BaseUserFragment
    }
    hour
    entrances {
      ...EntranceFragment
    }
  }
  ${EntranceFragment}
  ${BaseUserFragment}
`;

// actions
export const CHANGE_ASSIGNED_STREETS = gql`
  mutation ChangeAssignedStreets(
    $id: String!
    $streets: [String]!
    $season: String!
  ) {
    updateDay(input: { id: $id, assignedStreets: $streets }) {
      assignedStreets {
        ...StreetFragment
        unusedHouses(season: $season) {
          ...HouseFragment
        }
      }
      pastoralVisits {
        ...PastoralVisitFragment
      }
    }
  }
  ${PastoralVisitFragment}
  ${StreetFragment}
  ${HouseFragment}
`;

export const DELETE_ENTRANCES = gql`
  mutation DeleteEntrances($input: DeleteManyInput!) {
    deleteEntrances(input: $input)
  }
`;

export const ADD_PASTORAL_VISIT = gql`
  mutation AddPastoralVisit($input: AddPastoralVisitInput!) {
    addPastoralVisit(input: $input) {
      ...PastoralVisitFragment
    }
  }
  ${PastoralVisitFragment}
`;

export const UPDATE_PASTORAL_VISIT = gql`
  mutation UpdatePastoralVisit($input: UpdatePastoralVisitInput!) {
    updatePastoralVisit(input: $input) {
      id
      priest {
        ...BaseUserFragment
      }
      acolytes {
        ...BaseUserFragment
      }
      hour
    }
  }
  ${BaseUserFragment}
`;

export const RELOCATE_ENTRANCES = gql`
  mutation RelocateEntrances($ids: [String!]!, $to: String!) {
    updateEntrances(input: { ids: $ids, pastoralVisit: $to }) {
      id
    }
  }
`;

export const ADD_ENTRANCES = gql`
  mutation AddEntrances($input: AddEntrancesInput!) {
    addEntrances(input: $input) {
      ...EntranceFragment
    }
  }
  ${EntranceFragment}
`;

export const DAY = gql`
  query Day($input: FindOneInput!, $season: String!) {
    day(input: $input) {
      id
      reeceDate
      visitDate
      assignedStreets {
        ...StreetFragment
        unusedHouses(season: $season) {
          ...HouseFragment
        }
      }
      pastoralVisits {
        ...PastoralVisitFragment
      }
    }
  }
  ${PastoralVisitFragment}
  ${EntranceFragment}
  ${StreetFragment}
`;
