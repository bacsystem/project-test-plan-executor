import { Box, Card, CardContent, Grid, TextField, Typography } from "@mui/material";

export default function TextFieldOutlined() {
  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Outlined
          </Typography>
          <Box component="form" className="mb-0 flex flex-col">
            <TextField label="Small" variant="outlined" size="small" />
            <TextField
              label="Small"
              variant="outlined"
              size="small"
              defaultValue={"Readonly"}
              slotProps={{ input: { readOnly: true } }}
            />
            <TextField label="Disabled" variant="outlined" size="small" disabled defaultValue={"Disabled"} />
            <TextField label="Medium" variant="outlined" size="medium" />
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
