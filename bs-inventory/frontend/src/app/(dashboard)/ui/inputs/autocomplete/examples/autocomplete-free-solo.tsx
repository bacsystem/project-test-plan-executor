import { Autocomplete, Card, CardContent, FormControl, FormLabel, Grid, TextField, Typography } from "@mui/material";

import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";
import NiCross from "@/icons/nexture/ni-cross";

export default function AutocompleteFreeSolo() {
  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Free Solo
          </Typography>

          <FormControl fullWidth>
            <FormLabel component="label">Free Solo</FormLabel>
            <Autocomplete
              freeSolo
              size="small"
              popupIcon={<NiChevronDownSmall />}
              clearIcon={<NiCross />}
              options={[
                { label: "The Shawshank Redemption", year: 1994 },
                { label: "The Godfather", year: 1972 },
                { label: "The Godfather: Part II", year: 1974 },
                { label: "The Dark Knight", year: 2008 },
                { label: "12 Angry Men", year: 1957 },
              ]}
              renderInput={(params) => (
                <TextField {...params} placeholder="Free Solo" variant="standard" className="outlined" />
              )}
              slotProps={{
                popper: { className: "outlined" },
                chip: {
                  variant: "filled",
                  size: "small",
                },
              }}
            />
          </FormControl>

          <FormControl fullWidth>
            <FormLabel component="label">Search Input</FormLabel>
            <Autocomplete
              freeSolo
              disableClearable
              size="small"
              popupIcon={<NiChevronDownSmall />}
              clearIcon={<NiCross />}
              options={[
                { label: "The Shawshank Redemption", year: 1994 },
                { label: "The Godfather", year: 1972 },
                { label: "The Godfather: Part II", year: 1974 },
                { label: "The Dark Knight", year: 2008 },
                { label: "12 Angry Men", year: 1957 },
              ]}
              renderInput={(params) => (
                <TextField {...params} placeholder="Search Input" variant="standard" className="outlined" />
              )}
              slotProps={{
                popper: { className: "outlined" },
                chip: {
                  variant: "filled",
                  size: "small",
                },
              }}
            />
          </FormControl>
        </CardContent>
      </Card>
    </Grid>
  );
}
