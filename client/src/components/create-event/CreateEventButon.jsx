"use client";

import React, { useRef } from "react";
// import StyledButton, { StyledButton2 } from "../../../components/StyledButton";
// import DialogWithOwnState from "../../../components/ui/DialogWithOwnState";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DialogWithOwnState from "../DialogWithOwnState";
import { UserContext } from "../../context/UserContextProvider";
import { useContext } from "react";
import CreateEventScreen from "./CreateEventScreen";

const CreateEventButton = () => {
  //   const { user, setUser } = useContext(UserContext);
  //   const handleLogout = () => {
  //     setUser({});
  //     localStorage.clear();
  //     window.location.href = "/";
  //   };

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
      <DialogWithOwnState ref={dialogRef}>
        <CreateEventScreen handleClose={handleClose} />
      </DialogWithOwnState>
    </>
  );
};

export default CreateEventButton;
