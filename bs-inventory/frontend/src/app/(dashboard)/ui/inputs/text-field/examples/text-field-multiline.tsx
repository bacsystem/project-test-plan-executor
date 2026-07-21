import { Box, Card, CardContent, FormControl, FormLabel, Grid, TextField, Typography } from "@mui/material";

export default function TextFieldMultiline() {
  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Multiline
          </Typography>
          <Box component="form" className="mb-0 flex flex-col">
            <FormControl variant="standard">
              <FormLabel component="label">Multiline</FormLabel>
              <TextField label="Multiline" multiline maxRows={4} variant="standard" className="mb-0" size="small" />
            </FormControl>
            <FormControl variant="standard" size="small">
              <FormLabel component="label">Multiline</FormLabel>
              <TextField
                label="Multiline"
                multiline
                rows={4}
                defaultValue="Default Value"
                variant="standard"
                size="small"
                className="mb-0"
              />
            </FormControl>
            <TextField label="Multiline" size="small" multiline maxRows={4} variant="filled" />
            <TextField
              label="Multiline"
              size="small"
              multiline
              rows={4}
              defaultValue="Default Value"
              variant="filled"
            />

            <FormControl variant="standard" size="small">
              <FormLabel component="label">Multiline</FormLabel>
              <TextField
                label="Multiline"
                multiline
                maxRows={4}
                variant="standard"
                className="outlined mb-0"
                size="small"
              />
            </FormControl>
            <FormControl variant="standard" size="small">
              <FormLabel component="label">Multiline</FormLabel>
              <TextField
                className="outlined mb-0"
                label="Multiline"
                multiline
                rows={4}
                defaultValue="Default Value"
                variant="standard"
                size="small"
              />
            </FormControl>
            <TextField label="Multiline" size="small" multiline maxRows={4} />
            <TextField label="Multiline" size="small" multiline rows={4} defaultValue="Default Value" />
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
