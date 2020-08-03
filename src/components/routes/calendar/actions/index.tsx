import { gql } from "apollo-boost";

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

export const PastoralVisitFragment = gql`
  fragment PastoralVisitFragment on PastoralVisit {
    id
    priest {
      id
      username
    }
    entrances {
      ...EntranceFragment
    }
  }
  ${EntranceFragment}
`;

export const DELETE_ENTRANCE = gql`
  mutation DeleteEntrance($input: DeleteOneInput!) {
    deleteEntrance(input: $input) {
      id
    }
  }
`;

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
