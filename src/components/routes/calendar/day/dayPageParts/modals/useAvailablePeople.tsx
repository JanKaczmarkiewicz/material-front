import { useQuery } from "@apollo/react-hooks";
import { useDayContext } from "../../../../../../context/day/DayContext";
import { BaseUserFragment } from "../../../../../../context/day/actions";
import { gql } from "@apollo/client";
import { AllUsers } from "../../../../../../generated/AllUsers";

const USERS = gql`
  query AllUsers {
    priests: users(input: { role: PRIEST }) {
      ...BaseUserFragment
    }
    acolytes: users(input: { role: ACOLYTE }) {
      ...BaseUserFragment
    }
  }
  ${BaseUserFragment}
`;

export const useAvailablePeople = (
  acolytesToInclude: string[],
  priestsToInclude: string[]
) => {
  const { loading, error, data } = useQuery<AllUsers>(USERS);

  const { day } = useDayContext();

  const inUseAcolytesIds = day.pastoralVisits.flatMap(({ acolytes }) =>
    acolytes.map(({ id }) => id).filter((id) => !acolytesToInclude.includes(id))
  );

  const inUsePriestsIds = day.pastoralVisits
    .map(({ priest }) => priest?.id!)
    .filter(Boolean)
    .filter((id) => !acolytesToInclude.includes(id!));

  if (!data) {
    return { loading, error, data };
  }

  const { priests: allPriests, acolytes: allAcolytes } = data;

  const availableAcolytes = allAcolytes.filter(
    ({ id }) => !inUseAcolytesIds.includes(id)
  );

  const availablePriests = allPriests.filter(
    ({ id }) => !inUsePriestsIds.includes(id)
  );

  return { loading, error, data: { availableAcolytes, availablePriests } };
};
