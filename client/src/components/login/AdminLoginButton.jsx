"use client";

import React, { useRef } from "react";
import Button from "@mui/material/Button";
import AdminLoginScreen from "./AdminLoginScreen";
import DialogWithOwnState from "../DialogWithOwnState";
import { UserContext } from "../../context/UserContextProvider";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const AdminLoginButton = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    setUser({});
    localStorage.clear();
    // window.location.href = "/";
    navigate("/");
  };

  const dialogRef = useRef();
  const handleClick = () => dialogRef.current.setOpen();
  const handleClose = () => dialogRef.current.setClose();
  return (
    <>
      {!user.username ? (
        <>
          <Button
            onClick={handleClick}
            variant="contained"
            sx={{ padding: "4px 4px" }}
          >
            Admin
          </Button>
          <DialogWithOwnState ref={dialogRef}>
            <AdminLoginScreen handleClose={handleClose} />
          </DialogWithOwnState>
        </>
      ) : (
        <Button
          variant="contained"
          onClick={handleLogout}
          sx={{ padding: "4px 4px" }}
        >
          Sign out
        </Button>
      )}
    </>
  );
};

export default AdminLoginButton;
