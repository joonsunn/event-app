import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const UnprotectedRoute = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.token) {
      navigate("/admin");
    }
  }, [navigate, user?.token]);
  return (
    <>
      <Outlet />
    </>
  );
};

export default UnprotectedRoute;
