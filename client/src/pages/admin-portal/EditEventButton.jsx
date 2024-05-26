"use client";

import React, { useRef } from "react";
import Button from "@mui/material/Button";
import DialogWithOwnState from "../../components/DialogWithOwnState";
import EditEventScreen from "./EditEventScreen";
import EditIcon from "@mui/icons-material/Edit";

const EditEventButton = ({ event, updateEvent }) => {
  const dialogRef = useRef();
  const handleClick = () => dialogRef.current.setOpen();
  const handleClose = () => dialogRef.current.setClose();
  return (
    <>
      <Button
        onClick={handleClick}
        sx={{ width: "max-content" }}
      >
        <EditIcon color="action" />
      </Button>
      <DialogWithOwnState
        ref={dialogRef}
        fullWidth
      >
        <EditEventScreen
          handleClose={handleClose}
          event={event}
          updateEvent={updateEvent}
        />
      </DialogWithOwnState>
    </>
  );
};

export default EditEventButton;
