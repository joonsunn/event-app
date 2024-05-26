"use client";

import React, { useRef } from "react";
import Button from "@mui/material/Button";
import DialogWithOwnState from "../DialogWithOwnState";
import CreateEventScreen from "./CreateEventScreen";

const CreateEventButton = () => {
  const dialogRef = useRef();
  const handleClick = () => dialogRef.current.setOpen();
  const handleClose = () => dialogRef.current.setClose();
  return (
    <>
      <Button
        onClick={handleClick}
        // primary={+false as unknown as boolean}
        variant="contained"
        sx={{ width: "max-content" }}
      >
        Create Event
      </Button>
      <DialogWithOwnState
        ref={dialogRef}
        fullWidth
      >
        <CreateEventScreen handleClose={handleClose} />
      </DialogWithOwnState>
    </>
  );
};

export default CreateEventButton;
