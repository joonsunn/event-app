import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getEvents, deleteEvent, updateEvent } from "../services/eventService";
import Button from "@mui/material/Button";
import AdminTableRow from "./AdminTableRow";
import axios from "axios";
import { getToken } from "../services/loginService";

const AdminTable = ({ statusFilter }) => {
  const { data: events } = useQuery({
    queryKey: ["events", statusFilter],
    queryFn: () => getEvents(statusFilter),
  });

  const queryClient = useQueryClient();

  const { mutate: handleDeleteEvent } = useMutation({
    // mutationFn: (id) =>
    //   axios.delete(`http://localhost:3001/api/events/${id}`, getToken()),
    mutationFn: (id) => deleteEvent(id),
    onSettled: () => {
      queryClient.invalidateQueries(["events"]);
    },
  });

  const { mutate: handleUpdateEvent } = useMutation({
    // mutationFn: (id) =>
    //   axios.delete(`http://localhost:3001/api/events/${id}`, getToken()),
    mutationFn: async ({ id, event }) => {
      console.log("mutation:", event);
      await updateEvent(id, event);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["events"]);
    },
  });

  //   console.log(events ? events : "");
  // TODO: useMutation for delete and update event
  return (
    <>
      {/* <div>AdminTable</div> */}
      {/* {events && events.map((event) => <div key={event.id}>{event.name}</div>)} */}
      <table style={{ margin: "auto" }}>
        <thead>
          <tr>
            <th>Event Name</th>
            {/* <th>Description</th> */}
            <th>Organiser</th>
            {/* <th>Location</th> */}
            <th>Date</th>
            {/* <th>Time</th> */}
            <th>Status</th>
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
    </>
  );
};

export default AdminTable;
