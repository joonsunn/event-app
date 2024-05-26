"use client";

import React, { useRef } from "react";
// import StyledButton, { StyledButton2 } from "../../../components/StyledButton";
// import DialogWithOwnState from "../../../components/ui/DialogWithOwnState";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AdminLoginScreen from "./AdminLoginScreen";
import DialogWithOwnState from "../DialogWithOwnState";
import { UserContext } from "../../context/UserContextProvider";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const AdminLoginButton = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate(0);
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
            // primary={+false as unknown as boolean}
            variant="contained"
            sx={{ padding: "0px 4px" }}
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
          sx={{ padding: "0px 4px" }}
        >
          Sign out
        </Button>
      )}
    </>
  );
};

export default AdminLoginButton;