import React from "react";
import { Outlet } from "react-router-dom";

const UnprotectedRoute = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user?.token) {
    window.location.href = "/admin";
  }
  return (
    <>
      {/* <div>UnprotectedRoute</div> */}
      <Outlet />
    </>
  );
};

export default UnprotectedRoute;
