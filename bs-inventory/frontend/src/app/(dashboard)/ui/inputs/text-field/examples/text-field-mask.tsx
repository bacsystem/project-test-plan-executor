import * as React from "react";
import { IMaskInput } from "react-imask";

import { Card, CardContent, FormLabel, Grid } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const TextMaskCustom = React.forwardRef<HTMLInputElement, CustomProps>(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="(#00) 000-0000"
      definitions={{
        "#": /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

export default function TextFieldMask() {
  const [values, setValues] = React.useState({
    textmask: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <FormControl className="outlined mb-0 w-full max-w-sm" variant="standard" size="small">
            <FormLabel component="label">Input Mask</FormLabel>
            <Input
              value={values.textmask}
              onChange={handleChange}
              name="textmask"
              inputComponent={TextMaskCustom as any}
              placeholder="(000) 000-0000"
            />
          </FormControl>
        </CardContent>
      </Card>
    </Grid>
  );
}
