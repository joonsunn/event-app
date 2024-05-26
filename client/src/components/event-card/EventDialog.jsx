import {
  Box,
  Button,
  Chip,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React from "react";
import { getDayOfWeek, timeFormatter } from "../../utils/timeUtils";

const EventDialog = ({ event, handleClose }) => {
  return (
    <>
      <DialogTitle>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            fontWeight={"bold"}
          >
            {event.name}
          </Typography>
          {event.completed ? (
            <Chip label="Completed" />
          ) : (
            <Chip label="Ongoing" />
          )}
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "0.5fr 1fr",
            maxWidth: "500px",
          }}
        >
          <Typography>Host</Typography>
          <Typography>{event.organiser}</Typography>

          <Typography>{`Start`}</Typography>
          <Typography>
            {`${event.eventDate} ${timeFormatter(
              new Date(`${event.eventDate} ${event.time}`)
            )}, ${getDayOfWeek(event.eventDate)}`}
          </Typography>
          <Typography>{`End`}</Typography>
          <Typography>
            {`${event.endDate} ${timeFormatter(
              new Date(`${event.eventDate} ${event.time}`)
            )}, ${getDayOfWeek(event.endDate)}`}
          </Typography>
          <Typography>Venue</Typography>
          <Typography>{event.location}</Typography>
        </Box>
        <Typography sx={{ marginTop: "24px" }}>{event.description}</Typography>
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
