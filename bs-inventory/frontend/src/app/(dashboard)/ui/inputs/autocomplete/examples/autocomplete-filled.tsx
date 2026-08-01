import { Autocomplete, Box, Card, CardContent, Grid, TextField, Typography } from "@mui/material";

import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";
import NiCross from "@/icons/nexture/ni-cross";

export default function AutocompleteFilled() {
  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Filled
          </Typography>
          <Box>
            <Autocomplete
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
              renderInput={(params) => <TextField {...params} label="Small Single" variant="filled" />}
              slotProps={{
                popper: { className: "outlined" },
                chip: {
                  variant: "outlined",
                  size: "small",
                },
              }}
            />
            <Autocomplete
              size="small"
              multiple
              popupIcon={<NiChevronDownSmall />}
              clearIcon={<NiCross />}
              options={[
                { label: "The Shawshank Redemption", year: 1994 },
                { label: "The Godfather", year: 1972 },
                { label: "The Godfather: Part II", year: 1974 },
                { label: "The Dark Knight", year: 2008 },
                { label: "12 Angry Men", year: 1957 },
              ]}
              renderInput={(params) => <TextField {...params} label="Small Multiple" variant="filled" />}
              slotProps={{
                popper: { className: "outlined" },
                chip: {
                  variant: "outlined",
                  size: "small",
                },
              }}
            />
            <Autocomplete
              popupIcon={<NiChevronDownSmall />}
              clearIcon={<NiCross />}
              options={[
                { label: "The Shawshank Redemption", year: 1994 },
                { label: "The Godfather", year: 1972 },
                { label: "The Godfather: Part II", year: 1974 },
                { label: "The Dark Knight", year: 2008 },
                { label: "12 Angry Men", year: 1957 },
              ]}
              renderInput={(params) => <TextField {...params} label="Medium Single" variant="filled" />}
              slotProps={{
                popper: { className: "outlined" },
                chip: {
                  variant: "outlined",
                },
              }}
            />
            <Autocomplete
              multiple
              popupIcon={<NiChevronDownSmall />}
              clearIcon={<NiCross />}
              options={[
                { label: "The Shawshank Redemption", year: 1994 },
                { label: "The Godfather", year: 1972 },
                { label: "The Godfather: Part II", year: 1974 },
                { label: "The Dark Knight", year: 2008 },
                { label: "12 Angry Men", year: 1957 },
              ]}
              renderInput={(params) => <TextField {...params} label="Medium Multiple" variant="filled" />}
              slotProps={{
                popper: { className: "outlined" },
                chip: {
                  variant: "outlined",
                },
              }}
            />
            <Autocomplete
              size="small"
              disabled
              popupIcon={<NiChevronDownSmall />}
              clearIcon={<NiCross />}
              options={[
                { label: "The Shawshank Redemption", year: 1994 },
                { label: "The Godfather", year: 1972 },
                { label: "The Godfather: Part II", year: 1974 },
                { label: "The Dark Knight", year: 2008 },
                { label: "12 Angry Men", year: 1957 },
              ]}
              renderInput={(params) => <TextField {...params} label="Disabled" variant="filled" />}
              slotProps={{
                popper: { className: "outlined" },
                chip: {
                  variant: "outlined",
                  size: "small",
                },
              }}
            />
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
