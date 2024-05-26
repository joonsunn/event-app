"use client";

import { DialogContent, useMediaQuery } from "@mui/material";
import Dialog from "@mui/material/Dialog";

import React, { forwardRef, useImperativeHandle, useState } from "react";

const DialogWithOwnState = forwardRef(function DialogWithOwnState(props, ref) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 600px)");
  useImperativeHandle(ref, () => ({
    getOpen: () => {
      dialogOpen;
    },
    setOpen: () => {
      setDialogOpen(true);
    },
    setClose: () => {
      setDialogOpen(false);
    },
  }));
  return (
    <Dialog
      open={dialogOpen}
      onClose={() => setDialogOpen(false)}
      fullWidth={props.fullWidth}
      sx={{
        "& .MuiDialogContent-root": {
          padding: isMobile ? "8px" : "20px 24px",
          h2: {
            padding: isMobile ? "8px" : "16px 24px",
          },
        },
      }}
    >
      <DialogContent>{props.children}</DialogContent>
    </Dialog>
  );
});

export default DialogWithOwnState;
