"use client";

import { DialogContent } from "@mui/material";
import Dialog from "@mui/material/Dialog";

import React, { forwardRef, useImperativeHandle, useState } from "react";

const DialogWithOwnState = forwardRef(function DialogWithOwnState(props, ref) {
  const [dialogOpen, setDialogOpen] = useState(false);
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
    >
      <DialogContent>{props.children}</DialogContent>
    </Dialog>
  );
});

export default DialogWithOwnState;
