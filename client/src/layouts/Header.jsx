import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import AdminLoginButton from "../components/login/AdminLoginButton";
import { useLocation } from "react-router-dom";

const Header = () => {
  const path = useLocation().pathname;
  const isMobile = useMediaQuery("(max-width: 600px)");
  return (
    <Box
      style={{
        display: "flex",
        gap: "8px",
        position: "absolute",
        top: 0,
        width: "100%",
        padding: "16px 56px",
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: isMobile ? "100%" : "80%",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h4">
          Events App {path === "/admin" ? " - Admin Portal" : ""}
        </Typography>
        <AdminLoginButton />
      </Box>
    </Box>
  );
};

export default Header;
