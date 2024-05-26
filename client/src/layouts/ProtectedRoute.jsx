import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  if (!user?.token) {
    localStorage.clear();
    // window.location.href = "/";
    navigate("/");
  }
  return (
    <>
      {/* ProtectedRoute */}
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
