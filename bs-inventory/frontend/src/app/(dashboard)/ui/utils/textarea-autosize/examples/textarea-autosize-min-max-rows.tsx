"use client";

import React from "react";

import { FormControl, TextareaAutosize } from "@mui/material";

export default function TextareaAutosizeMinMaxRows() {
  return (
    <>
      <FormControl className="MuiTextField-root outlined mb-0 w-full">
        <TextareaAutosize
          minRows={2}
          maxRows={4}
          className="MuiInputBase-root MuiInput-root MuiInputBase-colorPrimary MuiInputBase-formControl outlined autosize w-full"
          placeholder="Empty"
        />
      </FormControl>
    </>
  );
}
