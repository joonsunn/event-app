import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getEvents, deleteEvent, updateEvent } from "../services/eventService";
import Button from "@mui/material/Button";
import AdminTableRow from "./AdminTableRow";
import axios from "axios";
import { getToken } from "../services/loginService";
import { Typography, useMediaQuery } from "@mui/material";

const AdminTable = ({ statusFilter }) => {
  const isMobile = useMediaQuery("(max-width: 600px)");

  const { data: events } = useQuery({
    queryKey: ["events", statusFilter],
    queryFn: () => getEvents(statusFilter),
  });

  const queryClient = useQueryClient();

  const { mutate: handleDeleteEvent } = useMutation({
    mutationFn: (id) => deleteEvent(id),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });

  const { mutate: handleUpdateEvent } = useMutation({
    mutationFn: async ({ id, event }) => {
      await updateEvent(id, event);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });

  return (
    <>
      {events?.length > 0 ? (
        <table style={{ margin: "auto" }}>
          <thead>
            <tr>
              <th>Event Name</th>
              {!isMobile && <th>Description</th>}
              <th>Organiser</th>
              {!isMobile && <th>Location</th>}
              <th>Date</th>
              {!isMobile && <th>Time</th>}
              {!isMobile && <th>End Date</th>}
              {!isMobile && <th>End Time</th>}
              <th>Status</th>
              <th>Priority</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events &&
              events.map((event) => (
                <AdminTableRow
                  key={event.id}
                  event={event}
                  deleteEvent={handleDeleteEvent}
                  updateEvent={handleUpdateEvent}
                />
              ))}
          </tbody>
        </table>
      ) : (
        <Typography
          textAlign={"center"}
        >{`No events found as ${statusFilter}.`}</Typography>
      )}
    </>
  );
};

export default AdminTable;
