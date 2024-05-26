import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React from "react";
import { getDayOfWeek } from "../../utils/timeUtils";

const EventDialog = ({ event, handleClose }) => {
  return (
    <>
      <DialogTitle>
        {event.name} {event.completed ? "- Completed" : " - Ongoing"}
      </DialogTitle>
      <DialogContent>
        <Typography>Organised by {event.organiser}</Typography>
        <Typography>
          {`Event Start Date/Time: ${event.eventDate} ${
            event.time
          } hrs, ${getDayOfWeek(event.eventDate)}`}
        </Typography>
        <Typography>
          {`Event End Date/Time: ${event.endDate} ${
            event.endTime
          } hrs, ${getDayOfWeek(event.endDate)}`}
        </Typography>
        <Typography>Venue: {event.location}</Typography>
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
