"use client";

import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
// import { searchSymbols } from "./api";
import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  TextField,
  // TextareaAutosize,
  Typography,
} from "@mui/material";
import { login } from "../../pages/services/loginService";
// import { Quote } from "@/app/api/asset-tracker/search/types";
// import { StyledButton2 } from "@/components/StyledButton";

// interface AddTransactionScreenProps {
//   handleClose: () => void;
// }
import { useContext } from "react";
import { UserContext } from "../../context/UserContextProvider";

const AdminLoginScreen = ({ handleClose }) => {
  const [error, setError] = useState({ error: false, message: "" });
  // const [queryString, setQueryString] = useState("");
  // const [innerText, setInnerText] = useState("");
  // const [formState, setFormState] = useState({});

  const [timeoutId, setTimeoutId] = useState(null);

  const handleLoginError = (errroMessage) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setError({ error: true, message: errroMessage });

    const newTimeoutId = setTimeout(() => {
      setError({ error: false, message: "" });
      // console.log(value);
    }, 5000);
    setTimeoutId(newTimeoutId);
  };
  const { user, setUser } = useContext(UserContext);

  const handleSignin = async (event) => {
    event.preventDefault();

    const username = event.target.username.value;
    const password = event.target.password.value;

    const response = await login(username, password);
    console.log(response);
    if (!response.error) {
      setUser(response);
      localStorage.setItem("user", JSON.stringify(response));
      window.location.href = "/admin";
      handleClose();
    } else {
      handleLoginError(response.message);
    }
  };

  return (
    <form onSubmit={(e) => handleSignin(e)}>
      <Typography>Admin Sign In Popup</Typography>
      <FormControl>
        <TextField
          label={"username"}
          size="small"
          sx={{ input: { padding: 1 } }}
          name="username"
          type="text"
          // value={innerText}
          // autoFocus
          // onChange={(e) => handleSearchTextChange(e)}
        />
      </FormControl>

      <FormControl>
        <TextField
          label={"password"}
          size="small"
          sx={{ input: { padding: 1 } }}
          name="password"
          type="password"
          // value={innerText}
          // autoFocus
          // onChange={(e) => handleSearchTextChange(e)}
        />
      </FormControl>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          marginTop: "16px",
        }}
      >
        Admin sign in
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
