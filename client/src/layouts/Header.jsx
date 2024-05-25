import { Box, Button } from "@mui/material";
import React from "react";
import AdminLoginButton from "../components/login/AdminLoginButton";

const Header = () => {
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
        justifyContent: "space-between",
      }}
    >
      <div>header</div>
      <div>Events</div>
      {/* <Button variant="contained">Admin Log In</Button> */}
      <AdminLoginButton />
    </Box>
  );
};

export default Header;
