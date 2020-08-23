import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { gql } from "@apollo/client";
import {
  PastoralVisitDetails as IPastoralVisitDetails,
  PastoralVisitDetailsVariables,
} from "../../../../generated/PastoralVisitDetails";
import { useQuery } from "@apollo/react-hooks";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  List,
  ListItemSecondaryAction,
  IconButton,
  Avatar,
  Modal,
} from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import StateStyles from "./StateStyles";
import EditEntranceModal from "./EditEntranceModal";

type Props = RouteComponentProps<{ id: string }> & {
  variant: "reece" | "visit";
};

const PASTORAL_VISIT_DETAILS = gql`
  query PastoralVisitDetails($input: FindOneInput!) {
    pastoralVisit(input: $input) {
      priest {
        username
      }
      day {
        reeceDate
        visitDate
      }
      hour
      entrances {
        id
        reeceState
        visitState
        comment
        house {
          number
        }
      }
    }
  }
`;

const EntranceList = ({ variant, match }: Props) => {
  const id = match.params.id;

  const [editedEntirenceId, setEditedEntirenceId] = React.useState<
    string | null
  >(null);

  const { loading, error, data } = useQuery<
    IPastoralVisitDetails,
    PastoralVisitDetailsVariables
  >(PASTORAL_VISIT_DETAILS, { variables: { input: { id } } });

  if (loading || !data) return <div>loading...</div>;
  if (error || !data.pastoralVisit) return <div>error</div>;

  return (
    <>
      {editedEntirenceId !== null && (
        <Modal open onClose={() => setEditedEntirenceId(null)}>
          <EditEntranceModal id={editedEntirenceId} />
        </Modal>
      )}
      <List>
        {data.pastoralVisit.entrances.map(
          ({ reeceState, visitState, comment, house, id }) => {
            const { icon, backgroundColor } = StateStyles(
              variant === "visit" ? visitState : reeceState
            );
            return (
              <ListItem key={id}>
                <ListItemAvatar>
                  <Avatar style={{ backgroundColor }}>{icon}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={house?.number}
                  secondary={comment ?? null}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => setEditedEntirenceId(id)}
                  >
                    <Edit />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          }
        )}
      </List>
    </>
  );
};

export default EntranceList;
