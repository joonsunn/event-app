import { Box, Chip, Typography, useTheme } from "@mui/material";
import React, { useRef } from "react";
import DialogWithOwnState from "../DialogWithOwnState";
import EventDialog from "./EventDialog";
import { timeFormatter } from "../../utils/timeUtils";

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
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.secondary,
          padding: "16px",
          borderRadius: "8px",
          cursor: "pointer",
          "&:hover": {
            boxShadow: "0 0 8px 0 rgba(187, 178, 178, 0.562)",
          },
          overflow: "hidden",
        }}
        onClick={handleClick}
      >
        <Box sx={{ marginBottom: "8px" }}>
          <Typography
            fontWeight={"bold"}
            fontSize={"18px"}
          >
            {event.name}
          </Typography>
          <Typography
            fontWeight={"bold"}
            fontSize={"14px"}
          >{`${new Date(event.eventDate).toDateString()} ${timeFormatter(
            new Date(`${event.eventDate} ${event.time}`)
          )}`}</Typography>
          <Typography fontSize={"14px"}>{`${event.location}`}</Typography>
        </Box>
        <Chip label={event.completed ? "Completed" : "Ongoing"} />
      </Box>
      <DialogWithOwnState
        ref={dialogRef}
        fullWidth
      >
        <EventDialog
          event={event}
          handleClose={handleClose}
        />
      </DialogWithOwnState>
    </>
  );
};

export default EventCard;
