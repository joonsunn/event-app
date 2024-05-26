import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React from "react";

const EventDialog = ({ event, handleClose }) => {
  return (
    <>
      <DialogTitle>{event.name}</DialogTitle>
      <DialogContent>
        <Typography>Oraganised by {event.organiser}</Typography>
        <Typography>
          {event.eventDate} {event.time}
        </Typography>
        <Typography>{event.location}</Typography>
        <Typography>{event.completed}</Typography>
        <Typography>{event.description}</Typography>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={handleClose}
          variant="contained"
        >
          Close
        </Button>
      </DialogActions>
    </>
  );
};

export default EventDialog;
