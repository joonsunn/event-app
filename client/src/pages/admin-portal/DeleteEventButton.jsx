import { Button } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

const DeleteEventButton = ({ event, deleteEvent }) => {
  const handleDeleteEvent = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this event: ${event.name}?`
    );
    if (confirmDelete) {
      try {
        const response = await deleteEvent(event.id);
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <Button onClick={handleDeleteEvent}>
      <DeleteIcon color="error" />
    </Button>
  );
};

export default DeleteEventButton;
