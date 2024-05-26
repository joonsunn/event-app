import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { Box, Container } from "@mui/material";

const Layout = () => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        margin: "auto",
        padding: "36px 8px 0px 8px",
        minHeight: "100vh",
        alignItems: "center",
      }}
    >
      <Header />
      <Container
        sx={{
          marginTop: "80px",
        }}
      >
        <Outlet />
      </Container>
      <Footer />
    </Container>
  );
};

export default Layout;
