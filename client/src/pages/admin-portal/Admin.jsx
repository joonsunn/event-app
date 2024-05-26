import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getEvents } from "../services/eventService";
import AdminTable from "./AdminTable";
import Button from "@mui/material/Button";
import {
  Box,
  Container,
  ToggleButtonGroup,
  Typography,
  useMediaQuery,
} from "@mui/material";
import CreateEventButton from "../../components/create-event/CreateEventButon";

const Admin = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const isMobile = useMediaQuery("(max-width: 600px)");
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <Box
        sx={{
          display: "flex",
          // justifyContent: isMobile ? "flex-start" : "flex-end",
          justifyContent: "flex-start",
        }}
      >
        <CreateEventButton />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: "24px",
          marginBottom: "36px",
        }}
      >
        {/* <Typography>Filter: </Typography> */}
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
      <AdminTable statusFilter={statusFilter} />
    </Box>
  );
};

export default Admin;
