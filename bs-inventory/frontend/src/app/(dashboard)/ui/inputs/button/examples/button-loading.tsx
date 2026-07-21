import React from "react";

import { Box, Button, Card, CardContent, FormControlLabel, Grid, Switch, Typography } from "@mui/material";

import NiArrowOutUp from "@/icons/nexture/ni-arrow-out-up";
import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";
import NiFloppyDisk from "@/icons/nexture/ni-floppy-disk";
import NiSendRight from "@/icons/nexture/ni-send-right";

export default function ButtonLoading() {
  const [loading, setLoading] = React.useState(true);
  function handleClick() {
    setLoading(true);
  }

  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Loading Button
          </Typography>

          <FormControlLabel
            className="mb-4"
            control={<Switch checked={loading} onChange={() => setLoading(!loading)} name="loading" color="primary" />}
            label="Loading"
          />

          <Box className="row mb-4 flex flex-wrap items-start gap-2">
            <Button
              size="large"
              onClick={handleClick}
              endIcon={<NiSendRight size={"large"} />}
              loading={loading}
              loadingPosition="end"
              variant="contained"
              color="primary"
            >
              Send
            </Button>
            <Button
              size="large"
              onClick={handleClick}
              startIcon={<NiFloppyDisk size={"large"} />}
              loading={loading}
              loadingPosition="start"
              variant="outlined"
              color="primary"
            >
              Save
            </Button>
            <Button
              size="large"
              onClick={handleClick}
              startIcon={<NiArrowOutUp size={"large"} />}
              loading={loading}
              loadingPosition="start"
              variant="pastel"
              color="primary"
            >
              Upload
            </Button>
            <Button
              size="large"
              onClick={handleClick}
              endIcon={<NiChevronRightSmall size={"large"} />}
              loading={loading}
              loadingPosition="end"
              variant="text"
              color="primary"
            >
              Next
            </Button>
            <Button onClick={handleClick} loading={loading} variant="contained" size="large" color="primary">
              Fetch
            </Button>
            <Button onClick={handleClick} loading={loading} variant="outlined" size="large" color="primary">
              Fetch
            </Button>
            <Button onClick={handleClick} loading={loading} variant="pastel" size="large" color="primary">
              Fetch
            </Button>
            <Button onClick={handleClick} loading={loading} variant="text" size="large" color="primary">
              Fetch
            </Button>
          </Box>

          <Box className="row mb-4 flex flex-wrap items-start gap-2">
            <Button
              size="medium"
              onClick={handleClick}
              endIcon={<NiSendRight size={"medium"} />}
              loading={loading}
              loadingPosition="end"
              variant="contained"
              color="primary"
            >
              Send
            </Button>
            <Button
              size="medium"
              onClick={handleClick}
              startIcon={<NiFloppyDisk size={"medium"} />}
              loading={loading}
              loadingPosition="start"
              variant="outlined"
              color="primary"
            >
              Save
            </Button>
            <Button
              size="medium"
              onClick={handleClick}
              startIcon={<NiArrowOutUp size={"medium"} />}
              loading={loading}
              loadingPosition="start"
              variant="pastel"
              color="primary"
            >
              Upload
            </Button>
            <Button
              size="medium"
              onClick={handleClick}
              endIcon={<NiChevronRightSmall size={"medium"} />}
              loading={loading}
              loadingPosition="end"
              variant="text"
              color="primary"
            >
              Next
            </Button>
            <Button onClick={handleClick} loading={loading} variant="contained" size="medium" color="primary">
              Fetch
            </Button>
            <Button onClick={handleClick} loading={loading} variant="outlined" size="medium" color="primary">
              Fetch
            </Button>
            <Button onClick={handleClick} loading={loading} variant="pastel" size="medium" color="primary">
              Fetch
            </Button>
            <Button onClick={handleClick} loading={loading} variant="text" size="medium" color="primary">
              Fetch
            </Button>
          </Box>

          <Box className="row mb-4 flex flex-wrap items-start gap-2">
            <Button
              size="small"
              onClick={handleClick}
              endIcon={<NiSendRight size={"small"} />}
              loading={loading}
              loadingPosition="end"
              variant="contained"
              color="primary"
            >
              Send
            </Button>
            <Button
              size="small"
              onClick={handleClick}
              startIcon={<NiFloppyDisk size={"small"} />}
              loading={loading}
              loadingPosition="start"
              variant="outlined"
              color="primary"
            >
              Save
            </Button>
            <Button
              size="small"
              onClick={handleClick}
              startIcon={<NiArrowOutUp size={"small"} />}
              loading={loading}
              loadingPosition="start"
              variant="pastel"
              color="primary"
            >
              Upload
            </Button>
            <Button
              size="small"
              onClick={handleClick}
              endIcon={<NiChevronRightSmall size={"small"} />}
              loading={loading}
              loadingPosition="end"
              variant="text"
              color="primary"
            >
              Next
            </Button>
            <Button onClick={handleClick} loading={loading} variant="contained" size="small" color="primary">
              Fetch
            </Button>
            <Button onClick={handleClick} loading={loading} variant="outlined" size="small" color="primary">
              Fetch
            </Button>
            <Button onClick={handleClick} loading={loading} variant="pastel" size="small" color="primary">
              Fetch
            </Button>
            <Button onClick={handleClick} loading={loading} variant="text" size="small" color="primary">
              Fetch
            </Button>
          </Box>

          <Box className="row mb-4 flex flex-wrap items-start gap-2">
            <Button
              size="tiny"
              onClick={handleClick}
              endIcon={<NiSendRight size={"small"} />}
              loading={loading}
              loadingPosition="end"
              variant="contained"
              color="primary"
            >
              Send
            </Button>
            <Button
              size="tiny"
              onClick={handleClick}
              startIcon={<NiFloppyDisk size={"small"} />}
              loading={loading}
              loadingPosition="start"
              variant="outlined"
              color="primary"
            >
              Save
            </Button>
            <Button
              size="tiny"
              onClick={handleClick}
              startIcon={<NiArrowOutUp size={"small"} />}
              loading={loading}
              loadingPosition="start"
              variant="pastel"
              color="primary"
            >
              Upload
            </Button>
            <Button
              size="tiny"
              onClick={handleClick}
              endIcon={<NiChevronRightSmall size={"small"} />}
              loading={loading}
              loadingPosition="end"
              variant="text"
              color="primary"
            >
              Next
            </Button>
            <Button onClick={handleClick} loading={loading} variant="contained" size="tiny" color="primary">
              Fetch
            </Button>
            <Button onClick={handleClick} loading={loading} variant="outlined" size="tiny" color="primary">
              Fetch
            </Button>
            <Button onClick={handleClick} loading={loading} variant="pastel" size="tiny" color="primary">
              Fetch
            </Button>
            <Button onClick={handleClick} loading={loading} variant="text" size="tiny" color="primary">
              Fetch
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
