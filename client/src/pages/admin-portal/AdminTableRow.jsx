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
} from "@mui/material";
import React, { useState } from "react";
import { FormRow } from "./styles";
// import { deleteEvent } from "../services/eventService";

/**
 * Renders a table row for an admin portal event.
 *
 * @param {Object} props - The props object containing the event data.
 * @param {Object} props.event - The event object with the following properties:
 *   - {string} id - The unique identifier of the event.
 *   - {string} name - The name of the event.
 *   - {string} description - The description of the event.
 *   - {string} organiser - The organiser of the event.
 *   - {string} eventDate - The date of the event (in ISO format).
 *   - {string} time - The time of the event.
 *   - {boolean} completed - Indicates whether the event is completed or not.
 * @return {JSX.Element} The rendered table row.
 */
const AdminTableRow = ({ event, deleteEvent, updateEvent }) => {
  const [editMode, setEditMode] = useState(false);
  const [eventComplete, setEventComplete] = useState(event.completed);
  const [rowState, setRowState] = useState({
    name: event.name,
    description: event.description,
    organiser: event.organiser,
    eventDate: event.eventDate,
    time: event.time,
    location: event.location,
    completed: event.completed,
  });
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
    const time = e.target.time.value;
    const location = e.target.location.value;
    const completed = e.target.completed.value === "true";
    // setRowState({
    //   name,
    //   description,
    //   organiser,
    //   eventDate,
    //   time,
    //   location,
    //   completed,
    // });

    try {
      const response = await updateEvent({
        id: event.id,
        event: {
          name,
          description,
          organiser,
          eventDate,
          time,
          location,
          completed,
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
          {/* <td>{event.description}</td> */}
          <td>{event.organiser}</td>
          {/* <td>{event.location}</td> */}
          <td>{new Date(event.eventDate).toDateString()}</td>
          {/* <td>{event.time}</td> */}
          <td>{event.completed ? "Completed" : "Upcoming"}</td>
          <td>
            <Box sx={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
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
                  <MenuItem value="false">Upcoming</MenuItem>
                  <MenuItem value="true">Completed</MenuItem>
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
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminTableRow;
