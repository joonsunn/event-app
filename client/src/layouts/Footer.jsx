import { Box } from "@mui/material";
import React from "react";
import { ThemeSwitcher } from "../components/theme-switcher/ThemeSwitcher";

const Footer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: "8px",
        padding: "16px",
        marginTop: "auto",
        alignItems: "center",
      }}
    >
      {/* <ThemeSwitcher /> */}
      <Box>{""}</Box>
    </Box>
  );
};

export default Footer;
