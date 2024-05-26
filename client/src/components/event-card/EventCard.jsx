import { Box, Chip, Typography, useTheme } from "@mui/material";
import React, { useRef } from "react";
import DialogWithOwnState from "../DialogWithOwnState";
import EventDialog from "./EventDialog";
import { getDayOfWeek } from "../../utils/timeUtils";

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
          // height: "150px",
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.secondary,
          padding: "8px",
          //   margin: "auto",
          borderRadius: "8px",
          cursor: "pointer",
          "&:hover": {
            boxShadow: "0 0 8px 0 rgba(187, 178, 178, 0.562)",
          },
          overflow: "hidden",
        }}
        onClick={handleClick}
      >
        <Typography>
          {event.name} by {event.organiser}
        </Typography>
        <Typography>
          {`${new Date(event.eventDate).toDateString()} ${event.time} hrs`}
        </Typography>

        <Typography>Location: {event.location}</Typography>
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
