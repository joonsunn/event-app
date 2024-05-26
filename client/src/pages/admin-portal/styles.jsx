import { Box, styled } from "@mui/material";

export const FormRow = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  "& .form-label": {
    minWidth: "80px",
  },
  div: {
    width: "100%",
    div: {
      input: {
        padding: 1,
      },
    },
  },
}));
