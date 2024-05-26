import { Button, Container } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Container
      sx={{
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>404 - Page not found</h1>
      <Button
        onClick={() => navigate("/")}
        variant="contained"
      >
        Go Home
      </Button>
    </Container>
  );
};

export default NotFound;
