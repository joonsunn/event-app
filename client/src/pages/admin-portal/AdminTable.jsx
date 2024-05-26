import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getEvents, deleteEvent, updateEvent } from "../services/eventService";
import AdminMRT from "./AdminMRT";

const AdminTable = ({ statusFilter }) => {
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
      {events && (
        <AdminMRT
          events={events}
          deleteEvent={handleDeleteEvent}
          updateEvent={handleUpdateEvent}
        />
      )}
    </>
  );
};

export default AdminTable;
