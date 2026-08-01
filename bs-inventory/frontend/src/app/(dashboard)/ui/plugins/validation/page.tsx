"use client";

import FormikCheckbox from "./examples/formik-checkbox";
import FormikFilled from "./examples/formik-filled";
import FormikOutlined from "./examples/formik-outlined";
import FormikRadiobutton from "./examples/formik-radiobutton";
import FormikStandard from "./examples/formik-standard";
import FormikStandardOutlined from "./examples/formik-standard-outlined";
import FormikSwitch from "./examples/formik-switch";
import Link from "next/link";

import { Breadcrumbs, Typography } from "@mui/material";
import { Grid } from "@mui/material";

export default function Page() {
  return (
    <Grid container spacing={5}>
      <Grid size={12} className="mb-2">
        <Typography variant="h1" component="h1" className="mb-0">
          Validation
        </Typography>
        <Breadcrumbs>
          <Link color="inherit" href="/dashboards/default">
            Home
          </Link>
          <Link color="inherit" href="/ui">
            UI Elements
          </Link>
          <Link color="inherit" href="/ui/plugins">
            Plugins
          </Link>
          <Typography variant="body2">Validation</Typography>
        </Breadcrumbs>
      </Grid>

      <Grid size={12}>
        <FormikStandard />
      </Grid>

      <Grid size={12}>
        <FormikStandardOutlined />
      </Grid>

      <Grid size={12}>
        <FormikOutlined />
      </Grid>

      <Grid size={12}>
        <FormikFilled />
      </Grid>

      <Grid size={12}>
        <FormikCheckbox />
      </Grid>

      <Grid size={12}>
        <FormikSwitch />
      </Grid>

      <Grid size={12}>
        <FormikRadiobutton />
      </Grid>
    </Grid>
  );
}
