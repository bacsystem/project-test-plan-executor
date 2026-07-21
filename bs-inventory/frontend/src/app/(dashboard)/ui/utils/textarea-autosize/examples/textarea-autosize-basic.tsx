"use client";

import React from "react";

import { FormControl, TextareaAutosize } from "@mui/material";

export default function TextareaAutosizeBasic() {
  return (
    <>
      <FormControl className="MuiTextField-root outlined mb-0 w-full">
        <TextareaAutosize
          minRows={2}
          className="MuiInputBase-root MuiInput-root MuiInputBase-colorPrimary MuiInputBase-formControl outlined autosize w-full"
          placeholder="Empty"
        />
      </FormControl>
    </>
  );
}
