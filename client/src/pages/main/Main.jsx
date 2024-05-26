import React, { useState } from "react";
import { getEvents } from "../services/eventService";
import { useQuery } from "@tanstack/react-query";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { ToggleButtonGroup, Button } from "@mui/material";
import EventCard from "../../components/event-card/EventCard";

const Main = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const { data: events } = useQuery({
    queryKey: ["events", statusFilter],
    queryFn: () => getEvents(statusFilter),
  });

  return (
    <>
      {/* <div>Main</div>
      <div>Main</div>
      <div>Main</div> */}
      {/* <div style={{ height: "1000px", outline: "1px solid red" }}>Main</div> */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "24px",
          marginBottom: "36px",
          flexWrap: "wrap",
        }}
      >
        <Typography>Filter events by: </Typography>
        <ToggleButtonGroup>
          <Button
            variant={statusFilter === "all" ? "contained" : "outlined"}
            onClick={() => setStatusFilter("all")}
          >
            All
          </Button>
          <Button
            variant={statusFilter === "completed" ? "contained" : "outlined"}
            onClick={() => setStatusFilter("completed")}
          >
            Completed
          </Button>
          <Button
            variant={statusFilter === "ongoing" ? "contained" : "outlined"}
            onClick={() => setStatusFilter("ongoing")}
          >
            Ongoing
          </Button>
        </ToggleButtonGroup>
      </Box>
      <Box
        sx={{
          // display: "flex",
          // flexDirection: "row",
          // flexWrap: "wrap",
          gap: "8px",
          marginTop: "36px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        }}
      >
        {events &&
          events?.map((event) => (
            // <Box key={event.id}>
            //   <Typography>Event name: {event.name}</Typography>
            //   <Typography>Organised by : {event.organiser}</Typography>
            //   <Typography>Description: {event.description}</Typography>
            // </Box>
            <EventCard
              key={event.id}
              event={event}
            />
          ))}
      </Box>
    </>
  );
};

export default Main;
