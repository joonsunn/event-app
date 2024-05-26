import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import AdminLoginButton from "../components/login/AdminLoginButton";
import { useLocation } from "react-router-dom";
import { ThemeSwitcher } from "../components/theme-switcher/ThemeSwitcher";

const Header = () => {
  const path = useLocation().pathname;
  const isMobile = useMediaQuery("(max-width: 600px)");
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        position: "absolute",
        top: 0,
        width: "100%",
        padding: "16px 24px",
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "24px",
        }}
      >
        <ThemeSwitcher />
        <AdminLoginButton />
      </Box>
      <Typography variant="h4">
        Events App {path === "/admin" ? " - Admin" : ""}
      </Typography>
    </Box>
  );
};

export default Header;
