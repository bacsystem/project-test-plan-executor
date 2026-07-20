import { useSnackbar, VariantType } from "notistack";
import * as React from "react";

import { Box, Button } from "@mui/material";

export default function SnackbarStacking() {
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = () => {
    enqueueSnackbar("I love snacks.", {
      autoHideDuration: 6000,
      anchorOrigin: { horizontal: "right", vertical: "bottom" },
    });
  };

  const handleClickVariant = (variant: VariantType) => () => {
    enqueueSnackbar(`This is ${variant}!`, {
      variant,
      autoHideDuration: 6000,
      anchorOrigin: { horizontal: "right", vertical: "bottom" },
    });
  };

  return (
    <Box className="flex flex-row gap-2">
      <Button variant="outlined" onClick={handleClick}>
        Default Snackbar
      </Button>
      <Button variant="outlined" onClick={handleClickVariant("info")}>
        Info Snackbar
      </Button>
      <Button variant="outlined" onClick={handleClickVariant("success")}>
        Success Snackbar
      </Button>
      <Button variant="outlined" onClick={handleClickVariant("warning")}>
        Warning Snackbar
      </Button>
      <Button variant="outlined" onClick={handleClickVariant("error")}>
        Error Snackbar
      </Button>
    </Box>
  );
}
