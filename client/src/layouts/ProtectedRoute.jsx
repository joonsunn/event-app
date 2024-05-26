import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.token) {
      localStorage.clear();
      navigate("/");
    }
  }, []);
  return (
    <>
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
