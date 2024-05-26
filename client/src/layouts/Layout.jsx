import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { Box, Container } from "@mui/material";

const Layout = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        margin: "auto",
        padding: "36px 0px 0px 0px",
        minHeight: "100vh",
        alignItems: "center",
      }}
    >
      <Header />
      <Container
        sx={{
          marginTop: "120px",
        }}
      >
        <Outlet />
      </Container>
      <Footer />
    </Box>
  );
};

export default Layout;
