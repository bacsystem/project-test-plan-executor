import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";

import {
  Alert,
  AlertTitle,
  Box,
  Button,
  capitalize,
  Card,
  CardContent,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Tooltip,
  Typography,
} from "@mui/material";

import { CheckboxSmallChecked, CheckboxSmallEmptyOutlined } from "@/icons/form/mui-checkbox";
import NiCrossSquare from "@/icons/nexture/ni-cross-square";

type InputErrorProps = {
  title: string;
};

const InputErrorTooltip = ({ title }: InputErrorProps) => {
  return (
    <Box className="relative z-10">
      <Tooltip title={title} arrow className="absolute -top-0.5">
        <Button
          startIcon={<NiCrossSquare size="small" />}
          color="error"
          size="small"
          className="group icon-only bg-background-paper! p-1! outline-0!"
        ></Button>
      </Tooltip>
    </Box>
  );
};

const validationSchema = yup.object({
  Checkbox: yup.array().min(1, "At least one needs to be selected").required("Field is required"),
  CheckboxSingle: yup.bool().oneOf([true], "The field needs to be checked").required("Field is required"),
});

export default function FormikCheckbox() {
  const [submitted, setSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: {
      Checkbox: [],
      CheckboxSingle: false,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(submitted);
      alert(JSON.stringify(values, null, 2));
    },
    validateOnBlur: false,
    validateOnMount: false,
  });

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="h6" className="card-title">
          Checkbox
        </Typography>
        <Box
          component="form"
          onSubmit={(event) => {
            setSubmitted(true);
            formik.handleSubmit(event);
          }}
        >
          {/* Multiple Checkboxes */}
          <FormControl fullWidth>
            <FormLabel className="flex flex-row gap-1">
              <Box>Multiple</Box>
              {formik.touched.Checkbox && formik.errors.Checkbox && (
                <InputErrorTooltip title={formik.errors.Checkbox as string} />
              )}
            </FormLabel>
            <FormGroup className="mb-0 flex flex-col gap-2">
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    name="Checkbox"
                    value="Ten"
                    onChange={formik.handleChange}
                    icon={<CheckboxSmallEmptyOutlined />}
                    checkedIcon={<CheckboxSmallChecked />}
                  />
                }
                label="Ten"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    name="Checkbox"
                    value="Twenty"
                    onChange={formik.handleChange}
                    icon={<CheckboxSmallEmptyOutlined />}
                    checkedIcon={<CheckboxSmallChecked />}
                  />
                }
                label="Twenty"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    name="Checkbox"
                    value="Thirty"
                    onChange={formik.handleChange}
                    icon={<CheckboxSmallEmptyOutlined />}
                    checkedIcon={<CheckboxSmallChecked />}
                  />
                }
                label="Thirty"
              />
            </FormGroup>
          </FormControl>

          {/* Single Checkbox */}
          <FormControl fullWidth className="flex flex-row gap-1">
            <FormControlLabel
              control={
                <Checkbox
                  name="CheckboxSingle"
                  value={false}
                  size="small"
                  onChange={formik.handleChange}
                  icon={<CheckboxSmallEmptyOutlined />}
                  checkedIcon={<CheckboxSmallChecked />}
                />
              }
              label="Checkbox Single"
            />
            {formik.touched.CheckboxSingle && formik.errors.CheckboxSingle && (
              <InputErrorTooltip title={formik.errors.CheckboxSingle as string} />
            )}
          </FormControl>

          {/* All Form Errors */}
          {submitted && !formik.isValid && (
            <Alert severity="error" icon={<NiCrossSquare />} className="neutral mb-4">
              <AlertTitle variant="subtitle2">The following inputs have errors!</AlertTitle>
              {Object.entries(formik.errors).map(([key, value]) => {
                return (
                  <Box className="flex flex-row gap-0.5" key={crypto.randomUUID()}>
                    <Typography className="text-error">{capitalize(key)}:</Typography>
                    <Typography className="text-text-primary">{value}</Typography>
                  </Box>
                );
              })}
            </Alert>
          )}

          <Button color="primary" variant="contained" type="submit">
            Submit
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
