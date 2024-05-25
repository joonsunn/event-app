import React from "react";
import { getEvents } from "../services/eventService";
import { useQuery } from "@tanstack/react-query";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Main = () => {
  const { data: events } = useQuery({
    queryKey: ["events"],
    queryFn: () => getEvents(),
  });

  return (
    <>
      {/* <div>Main</div>
      <div>Main</div>
      <div>Main</div> */}
      {/* <div style={{ height: "1000px", outline: "1px solid red" }}>Main</div> */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {events?.map((event) => (
          <Box key={event.id}>
            <Typography>Event name: {event.name}</Typography>
            <Typography>Organised by : {event.organiser}</Typography>
            <Typography>Description: {event.description}</Typography>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default Main;
