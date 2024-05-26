import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Input,
  MenuItem,
  Select,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import { FormRow } from "./styles";
// import { deleteEvent } from "../services/eventService";

const AdminTableRow = ({ event, deleteEvent, updateEvent }) => {
  const [editMode, setEditMode] = useState(false);
  const [eventComplete, setEventComplete] = useState(event.completed);
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
      // console.log(value);
    }, 5000);
    setTimeoutId(newTimeoutId);
  };

  const isMobile = useMediaQuery("(max-width: 600px)");

  const handleDeleteEvent = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (confirmDelete) {
      try {
        const response = await deleteEvent(event.id);
        // console.log(response);
      } catch (error) {
        console.error(error);
      }
    }
    // console.log("deleting event:", event.id);
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
      handleCreateEventError("End date/time cannot be before start date/time");
      return;
    }
    if (new Date(`${endDate} ${endTime}`) < new Date() && !completed) {
      handleCreateEventError(
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
      //   console.log(response);
      setEditMode(false);
    } catch (error) {
      console.error(error);
    }
  };

  //TODO: use dialog to edit event
  return (
    <>
      {
        // </form>
        <tr key={event.id}>
          <td>{event.name}</td>
          {!isMobile && <td>{event.description}</td>}
          <td>{event.organiser}</td>
          {!isMobile && <td>{event.location}</td>}
          {/* <td>{event.location}</td> */}
          <td>{new Date(event.eventDate).toLocaleDateString("en-UK")}</td>
          {!isMobile && <td>{event.time}</td>}
          {!isMobile && (
            <td>{new Date(event.endDate).toLocaleDateString("en-UK")}</td>
          )}
          {!isMobile && <td>{event.endTime}</td>}
          <td>{event.completed ? "Completed" : "Ongoing"}</td>
          <td>{event.priority}</td>
          <td>
            <Box
              sx={{
                display: "flex",
                gap: "8px",
                flexWrap: isMobile ? "wrap" : "no-wrap",
              }}
            >
              <Button
                onClick={() => setEditMode((prevValue) => !prevValue)}
                variant="contained"
                sx={{ width: "80px" }}
              >
                {editMode ? "Cancel" : "Edit"}
              </Button>
              {editMode ? (
                <Button>Confirm</Button>
              ) : (
                <Button
                  onClick={handleDeleteEvent}
                  variant="contained"
                  sx={{ width: "80px" }}
                >
                  Delete
                </Button>
              )}
            </Box>
          </td>
        </tr>
      }
      <Dialog
        open={editMode}
        onClose={() => setEditMode((prevValue) => !prevValue)}
        fullWidth
      >
        <DialogTitle>
          <Typography sx={{ fontWeight: "bold", fontSize: "1.5rem" }}>
            Edit Event
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
              handleUpdateEvent(e);
            }}
          >
            <FormControl>
              <FormRow>
                <Typography className="form-label">Event Name </Typography>
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
                <Typography className="form-label">
                  Event Description
                </Typography>
                <TextField
                  placeholder="Event Description"
                  defaultValue={event.description}
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
                  defaultValue={event.organiser}
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
                  defaultValue={event.time}
                  //   variant="standard"
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
                  //   variant="standard"
                  type="date"
                  name="endDate"
                  required
                />
              </FormRow>
            </FormControl>
            <FormControl>
              <FormRow>
                <Typography className="form-label">End Time</Typography>
                {/* <TextField
                  placeholder="Event Time"
                  defaultValue={rowState.time}
                  variant="standard"
                  name="time"
                /> */}
                <Input
                  placeholder="End time"
                  defaultValue={event.endTime}
                  //   variant="standard"
                  type="time"
                  name="endTime"
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
            <DialogActions>
              <Button
                onClick={() => setEditMode((prevValue) => !prevValue)}
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
      </Dialog>
    </>
  );
};

export default AdminTableRow;
