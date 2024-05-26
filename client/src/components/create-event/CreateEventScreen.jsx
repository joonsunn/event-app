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
import { getDeltaDate, getTodayDate } from "../../utils/timeUtils";

const CreateEventScreen = ({ handleClose }) => {
  const [eventComplete, setEventComplete] = useState(false);
  const [priority, setPriority] = useState("Low");
  const [error, setError] = useState({ error: false, message: "" });
  const [timeoutId, setTimeoutId] = useState(null);

  const handleCreateEventError = (errroMessage) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setError({ error: true, message: errroMessage });

    const newTimeoutId = setTimeout(() => {
      setError({ error: false, message: "" });
    }, 5000);
    setTimeoutId(newTimeoutId);
  };

  const defaultValues = {
    name: "",
    description: "",
    organiser: "",
    eventDate: getTodayDate(),
    endDate: getDeltaDate(getTodayDate(), 1),
    time: "10:00",
    endTime: "10:00",
    location: "",
    completed: false,
  };

  const queryClient = useQueryClient();

  const { mutate: handleCreateEventMutation } = useMutation({
    mutationFn: async (event) => {
      await createEvent(event);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
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
    const endDate = e.target.endDate.value;
    const time = e.target.time.value;
    const endTime = e.target.endTime.value;
    const location = e.target.location.value;
    const completed = e.target.completed.value === "true";
    const priority = e.target.priority.value;
    const newEvent = {
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
    };

    if (new Date(`${eventDate} ${time}`) > new Date(`${endDate} ${endTime}`)) {
      handleCreateEventError("End date cannot be before start date");
      return;
    }
    if (new Date(`${endDate} ${endTime}`) < new Date() && !completed) {
      handleCreateEventError(
        "Event end date has already passed. Unable to create event as 'ongoing'."
      );
      return;
    }

    await handleCreateEventMutation(newEvent);
  };

  return (
    <>
      <DialogTitle>
        <Typography sx={{ fontWeight: "bold", fontSize: "1.5rem" }}>
          Create
        </Typography>
      </DialogTitle>
      <DialogContent>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            // padding: "0px 24px",
          }}
          onSubmit={(e) => {
            //   e.preventDefault();
            handleCreateEvent(e);
          }}
        >
          <FormControl>
            <FormRow>
              <Typography className="form-label">Name </Typography>
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
              <Typography className="form-label">Host</Typography>
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
              <Typography className="form-label">Venue</Typography>
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
              <Typography className="form-label">Start</Typography>
              <Input
                placeholder="Event Date"
                defaultValue={defaultValues.eventDate}
                type="date"
                name="date"
                required
                // inputProps={{
                //   min: getTodayDate(),
                // }}
              />
            </FormRow>
          </FormControl>
          <FormControl>
            <FormRow>
              <Typography className="form-label">Time</Typography>
              <Input
                placeholder="Event time"
                defaultValue={defaultValues.time}
                type="time"
                name="time"
                required
              />
            </FormRow>
          </FormControl>
          <FormControl>
            <FormRow>
              <Typography className="form-label">End</Typography>
              <Input
                placeholder="End Date"
                defaultValue={defaultValues.endDate}
                //   variant="standard"
                type="date"
                name="endDate"
                required
              />
            </FormRow>
          </FormControl>

          <FormControl>
            <FormRow>
              <Typography className="form-label">Time</Typography>
              <Input
                placeholder="End time"
                defaultValue={defaultValues.endTime}
                //   variant="standard"
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
              defaultValue={defaultValues.description}
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

export default CreateEventScreen;
