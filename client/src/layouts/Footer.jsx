import { Box } from "@mui/material";
import React from "react";
import { ThemeSwitcher } from "../components/theme-switcher/ThemeSwitcher";

const Footer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: "8px",
        // position: "relative",
        // bottom: 0,
        padding: "16px",
        // width: "1000px",
        // justifyContent: "center",
        marginTop: "auto",
        alignItems: "center",
      }}
    >
      {/* <div>Footer</div>
      <div>More info</div> */}
      <ThemeSwitcher />
    </Box>
  );
};

export default Footer;
