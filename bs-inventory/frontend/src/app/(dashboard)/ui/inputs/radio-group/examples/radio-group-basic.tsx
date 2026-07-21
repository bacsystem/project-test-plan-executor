import { useState } from "react";

import { Box, Card, CardContent, Grid, Radio, Typography } from "@mui/material";

import { RadiobuttonSmallChecked, RadiobuttonSmallEmpty } from "@/icons/form/mui-radiobutton";

export default function RadioGroupBasic() {
  const [selectedValueStandalone, setSelectedValueStandalone] = useState("a");
  const handleChangeStandalone = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValueStandalone(event.target.value);
  };

  const [selectedValueStandaloneDisabled, setSelectedValueStandaloneDisabled] = useState("c");
  const handleChangeStandaloneDisabled = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValueStandaloneDisabled(event.target.value);
  };
  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Basic
          </Typography>
          <Box className="flex flex-row items-start gap-4">
            <Box className="flex flex-row items-start gap-4">
              <Radio
                checked={selectedValueStandalone === "a"}
                onChange={handleChangeStandalone}
                value="a"
                name="radio-buttons"
                icon={<RadiobuttonSmallEmpty />}
                checkedIcon={<RadiobuttonSmallChecked />}
              />
              <Radio
                checked={selectedValueStandalone === "b"}
                onChange={handleChangeStandalone}
                value="b"
                name="radio-buttons"
                icon={<RadiobuttonSmallEmpty />}
                checkedIcon={<RadiobuttonSmallChecked />}
              />
            </Box>
            <Box className="flex flex-row items-start gap-4">
              <Radio
                checked={selectedValueStandaloneDisabled === "c"}
                onChange={handleChangeStandaloneDisabled}
                value="c"
                name="radio-buttons-disabled"
                disabled
                icon={<RadiobuttonSmallEmpty />}
                checkedIcon={<RadiobuttonSmallChecked />}
              />
              <Radio
                checked={selectedValueStandaloneDisabled === "d"}
                onChange={handleChangeStandaloneDisabled}
                value="d"
                name="radio-buttons-disabled"
                disabled
                icon={<RadiobuttonSmallEmpty />}
                checkedIcon={<RadiobuttonSmallChecked />}
              />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
