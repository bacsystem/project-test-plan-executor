import { Box, Card, CardContent, FormControlLabel, Grid, Radio, RadioGroup, Typography } from "@mui/material";

import { RadiobuttonSmallChecked, RadiobuttonSmallEmpty } from "@/icons/form/mui-radiobutton";

export default function RadioGroupLabel() {
  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Label
          </Typography>

          <RadioGroup defaultValue="female" name="radio-buttons-group" className="mb-4">
            <Box className="flex flex-col gap-4">
              <FormControlLabel
                value="female"
                control={
                  <Radio size="small" icon={<RadiobuttonSmallEmpty />} checkedIcon={<RadiobuttonSmallChecked />} />
                }
                label="Label"
              />
              <FormControlLabel
                value="male"
                control={
                  <Radio
                    size="small"
                    required
                    icon={<RadiobuttonSmallEmpty />}
                    checkedIcon={<RadiobuttonSmallChecked />}
                  />
                }
                label="Required"
              />
            </Box>
          </RadioGroup>

          <RadioGroup defaultValue="female" name="radio-buttons-group-2" className="mb-0">
            <Box className="flex flex-col gap-4">
              <FormControlLabel
                value="other"
                control={
                  <Radio
                    size="small"
                    disabled
                    icon={<RadiobuttonSmallEmpty />}
                    checkedIcon={<RadiobuttonSmallChecked />}
                  />
                }
                label="Disabled"
              />
              <FormControlLabel
                value="other"
                control={
                  <Radio
                    size="small"
                    checked
                    disabled
                    icon={<RadiobuttonSmallEmpty />}
                    checkedIcon={<RadiobuttonSmallChecked />}
                  />
                }
                label="Disabled Checked"
              />
            </Box>
          </RadioGroup>
        </CardContent>
      </Card>
    </Grid>
  );
}
