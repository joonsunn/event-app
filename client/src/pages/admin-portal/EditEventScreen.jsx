import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Input,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { FormRow } from "./styles";

const EditEventScreen = ({ event, updateEvent, handleClose }) => {
  const [eventComplete, setEventComplete] = useState(event.completed);
  const [priority, setPriority] = useState(event.priority);
  const [error, setError] = useState({ error: false, message: "" });
  const [timeoutId, setTimeoutId] = useState(null);

  const handleEditEventError = (errroMessage) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setError({ error: true, message: errroMessage });

    const newTimeoutId = setTimeout(() => {
      setError({ error: false, message: "" });
    }, 5000);
    setTimeoutId(newTimeoutId);
  };

  const handleUpdateEvent = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const description = e.target.description.value;
    const organiser = e.target.organiser.value;
    const eventDate = e.target.date.value;
    const endDate = e.target.endDate.value;
    const time = e.target.time.value;
    const endTime = e.target.endTime.value;
    const location = e.target.location.value;
    const completed = e.target.completed.value === "true";
    const priority = e.target.priority.value;

    if (new Date(`${eventDate} ${time}`) > new Date(`${endDate} ${endTime}`)) {
      handleEditEventError("End date/time cannot be before start date/time");
      return;
    }
    if (new Date(`${endDate} ${endTime}`) < new Date() && !completed) {
      handleEditEventError(
        "Event end date has already passed. Unable to update event as 'ongoing'."
      );
      return;
    }

    try {
      const response = await updateEvent({
        id: event.id,
        event: {
          name,
          description,
          organiser,
          eventDate,
          endDate,
          time,
          endTime,
          location,
          completed,
          priority,
        },
      });
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <DialogTitle>
        <Typography sx={{ fontWeight: "bold", fontSize: "1.5rem" }}>
          Edit
        </Typography>
      </DialogTitle>
      <DialogContent>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
          onSubmit={(e) => {
            handleUpdateEvent(e);
          }}
        >
          <FormControl>
            <FormRow>
              <Typography className="form-label">Name </Typography>
              <TextField
                placeholder="Event Name"
                defaultValue={event.name}
                variant="standard"
                name="name"
                required
              />
            </FormRow>
          </FormControl>

          <FormControl>
            <FormRow>
              <Typography className="form-label">Host</Typography>
              <TextField
                placeholder="Event Organiser"
                defaultValue={event.organiser}
                variant="standard"
                name="organiser"
                required
              />
            </FormRow>
          </FormControl>

          <FormControl>
            <FormRow>
              <Typography className="form-label">Venue</Typography>
              <TextField
                placeholder="Location"
                defaultValue={event.location}
                variant="standard"
                name="location"
                required
              />
            </FormRow>
          </FormControl>
          <FormControl>
            <FormRow>
              <Typography className="form-label">Date</Typography>
              <Input
                placeholder="Event Date"
                defaultValue={event.eventDate}
                type="date"
                name="date"
                required
              />
            </FormRow>
          </FormControl>

          <FormControl>
            <FormRow>
              <Typography className="form-label">Time</Typography>
              <Input
                placeholder="Event time"
                defaultValue={event.time}
                type="time"
                name="time"
                required
              />
            </FormRow>
          </FormControl>
          <FormControl>
            <FormRow>
              <Typography className="form-label">End Date</Typography>
              <Input
                placeholder="End Date"
                defaultValue={event.endDate}
                type="date"
                name="endDate"
                required
              />
            </FormRow>
          </FormControl>
          <FormControl>
            <FormRow>
              <Typography className="form-label">End Time</Typography>
              <Input
                placeholder="End time"
                defaultValue={event.endTime}
                type="time"
                name="endTime"
                required
              />
            </FormRow>
          </FormControl>
          <FormControl>
            <FormRow>
              <Typography className="form-label">Status</Typography>
              <Select
                value={eventComplete}
                sx={{
                  width: "10px",
                  div: {
                    padding: "6.5px 14px",
                  },
                }}
                name="completed"
                onChange={(e) => setEventComplete(e.target.value)}
                required
              >
                <MenuItem value="false">Ongoing</MenuItem>
                <MenuItem value="true">Completed</MenuItem>
              </Select>
            </FormRow>
          </FormControl>
          <FormControl>
            <FormRow>
              <Typography className="form-label">Priority</Typography>
              <Select
                value={priority}
                sx={{
                  width: "10px",
                  div: {
                    padding: "6.5px 14px",
                  },
                }}
                name="priority"
                onChange={(e) => setPriority(e.target.value)}
                required
              >
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="High">High</MenuItem>
              </Select>
            </FormRow>
          </FormControl>
          <FormControl>
            <Typography className="form-label">Description</Typography>
            <TextField
              placeholder="Event Description"
              defaultValue={event.description}
              variant="outlined"
              name="description"
              multiline
              minRows={3}
              required
            />
          </FormControl>
          <DialogActions>
            <Button
              onClick={handleClose}
              variant="contained"
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              type="submit"
            >
              Confirm
            </Button>
          </DialogActions>
        </form>
        {error.error && <Typography color="pink">{error.message}</Typography>}
      </DialogContent>
    </>
  );
};

export default EditEventScreen;
