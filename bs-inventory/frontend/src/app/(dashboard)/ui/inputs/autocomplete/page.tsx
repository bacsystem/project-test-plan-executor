"use client";

import AutocompleteAsyncRequest from "./examples/autocomplete-async-request";
import AutocompleteCountrySelect from "./examples/autocomplete-country-select";
import AutocompleteCreatable from "./examples/autocomplete-creatable";
import AutocompleteDisabledOptions from "./examples/autocomplete-disabled-options";
import AutocompleteFeatures from "./examples/autocomplete-features";
import AutocompleteFilled from "./examples/autocomplete-filled";
import AutocompleteFreeSolo from "./examples/autocomplete-free-solo";
import AutocompleteGrouped from "./examples/autocomplete-grouped";
import AutocompleteHighlight from "./examples/autocomplete-highlight";
import AutocompleteIconSelect from "./examples/autocomplete-icon-select";
import AutocompleteMultipleValues from "./examples/autocomplete-multiple-values";
import AutocompleteOutlined from "./examples/autocomplete-outlined";
import AutocompleteStandard from "./examples/autocomplete-standard";
import AutocompleteStandardOutlined from "./examples/autocomplete-standard-outlined";
import AutocompleteUserSelect from "./examples/autocomplete-user-select";
import Link from "next/link";
import React from "react";

import { Breadcrumbs, Typography } from "@mui/material";
import { Grid } from "@mui/material";

export default function AutocompletePage() {
  return (
    <Grid container spacing={5}>
      <Grid size={12} className="mb-2">
        <Typography variant="h1" component="h1" className="mb-0">
          Autocomplete
        </Typography>
        <Breadcrumbs>
          <Link color="inherit" href="/dashboards/default">
            Home
          </Link>
          <Link color="inherit" href="/ui">
            UI Elements
          </Link>
          <Link color="inherit" href="/ui/inputs">
            Inputs
          </Link>
          <Typography variant="body2">Autocomplete</Typography>
        </Breadcrumbs>
      </Grid>

      <AutocompleteStandard />
      <AutocompleteStandardOutlined />
      <AutocompleteFilled />
      <AutocompleteOutlined />
      <AutocompleteFeatures />
      <AutocompleteUserSelect />
      <AutocompleteIconSelect />
      <AutocompleteCountrySelect />
      <AutocompleteFreeSolo />
      <AutocompleteCreatable />
      <AutocompleteGrouped />
      <AutocompleteDisabledOptions />
      <AutocompleteAsyncRequest />
      <AutocompleteMultipleValues />
      <AutocompleteHighlight />
    </Grid>
  );
}
