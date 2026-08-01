import * as React from "react";

import { AlertTitle, Box, Card, CardContent, Portal, Typography } from "@mui/material";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";

import NiCheckSquare from "@/icons/nexture/ni-check-square";
import NiCross from "@/icons/nexture/ni-cross";
import NiDocumentFull from "@/icons/nexture/ni-document-full";

export default function SnackbarCustomization() {
  const [openAlert, setOpenAlert] = React.useState(false);
  const handleClickAlert = () => {
    setOpenAlert(true);
  };
  const handleCloseAlert = (event?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  const [openCard, setOpenCard] = React.useState(false);
  const handleClickCard = () => {
    setOpenCard(true);
  };
  const handleCloseCard = (event?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenCard(false);
  };

  return (
    <Box>
      <Box className="flex flex-row gap-2">
        <Button variant="outlined" onClick={handleClickAlert}>
          Open Alert
        </Button>
        <Button variant="outlined" onClick={handleClickCard}>
          Open Card
        </Button>
      </Box>

      <Portal>
        <Snackbar
          open={openAlert}
          autoHideDuration={6000}
          onClose={handleCloseAlert}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <Alert
            severity="success"
            onClose={handleCloseAlert}
            icon={<NiCheckSquare />}
            className="neutral border-grey-100"
            action={
              <Button
                className="icon-only"
                size="small"
                color="text-secondary"
                variant="text"
                onClick={() => {
                  setOpenAlert(false);
                }}
                startIcon={<NiCross size="small" />}
              />
            }
          >
            <AlertTitle variant="subtitle2">Success</AlertTitle>
            This is a success Alert with an encouraging title.
          </Alert>
        </Snackbar>
      </Portal>

      <Portal>
        <Snackbar
          open={openCard}
          autoHideDuration={6000}
          onClose={handleCloseCard}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <Card className="w-80 p-0">
            <CardContent className="flex flex-col">
              <Box className="mx-auto flex flex-row items-start">
                <Box className="flex flex-row items-start gap-4">
                  <NiDocumentFull size="large" className="text-primary flex-none" />
                  <Box className="flex flex-col items-start">
                    <Typography variant="subtitle1" className="mb-1">
                      Analysis is ready!
                    </Typography>
                    <Typography variant="body1" className="mb-2">
                      The calculations are completed and the report is ready.
                    </Typography>
                    <Button className="flex-none" size="tiny" color="primary" variant="pastel">
                      Download
                    </Button>
                  </Box>
                </Box>
                <Button
                  className="icon-only flex-none"
                  size="tiny"
                  color="text-secondary"
                  variant="text"
                  onClick={() => {
                    setOpenCard(false);
                  }}
                  startIcon={<NiCross size={"tiny"} />}
                />
              </Box>
            </CardContent>
          </Card>
        </Snackbar>
      </Portal>
    </Box>
  );
}
