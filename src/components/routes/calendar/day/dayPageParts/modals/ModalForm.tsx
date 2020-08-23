import React from "react";
import {
  Modal,
  Paper,
  Typography,
  Button,
  makeStyles,
} from "@material-ui/core";

interface Props {
  open: boolean;
  headerText: string;
  secondaryText?: string;
  submitText: string;
  children: React.ReactElement | (React.ReactNode | null | undefined)[];
  disableMessage?: string | React.ReactNode | React.ReactNode[];
  onModalClose: () => void;
  onFormSubmit: () => void;
}

const ModalForm = (props: Props) => {
  const {
    children,
    secondaryText,
    headerText,
    submitText,
    open,
    disableMessage,
    onModalClose,
    onFormSubmit,
  } = props;

  const classes = useStyles();

  const activeContent = (
    <>
      <Typography variant={"h4"}>{headerText}</Typography>
      {secondaryText && (
        <Typography variant={"body2"}>{secondaryText}</Typography>
      )}
      {children}
      <Button
        color={"primary"}
        variant={"contained"}
        className={classes.submitButton}
        size={"large"}
        onClick={onFormSubmit}
      >
        {submitText}
      </Button>
    </>
  );

  const content = disableMessage ? disableMessage : activeContent;

  return (
    <Modal open={open} onClose={onModalClose}>
      <Paper className={classes.modalContent}>{content}</Paper>
    </Modal>
  );
};

const useStyles = makeStyles((theme) => ({
  modalContent: {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
    position: "absolute",
    width: 400,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2),
    outline: 0,
    display: "flex",
    flexDirection: "column",
  },
  submitButton: {
    margin: theme.spacing(2, "auto"),
  },
}));

export default ModalForm;
