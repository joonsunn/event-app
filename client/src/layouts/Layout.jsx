import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";

const Layout = () => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        margin: "auto",
        padding: "36px 8px",
        minHeight: "100vh",
        // paddingTop: "36px",
        alignItems: "center",
      }}
    >
      <Header />
      {/* <div style={{ height: "100%" }}>
      </div> */}
      <Container sx={{ marginTop: "56px" }}>
        <Outlet />
      </Container>
      <Footer />
    </Container>
  );
};

export default Layout;
