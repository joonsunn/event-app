"use client";

import React, { useState } from "react";
import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import { login } from "../../pages/services/loginService";
import { useContext } from "react";
import { UserContext } from "../../context/UserContextProvider";
import { FormRow } from "../../pages/admin-portal/styles";
import { useNavigate } from "react-router-dom";

const AdminLoginScreen = ({ handleClose }) => {
  const [error, setError] = useState({ error: false, message: "" });

  const [timeoutId, setTimeoutId] = useState(null);
  const navigate = useNavigate();

  const handleLoginError = (errroMessage) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setError({ error: true, message: errroMessage });

    const newTimeoutId = setTimeout(() => {
      setError({ error: false, message: "" });
    }, 5000);
    setTimeoutId(newTimeoutId);
  };
  const { user, setUser } = useContext(UserContext);

  const handleSignin = async (event) => {
    event.preventDefault();

    const username = event.target.username.value;
    const password = event.target.password.value;

    const response = await login(username, password);
    if (!response.error) {
      setUser(response);
      localStorage.setItem("user", JSON.stringify(response));
      navigate("/admin");

      handleClose();
    } else {
      handleLoginError(response.message);
    }
  };

  return (
    <form
      onSubmit={(e) => handleSignin(e)}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        padding: "0px 24px",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <FormControl>
          <FormRow>
            <Typography className="form-label">Username </Typography>
            <TextField
              name="username"
              type="text"
              variant="standard"
              required
            />
          </FormRow>
        </FormControl>
        <FormControl>
          <FormRow>
            <Typography className="form-label">Password </Typography>
            <TextField
              variant="standard"
              name="password"
              type="password"
              required
            />
          </FormRow>
        </FormControl>
      </Box>

      <Button
        variant="contained"
        type="submit"
      >
        Sign In
      </Button>

      {error.error && <Typography color="pink">{error.message}</Typography>}
    </form>
  );
};

export default AdminLoginScreen;
