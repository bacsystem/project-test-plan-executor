import { Autocomplete, Card, CardContent, FormControl, FormLabel, Grid, TextField, Typography } from "@mui/material";

import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";
import NiCross from "@/icons/nexture/ni-cross";

export default function AutocompleteDisabledOptions() {
  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Disabled Options
          </Typography>

          <FormControl fullWidth>
            <FormLabel component="label">Disabled Options</FormLabel>
            <Autocomplete
              size="small"
              popupIcon={<NiChevronDownSmall />}
              clearIcon={<NiCross />}
              options={timeSlots}
              getOptionDisabled={(option) => option === timeSlots[0] || option === timeSlots[2]}
              renderInput={(params) => (
                <TextField {...params} placeholder="Disabled Options" variant="standard" className="outlined" />
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

const timeSlots = Array.from(new Array(24 * 2)).map(
  (_, index) => `${index < 20 ? "0" : ""}${Math.floor(index / 2)}:${index % 2 === 0 ? "00" : "30"}`,
);
