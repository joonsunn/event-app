import React, { useState } from "react";
import AdminTable from "./AdminTable";
import Button from "@mui/material/Button";
import { Box, ToggleButtonGroup, useMediaQuery } from "@mui/material";
import CreateEventButton from "../../components/create-event/CreateEventButon";

const Admin = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const isMobile = useMediaQuery("(max-width: 600px)");
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: isMobile ? "center" : "flex-start",
          alignItems: "center",
          gap: "24px",
          marginBottom: "36px",
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
      <AdminTable statusFilter={statusFilter} />
    </Box>
  );
};

export default Admin;
