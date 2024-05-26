import { Button } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

const DeleteEventButton = ({ id, deleteEvent }) => {
  const handleDeleteEvent = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (confirmDelete) {
      try {
        const response = await deleteEvent(id);
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
