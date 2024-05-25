import {
  DialogTitle,
  Typography,
  DialogContent,
  FormControl,
  TextField,
  Input,
  Select,
  MenuItem,
  DialogActions,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import { FormRow } from "../../pages/admin-portal/styles";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEvent } from "../../pages/services/eventService";

const CreateEventScreen = ({ handleClose }) => {
  const [eventComplete, setEventComplete] = useState(false);
  const [error, setError] = useState({ error: false, message: "" });
  const [timeoutId, setTimeoutId] = useState(null);

  const handleCreateEventError = (errroMessage) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setError({ error: true, message: errroMessage });

    const newTimeoutId = setTimeout(() => {
      setError({ error: false, message: "" });
      // console.log(value);
    }, 5000);
    setTimeoutId(newTimeoutId);
  };

  const defaultValues = {
    name: "",
    description: "",
    organiser: "",
    eventDate: "2024-05-01",
    time: "10:00",
    location: "",
    completed: false,
  };

  const queryClient = useQueryClient();

  const { mutate: handleCreateEventMutation } = useMutation({
    mutationFn: async (event) => {
      await createEvent(event);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["events"]);
      handleClose();
    },
    onError: (error) => {
      handleCreateEventError(
        "Unable to create event. Please check event details and try again."
      );
    },
  });

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    // console.log(e.target);
    const name = e.target.name.value;
    const description = e.target.description.value;
    const organiser = e.target.organiser.value;
    const eventDate = e.target.date.value;
    const time = e.target.time.value;
    const location = e.target.location.value;
    const completed = e.target.completed.value === "true";
    const newEvent = {
      name,
      description,
      organiser,
      eventDate,
      time,
      location,
      completed,
    };

    await handleCreateEventMutation(newEvent);
  };
  return (
    <>
      <DialogTitle>
        <Typography sx={{ fontWeight: "bold", fontSize: "1.5rem" }}>
          Create Event
        </Typography>
      </DialogTitle>
      <DialogContent>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            padding: "0px 24px",
          }}
          onSubmit={(e) => {
            //   e.preventDefault();
            handleCreateEvent(e);
          }}
        >
          <FormControl>
            <FormRow>
              <Typography className="form-label">Event Name </Typography>
              <TextField
                placeholder="Event Name"
                defaultValue={defaultValues.name}
                variant="standard"
                name="name"
                required
              />
            </FormRow>
          </FormControl>
          <FormControl>
            <FormRow>
              <Typography className="form-label">Event Description</Typography>
              <TextField
                placeholder="Event Description"
                defaultValue={defaultValues.description}
                variant="standard"
                name="description"
                required
              />
            </FormRow>
          </FormControl>
          <FormControl>
            <FormRow>
              <Typography className="form-label">Organised by</Typography>
              <TextField
                placeholder="Event Organiser"
                defaultValue={defaultValues.organiser}
                variant="standard"
                name="organiser"
                required
              />
            </FormRow>
          </FormControl>

          <FormControl>
            <FormRow>
              <Typography className="form-label">Location</Typography>
              <TextField
                placeholder="Location"
                defaultValue={defaultValues.location}
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
                defaultValue={defaultValues.eventDate}
                //   variant="standard"
                type="date"
                name="date"
                required
              />
            </FormRow>
          </FormControl>
          <FormControl>
            <FormRow>
              <Typography className="form-label">Time</Typography>
              {/* <TextField
                  placeholder="Event Time"
                  defaultValue={rowState.time}
                  variant="standard"
                  name="time"
                /> */}
              <Input
                placeholder="Event time"
                defaultValue={defaultValues.time}
                //   variant="standard"
                type="time"
                name="time"
                required
              />
            </FormRow>
          </FormControl>
          <FormControl>
            <FormRow>
              <Typography className="form-label">Event Status</Typography>
              {/* <TextField
                  placeholder="Event Status"
                  defaultValue={rowState.completed}
                  variant="standard"
                  name="status"
                /> */}
              <Select
                //   value={event.completed}
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
                <MenuItem value="false">Upcoming</MenuItem>
                <MenuItem value="true">Completed</MenuItem>
              </Select>
            </FormRow>
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

export default CreateEventScreen;
