import React from "react";
import {
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  CardHeader,
} from "@material-ui/core";
import { RouteComponentProps } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import {
  PastoralVisit as IPastoralVisit,
  PastoralVisitVariables,
} from "../../../../generated/PastoralVisit";
import PathCard from "./PathCard";

const PASTORAL_VISIT = gql`
  query PastoralVisit($input: FindOneInput!) {
    pastoralVisit(input: $input) {
      id
      priest {
        id
        username
      }
      acolytes {
        id
        username
      }
      visitTime
      entrances {
        id
        house {
          id
          number
        }
        visitState
        reeceState
        comment
      }
      reeceTime
      season {
        id
        year
      }
    }
  }
`;

type Props = RouteComponentProps<{
  id: string;
}>;

const PastoralVisit: React.FC<Props> = ({ match }) => {
  const { loading, error, data } = useQuery<
    IPastoralVisit,
    PastoralVisitVariables
  >(PASTORAL_VISIT, {
    variables: { input: { id: match.params.id } },
  });

  if (loading || !data) return <div>loading...</div>;
  if (error || data.pastoralVisit === null) return <div>error</div>;

  const { priest, reeceTime, visitTime, acolytes } = data.pastoralVisit;

  const reeceTimeDiplayDate = new Date(reeceTime).toLocaleString();
  const visitTimeDiplayDate = new Date(visitTime).toLocaleString();

  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={12} xs={12}>
          <Card variant="outlined">
            <CardHeader
              titleTypographyProps={{ variant: "h4" }}
              title={`Wyzyta duszpasterska`}
              subheader={`Na dzień: ${visitTimeDiplayDate}r.`}
            />

            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} lg={6}>
                  <Typography variant="subtitle2">
                    Ksiądz uczestniczący
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemText primary={priest?.username} />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Typography variant="subtitle2">
                    Ministranci uczestniczący
                  </Typography>
                  <List dense>
                    {acolytes.map((acolyte) => (
                      <ListItem>
                        <ListItemText primary={acolyte.username} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={6} xs={12}>
          <PathCard
            title="Zwiad"
            secondary={reeceTimeDiplayDate}
            image="https://ministranci-swantoni.weebly.com/uploads/8/1/3/5/81354392/published/modakoledowa-4.jpg?1483221006"
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <PathCard
            title="Kolenda"
            secondary={visitTimeDiplayDate}
            image="https://lh3.googleusercontent.com/proxy/nsyLNW9zvSkI_A88HPB07nVqX7yIn4dKjDcsA9GaVyONieQj6jY3XFJTigOiD1fViNhfQ8nIM4vf5-X9Xm7TiJXJBcIC-AYyRClgQy2v8SpPTwNITVkwpXWwCdMWwUYad9WJuzmxDOd39qEBmczptuDXKt-poF7tDHLa542PIVH6i8wSeni_yH1je83VD5yQ_GPUqGN48SWkuSQNSw_uDp4yCGY0g2tK56MO8S54oJGnD7gm1RxI5bgbh_INvTntJveefenY26mCHfxTH6sc"
          />
        </Grid>
      </Grid>
    </>
  );
};
export default PastoralVisit;
