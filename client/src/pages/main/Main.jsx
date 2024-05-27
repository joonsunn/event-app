import React, { useState } from "react";
import { getEvents } from "../services/eventService";
import { useQuery } from "@tanstack/react-query";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { ToggleButtonGroup, Button, useMediaQuery } from "@mui/material";
import EventCard from "../../components/event-card/EventCard";

const Main = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const { data: events, isLoading: eventsLoading } = useQuery({
    queryKey: ["events", statusFilter],
    queryFn: () => getEvents(statusFilter),
  });

  console.log(eventsLoading);

  const isMobile = useMediaQuery("(max-width: 600px)");
  const isTablet = useMediaQuery("(max-width: 900px)");
  const isDesktop = useMediaQuery("(max-width: 1200px)");

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: isMobile ? "center" : "flex-start",
          alignItems: "center",
          gap: "24px",
          marginBottom: "36px",
          flexWrap: "wrap",
        }}
      >
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
          gap: "8px",
          marginTop: "36px",
          display: "grid",

          gridTemplateColumns: isMobile
            ? "repeat(1, 1fr)"
            : isTablet
            ? "repeat(2, 1fr)"
            : isDesktop
            ? "repeat(3, 1fr)"
            : "repeat(4, 1fr)",
        }}
      >
        {eventsLoading && (
          <Typography textAlign={"center"}>Loading...</Typography>
        )}
        {events?.length > 0 ? (
          events?.map((event) => (
            <EventCard
              key={event.id}
              event={event}
            />
          ))
        ) : (
          <Typography
            textAlign={"center"}
          >{`No events found as ${statusFilter}.`}</Typography>
        )}
      </Box>
    </>
  );
};

export default Main;
