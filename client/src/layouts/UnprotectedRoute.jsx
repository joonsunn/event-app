import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const UnprotectedRoute = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  if (user?.token) {
    // window.location.href = "/admin";
    navigate("/admin");
  }
  return (
    <>
      {/* <div>UnprotectedRoute</div> */}
      <Outlet />
    </>
  );
};

export default UnprotectedRoute;
