import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";

import {
  Alert,
  AlertTitle,
  Autocomplete,
  Box,
  Button,
  capitalize,
  Card,
  CardContent,
  FormControl,
  FormLabel,
  Input,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";
import NiCross from "@/icons/nexture/ni-cross";
import NiCrossSquare from "@/icons/nexture/ni-cross-square";

const validationSchema = yup.object({
  Input: yup.string().required("The field is required").email("Enter a valid email"),
  Select: yup.string().required("The field is required"),
  Autocomplete: yup.string().required("The field is required"),
  Textarea: yup.string().required("The field is required"),
});

type InputErrorProps = {
  title: string;
};

const InputErrorTooltip = ({ title }: InputErrorProps) => {
  return (
    <Box className="relative z-10 w-full">
      <Tooltip title={title} arrow className="absolute inset-e-1 top-0.5">
        <Button
          startIcon={<NiCrossSquare size="small" />}
          color="error"
          size="small"
          className="group icon-only bg-grey-25! outline-0!"
        ></Button>
      </Tooltip>
    </Box>
  );
};

export default function FormikStandard() {
  const [submitted, setSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: {
      Input: "",
      Select: "",
      Autocomplete: "",
      Textarea: "",
    },
    validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
    validateOnBlur: false,
    validateOnMount: false,
  });

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="h6" className="card-title">
          Standard
        </Typography>

        <Box
          component="form"
          onSubmit={(event) => {
            setSubmitted(true);
            formik.handleSubmit(event);
          }}
        >
          {/* Input */}
          <FormControl variant="standard" size="small" fullWidth>
            <FormLabel component="label">Input</FormLabel>
            {formik.touched.Input && formik.errors.Input && <InputErrorTooltip title={formik.errors.Input} />}
            <Input
              id="Input"
              name="Input"
              value={formik.values.Input}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </FormControl>

          {/* Select */}
          <FormControl fullWidth size="small" variant="standard">
            <FormLabel component="label">Select</FormLabel>
            {formik.touched.Select && formik.errors.Select && <InputErrorTooltip title={formik.errors.Select} />}
            <Select
              value={formik.values.Select}
              label="Select"
              id="Select"
              name="Select"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              IconComponent={NiChevronDownSmall}
              MenuProps={{ className: "outlined" }}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>

          {/* Autocomplete */}
          <FormControl fullWidth>
            <FormLabel component="label">Autocomplete</FormLabel>
            {formik.touched.Autocomplete && formik.errors.Autocomplete && (
              <InputErrorTooltip title={formik.errors.Autocomplete} />
            )}
            <Autocomplete
              id="Autocomplete"
              size="small"
              popupIcon={<NiChevronDownSmall />}
              clearIcon={<NiCross />}
              options={["10", "20", "30"]}
              renderInput={(params) => <TextField {...params} variant="standard" />}
              onChange={(e: object, value: any | null) => {
                formik.setFieldValue("Autocomplete", value);
              }}
              slotProps={{
                popper: { className: "outlined" },
              }}
            />
          </FormControl>

          {/* Textarea */}
          <FormControl variant="standard" size="small" fullWidth>
            <FormLabel component="label">Textarea</FormLabel>
            {formik.touched.Textarea && formik.errors.Textarea && <InputErrorTooltip title={formik.errors.Textarea} />}
            <Input
              id="Textarea"
              name="Textarea"
              multiline
              rows={4}
              value={formik.values.Textarea}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
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
