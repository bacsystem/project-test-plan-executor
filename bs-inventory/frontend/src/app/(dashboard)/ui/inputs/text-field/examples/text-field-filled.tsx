import { Box, Card, CardContent, Grid, TextField, Typography } from "@mui/material";

export default function TextFieldFilled() {
  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Filled
          </Typography>
          <Box component="form" className="mb-0 flex flex-col">
            <TextField label="Small" variant="filled" size="small" />
            <TextField
              label="Readonly"
              variant="filled"
              size="small"
              defaultValue={"Readonly"}
              slotProps={{ input: { readOnly: true } }}
            />
            <TextField label="Disabled" variant="filled" size="small" disabled defaultValue={"Disabled"} />
            <TextField label="Medium" variant="filled" size="medium" />
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
