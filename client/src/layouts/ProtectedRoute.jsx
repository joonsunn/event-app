import React from "react";
import { Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user?.token) {
    localStorage.clear();
    window.location.href = "/";
  }
  return (
    <>
      ProtectedRoute
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
