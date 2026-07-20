import {
  Autocomplete,
  Box,
  Card,
  CardContent,
  FormControl,
  FormLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";
import NiCross from "@/icons/nexture/ni-cross";

export default function AutocompleteStandardOutlined() {
  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Standard Outlined
          </Typography>
          <Box>
            <FormControl fullWidth>
              <FormLabel component="label">Small Single</FormLabel>
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
                renderInput={(params) => (
                  <TextField {...params} variant="standard" className="outlined" placeholder="Small Single" />
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
              <FormLabel component="label">Small Multiple</FormLabel>
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
                renderInput={(params) => (
                  <TextField {...params} variant="standard" className="outlined" placeholder="Small Multiple" />
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
              <FormLabel component="label">Medium Single</FormLabel>
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
                renderInput={(params) => (
                  <TextField {...params} variant="standard" className="outlined" placeholder="Medium Single" />
                )}
                slotProps={{
                  popper: { className: "outlined" },
                  chip: {
                    variant: "filled",
                  },
                }}
              />
            </FormControl>
            <FormControl fullWidth>
              <FormLabel component="label">Medium Multiple</FormLabel>
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
                renderInput={(params) => (
                  <TextField {...params} variant="standard" className="outlined" placeholder="Medium Multiple" />
                )}
                slotProps={{
                  popper: { className: "outlined" },
                  chip: {
                    variant: "filled",
                  },
                }}
              />
            </FormControl>
            <FormControl fullWidth>
              <FormLabel component="label" disabled>
                Disabled
              </FormLabel>
              <Autocomplete
                disabled
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
                  <TextField {...params} variant="standard" className="outlined" placeholder="Disabled" />
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
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
