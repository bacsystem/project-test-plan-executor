import {
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";

export default function SelectGrouping() {
  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Grouping
          </Typography>
          <FormControl fullWidth size="small" variant="standard" className="outlined">
            <InputLabel>Grouping</InputLabel>
            <Select
              defaultValue=""
              IconComponent={NiChevronDownSmall}
              MenuProps={{ className: "outlined" }}
              label="Grouping"
            >
              <ListSubheader>Category 1</ListSubheader>
              <MenuItem value={1}>Option 1</MenuItem>
              <MenuItem value={2}>Option 2</MenuItem>
              <ListSubheader>Category 2</ListSubheader>
              <MenuItem value={3}>Option 3</MenuItem>
              <MenuItem value={4}>Option 4</MenuItem>
            </Select>
          </FormControl>
        </CardContent>
      </Card>
    </Grid>
  );
}
