import { Box, Card, CardContent, Grid, TextField, Typography } from "@mui/material";

export default function TextFieldFormProps() {
  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Form Props
          </Typography>
          <Box component="form" className="mb-0 flex flex-col">
            <TextField required label="Required" defaultValue="Hello World" />
            <TextField disabled label="Disabled" defaultValue="Hello World" />
            <TextField label="Password" type="password" autoComplete="current-password" />
            <TextField
              label="Read Only"
              defaultValue="Hello World"
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
            />
            <TextField
              label="Number"
              type="number"
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
            <TextField label="Search field" type="search" />
            <TextField label="Helper text" defaultValue="Default Value" helperText="Some important text" />
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
