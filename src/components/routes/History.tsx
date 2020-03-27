import React from "react";
import DataTable from "../Layout/DataTable/DataTable";
import request from "../../utils/request";

interface Props {}

const History: React.FC<Props> = props => {
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    request(
      `query{
          pastoralVisits {
            time
            priest{
              username
            }
            acolytes{
              username
            }
          }
}`,
      { useAuthorizationToken: true }
    ).then(res => {
      console.log(res);
      return setItems(res.data.pastoralVisits);
    });
  }, []);

  return (
    <>
      <DataTable
        title="Odbyte kolendy"
        items={items}
        config={{ time: { index: 1, label: "Czas" } }}
      />
    </>
  );
};

export default History;
