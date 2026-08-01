import { useState } from "react";

import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

import { RadiobuttonSmallChecked, RadiobuttonSmallEmpty } from "@/icons/form/mui-radiobutton";

export default function RadioGroupShowError() {
  const [valueErrorExample, setValueErrorExample] = useState("");
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("Choose wisely");

  const handleRadioChangeErrorExample = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueErrorExample((event.target as HTMLInputElement).value);
    setHelperText(" ");
    setError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (valueErrorExample === "best") {
      setHelperText("You got it!");
      setError(false);
    } else if (valueErrorExample === "worst") {
      setHelperText("Sorry, wrong answer!");
      setError(true);
    } else {
      setHelperText("Please select an option.");
      setError(true);
    }
  };
  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Show Error
          </Typography>

          <form onSubmit={handleSubmit}>
            <FormControl error={error} variant="standard" className="items-start">
              <FormLabel>Pop quiz: MUI is...</FormLabel>
              <RadioGroup
                name="quiz"
                value={valueErrorExample}
                onChange={handleRadioChangeErrorExample}
                className="mb-0 flex flex-col gap-2"
              >
                <FormControlLabel
                  value="best"
                  control={
                    <Radio size="small" icon={<RadiobuttonSmallEmpty />} checkedIcon={<RadiobuttonSmallChecked />} />
                  }
                  label="The best!"
                />
                <FormControlLabel
                  value="worst"
                  control={
                    <Radio size="small" icon={<RadiobuttonSmallEmpty />} checkedIcon={<RadiobuttonSmallChecked />} />
                  }
                  label="The worst."
                />
              </RadioGroup>
              <FormHelperText className="mb-2">{helperText}</FormHelperText>
              <Button type="submit" variant="outlined">
                Check Answer
              </Button>
            </FormControl>
          </form>
        </CardContent>
      </Card>
    </Grid>
  );
}
