import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/react-hooks";
import { Grid, Typography, Paper } from "@material-ui/core";

import {
  Street as IStreet,
  StreetVariables,
} from "../../../../generated/Street";

import DataTable from "../../../Layout/DataTable/EditableDataTable";
import MainContainer from "../../../Layout/container/MainContainer";

type Props = RouteComponentProps<{
  id: string;
}>;

const STREET = gql`
  query Street($input: FindOneInput!) {
    street(input: $input) {
      id
      houses {
        id
        number
      }
      name
    }
  }
`;

const Street: React.FC<Props> = ({ match }) => {
  const { loading, data, error } = useQuery<IStreet, StreetVariables>(STREET, {
    variables: { input: { id: match.params.id } },
  });

  if (loading || !data) return <div>loading...</div>;
  if (error || !data.street) return <div>error</div>;

  const { name, houses, id } = data.street;
  return (
    <MainContainer>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h3" component="h1" color="primary">
            {name}
          </Typography>
        </Grid>
        <Grid item xs={12} lg={8}>
          <Paper>(TODO: MAPA GOOGLE)</Paper>
        </Grid>

        <Grid item xs={12} lg={4}>
          <DataTable
            items={houses}
            title="Domy"
            config={{
              number: { index: 0, label: "Numer" },
            }}
            sanitize={({ id, number }) => ({ id, number })}
          />
        </Grid>
      </Grid>
    </MainContainer>
  );
};

export default Street;
