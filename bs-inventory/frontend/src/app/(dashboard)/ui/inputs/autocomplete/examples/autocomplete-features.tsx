import React from "react";

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

export default function AutocompleteFeatures() {
  const [valueControlled, setValueControlled] = React.useState<string | null>(null);

  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Features
          </Typography>
          <Box>
            <FormControl fullWidth>
              <FormLabel component="label">Disable Close on Select</FormLabel>
              <Autocomplete
                disableCloseOnSelect
                multiple
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
                  <TextField
                    {...params}
                    placeholder="Disable Close on Select"
                    variant="standard"
                    className="outlined"
                  />
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
              <FormLabel component="label">Clear on Escape</FormLabel>
              <Autocomplete
                clearOnEscape
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
                  <TextField {...params} placeholder="Clear on Escape" variant="standard" className="outlined" />
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
              <FormLabel component="label">Disable Clearable</FormLabel>
              <Autocomplete
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
                  <TextField {...params} placeholder="Disable Clearable" variant="standard" className="outlined" />
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
              <FormLabel component="label">Include Input in List</FormLabel>
              <Autocomplete
                includeInputInList
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
                  <TextField {...params} placeholder="Include Input in List" variant="standard" className="outlined" />
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
              <FormLabel component="label">Flat</FormLabel>
              <Autocomplete
                size="small"
                popupIcon={<NiChevronDownSmall />}
                clearIcon={<NiCross />}
                options={[
                  "The Shawshank Redemption",
                  "The Godfather",
                  "The Godfather: Part II",
                  "The Dark Knight",
                  "12 Angry Men",
                ]}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Flat" variant="standard" className="outlined" />
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
              <FormLabel component="label">Controlled</FormLabel>
              <Autocomplete
                value={valueControlled}
                onChange={(event: React.SyntheticEvent, newValue: string | null) => {
                  setValueControlled(newValue);
                }}
                size="small"
                popupIcon={<NiChevronDownSmall />}
                clearIcon={<NiCross />}
                options={[
                  "The Shawshank Redemption",
                  "The Godfather",
                  "The Godfather: Part II",
                  "The Dark Knight",
                  "12 Angry Men",
                ]}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Controlled" variant="standard" className="outlined" />
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
              <FormLabel component="label">Auto Complete</FormLabel>
              <Autocomplete
                autoComplete
                includeInputInList
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
                  <TextField {...params} placeholder="Auto Complete" variant="standard" className="outlined" />
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
              <FormLabel component="label">Disable List Wrap</FormLabel>
              <Autocomplete
                disableListWrap
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
                  <TextField {...params} placeholder="Disable List Wrap" variant="standard" className="outlined" />
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
              <FormLabel component="label">Open on Focus</FormLabel>
              <Autocomplete
                openOnFocus
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
                  <TextField {...params} placeholder="Open on Focus" variant="standard" className="outlined" />
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
              <FormLabel component="label">Auto Highlight</FormLabel>
              <Autocomplete
                autoHighlight
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
                  <TextField {...params} placeholder="Auto Highlight" variant="standard" className="outlined" />
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
              <FormLabel component="label">Auto Select</FormLabel>
              <Autocomplete
                autoSelect
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
                  <TextField {...params} placeholder="Auto Select" variant="standard" className="outlined" />
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
                  <TextField {...params} placeholder="Disabled" variant="standard" className="outlined" />
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
              <FormLabel component="label">Disable Portal</FormLabel>
              <Autocomplete
                disablePortal
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
                  <TextField {...params} placeholder="Disable Portal" variant="standard" className="outlined" />
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
              <FormLabel component="label">Blur on Select</FormLabel>
              <Autocomplete
                blurOnSelect
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
                  <TextField {...params} placeholder="Blur on Select" variant="standard" className="outlined" />
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
              <FormLabel component="label">Clear on Blur</FormLabel>
              <Autocomplete
                clearOnBlur
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
                  <TextField {...params} placeholder="Clear on Blur" variant="standard" className="outlined" />
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
              <FormLabel component="label">Read Only</FormLabel>
              <Autocomplete
                readOnly
                size="small"
                popupIcon={<NiChevronDownSmall />}
                clearIcon={<NiCross />}
                defaultValue="The Shawshank Redemption"
                options={[
                  "The Shawshank Redemption",
                  "The Godfather",
                  "The Godfather: Part II",
                  "The Dark Knight",
                  "12 Angry Men",
                ]}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Read Only" variant="standard" className="outlined" />
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
