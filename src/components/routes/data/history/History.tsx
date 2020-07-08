import React from "react";
import DataTable from "../../../Layout/DataTable/EditableDataTable";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { PastoralVisits as IPastoralVisits } from "../../../../generated/PastoralVisits";

const PastoralVisits = gql`
  query PastoralVisits {
    pastoralVisits(input: {}) {
      id
      reeceTime
      visitTime
      priest {
        username
      }
      acolytes {
        username
      }
    }
  }
`;

const History: React.FC = () => {
  const { loading, error, data } = useQuery<IPastoralVisits>(PastoralVisits);

  if (loading || !data) return <div>loading</div>;
  if (error) return <div>error</div>;

  return (
    <>
      <DataTable
        title="Odbyte kolendy"
        items={data.pastoralVisits}
        link={"/data/history/"}
        sanitize={({ id, reeceTime, visitTime, priest, acolytes }) => ({
          id,
          reeceTime,
          acolytes,
          priest,
          visitTime,
        })}
        config={{
          reeceTime: {
            index: 0,
            label: "Czas zwiadu:",
          },
          visitTime: {
            index: 1,
            label: "Czas wizyty:",
          },
          priest: {
            index: 2,
            label: "Ksiądz:",
            displayValue: (priest) => priest?.username || "",
          },
          acolytes: {
            index: 3,
            label: "Ministrańci:",
            displayValue: (acolytes) =>
              acolytes.map((acolyte) => acolyte.username).join(", "),
          },
        }}
      />
    </>
  );
};

export default History;
