import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getEvents } from "../services/eventService";

const Admin = () => {
  const { data: events } = useQuery({
    queryKey: ["events"],
    queryFn: () => getEvents(),
  });
  return <div>Admin</div>;
};

export default Admin;
