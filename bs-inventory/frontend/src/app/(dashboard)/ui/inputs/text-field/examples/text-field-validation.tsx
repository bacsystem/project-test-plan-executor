import { Box, Card, CardContent, FormControl, FormLabel, Grid, TextField, Typography } from "@mui/material";

export default function TextFieldValidation() {
  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Validation
          </Typography>
          <Box component="form" className="mb-0 flex flex-col">
            <TextField error label="Error" defaultValue="Hello World" size="small" />
            <TextField error label="Error" defaultValue="Hello World" helperText="Incorrect entry." size="small" />

            <FormControl variant="standard">
              <FormLabel component="label">Error</FormLabel>
              <TextField
                error
                label="Error"
                defaultValue="Hello World"
                variant="standard"
                className="outlined"
                size="small"
              />
            </FormControl>
            <FormControl variant="standard">
              <FormLabel component="label">Error</FormLabel>
              <TextField
                error
                label="Error"
                defaultValue="Hello World"
                helperText="Incorrect entry."
                variant="standard"
                className="outlined"
                size="small"
              />
            </FormControl>
            <TextField error label="Error" defaultValue="Hello World" variant="filled" size="small" />
            <TextField
              size="small"
              error
              label="Error"
              defaultValue="Hello World"
              helperText="Incorrect entry."
              variant="filled"
            />
            <FormControl variant="standard">
              <FormLabel component="label">Error</FormLabel>
              <TextField error label="Error" defaultValue="Hello World" variant="standard" size="small" />
            </FormControl>
            <FormControl variant="standard">
              <FormLabel component="label">Error</FormLabel>
              <TextField
                error
                label="Error"
                defaultValue="Hello World"
                helperText="Incorrect entry."
                variant="standard"
                size="small"
              />
            </FormControl>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
