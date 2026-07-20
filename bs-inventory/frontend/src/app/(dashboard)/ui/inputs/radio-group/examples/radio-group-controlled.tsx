import { useState } from "react";

import {
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

import { RadiobuttonSmallChecked, RadiobuttonSmallEmpty } from "@/icons/form/mui-radiobutton";

export default function RadioGroupControlled() {
  const [value, setValue] = useState("female");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Controlled
          </Typography>
          <FormControl className="mb-0">
            <FormLabel>Gender</FormLabel>
            <RadioGroup
              name="controlled-radio-buttons-group"
              value={value}
              onChange={handleChange}
              className="mb-0 flex flex-col gap-2"
            >
              <FormControlLabel
                value="female"
                control={<Radio icon={<RadiobuttonSmallEmpty />} checkedIcon={<RadiobuttonSmallChecked />} />}
                label="Female"
              />
              <FormControlLabel
                value="male"
                control={<Radio icon={<RadiobuttonSmallEmpty />} checkedIcon={<RadiobuttonSmallChecked />} />}
                label="Male"
              />
              <FormControlLabel
                value="other"
                control={<Radio icon={<RadiobuttonSmallEmpty />} checkedIcon={<RadiobuttonSmallChecked />} />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>
        </CardContent>
      </Card>
    </Grid>
  );
}
