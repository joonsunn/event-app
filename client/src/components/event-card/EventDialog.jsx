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
import { getDayOfWeek } from "../../utils/timeUtils";

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
        {/* <Typography fontStyle="italic">{event.organiser}</Typography> */}
        {/* <Typography>
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
        <Typography>{event.completed}</Typography> */}

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
            {`${event.eventDate} ${event.time} hrs, ${getDayOfWeek(
              event.eventDate
            )}`}
          </Typography>
          <Typography>{`End`}</Typography>
          <Typography>
            {`${event.endDate} ${event.endTime} hrs, ${getDayOfWeek(
              event.endDate
            )}`}
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
