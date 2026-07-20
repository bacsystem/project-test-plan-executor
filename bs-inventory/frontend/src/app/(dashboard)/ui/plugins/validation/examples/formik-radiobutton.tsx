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
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Tooltip,
  Typography,
} from "@mui/material";

import { RadiobuttonSmallChecked, RadiobuttonSmallEmptyOutlined } from "@/icons/form/mui-radiobutton";
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
  Radiobutton: yup.string().required("Field is required"),
  RadiobuttonSingle: yup.string().required("Field is required"),
});

export default function FormikRadiobutton() {
  const [submitted, setSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: {
      Radiobutton: "",
      RadiobuttonSingle: "",
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
          Radiobutton
        </Typography>
        <Box
          component="form"
          onSubmit={(event) => {
            setSubmitted(true);
            formik.handleSubmit(event);
          }}
        >
          {/* Multiple Radiobuttons */}
          <FormControl fullWidth>
            <FormLabel className="flex flex-row gap-1">
              <Box>Multiple</Box>
              {formik.touched.Radiobutton && formik.errors.Radiobutton && (
                <InputErrorTooltip title={formik.errors.Radiobutton as string} />
              )}
            </FormLabel>
            <RadioGroup className="mb-0 flex flex-col gap-2" name="Radiobutton" onChange={formik.handleChange}>
              <FormControlLabel
                control={
                  <Radio
                    size="small"
                    value="Ten"
                    icon={<RadiobuttonSmallEmptyOutlined />}
                    checkedIcon={<RadiobuttonSmallChecked />}
                  />
                }
                label="Ten"
                value="Ten"
              />
              <FormControlLabel
                control={
                  <Radio
                    size="small"
                    value="Twenty"
                    icon={<RadiobuttonSmallEmptyOutlined />}
                    checkedIcon={<RadiobuttonSmallChecked />}
                  />
                }
                label="Twenty"
                value="Twenty"
              />
              <FormControlLabel
                control={
                  <Radio
                    size="small"
                    value="Thirty"
                    icon={<RadiobuttonSmallEmptyOutlined />}
                    checkedIcon={<RadiobuttonSmallChecked />}
                  />
                }
                label="Thirty"
                value="Thirty"
              />
            </RadioGroup>
          </FormControl>

          {/* Single Radio */}
          <FormControl fullWidth className="flex flex-row gap-1">
            <FormControlLabel
              control={
                <Radio
                  name="RadiobuttonSingle"
                  value="RadiobuttonSingle"
                  size="small"
                  onChange={formik.handleChange}
                  icon={<RadiobuttonSmallEmptyOutlined />}
                  checkedIcon={<RadiobuttonSmallChecked />}
                />
              }
              label="Radiobutton Single"
            />
            {formik.touched.RadiobuttonSingle && formik.errors.RadiobuttonSingle && (
              <InputErrorTooltip title={formik.errors.RadiobuttonSingle as string} />
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
