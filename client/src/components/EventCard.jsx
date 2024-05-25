import { Box, Button, Typography, useTheme } from "@mui/material";
import React, { useRef } from "react";
import DialogWithOwnState from "./DialogWithOwnState";

const EventCard = ({ event }) => {
  const theme = useTheme();

  const dialogRef = useRef();
  const handleClick = () => dialogRef.current.setOpen();
  const handleClose = () => dialogRef.current.setClose();
  return (
    <>
      <Box
        component={"div"}
        sx={{
          //   maxWidth: "48%",
          height: "150px",
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.secondary,
          padding: "8px",
          //   margin: "auto",
          borderRadius: "8px",
          cursor: "pointer",
          "&:hover": {
            boxShadow: "0 0 8px 0 rgba(187, 178, 178, 0.562)",
          },
        }}
        onClick={handleClick}
      >
        <Typography>Event name: {event.name}</Typography>
        <Typography>Organised by : {event.organiser}</Typography>
        <Typography>Description: {event.description}</Typography>
      </Box>
      <DialogWithOwnState ref={dialogRef}>
        <Box>Event Card</Box>
      </DialogWithOwnState>
    </>
  );
};

export default EventCard;
