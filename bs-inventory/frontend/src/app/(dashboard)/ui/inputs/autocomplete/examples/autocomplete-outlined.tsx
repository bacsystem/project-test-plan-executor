import { Autocomplete, Box, Card, CardContent, Grid, TextField, Typography } from "@mui/material";

import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";
import NiCross from "@/icons/nexture/ni-cross";

export default function AutocompleteOutlined() {
  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Outlined
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
              renderInput={(params) => <TextField {...params} label="Small Single" variant="outlined" />}
              slotProps={{
                popper: { className: "outlined" },
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
              renderInput={(params) => <TextField {...params} label="Small Multiple" variant="outlined" />}
              slotProps={{
                popper: { className: "outlined" },
                chip: {
                  variant: "filled",
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
              renderInput={(params) => <TextField {...params} label="Medium Single" variant="outlined" />}
              slotProps={{
                popper: { className: "outlined" },
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
              renderInput={(params) => <TextField {...params} label="Medium Multiple" variant="outlined" />}
              slotProps={{
                popper: { className: "outlined" },
                chip: {
                  variant: "filled",
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
              renderInput={(params) => <TextField {...params} label="Disabled" variant="outlined" />}
              slotProps={{
                popper: { className: "outlined" },
              }}
            />
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
