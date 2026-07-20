import { Box, Card, CardContent, FormControl, FormLabel, Grid, Input, Typography } from "@mui/material";

export default function TextFieldStandardOutlined() {
  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Standard Outlined
          </Typography>
          <Box component="form" className="mb-0 flex flex-col">
            <FormControl className="outlined" variant="standard" size="small">
              <FormLabel component="label">Small</FormLabel>
              <Input placeholder="Small" />
            </FormControl>
            <FormControl className="outlined" variant="standard" size="small">
              <FormLabel component="label">Readonly</FormLabel>
              <Input placeholder="Readonly" readOnly value={"Readonly"} />
            </FormControl>
            <FormControl disabled className="outlined" variant="standard" size="small">
              <FormLabel component="label">Disabled</FormLabel>
              <Input placeholder="Disabled" defaultValue={"Disabled"} />
            </FormControl>
            <FormControl className="outlined" variant="standard" size="medium">
              <FormLabel component="label">Medium</FormLabel>
              <Input placeholder="Medium" />
            </FormControl>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
