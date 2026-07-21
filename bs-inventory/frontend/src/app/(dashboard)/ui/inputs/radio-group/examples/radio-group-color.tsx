import { Card, CardContent, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from "@mui/material";

import { RadiobuttonSmallChecked, RadiobuttonSmallEmpty } from "@/icons/form/mui-radiobutton";

export default function RadioGroupColor() {
  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Color
          </Typography>

          <RadioGroup name="row-radio-buttons-group" className="mb-0">
            <FormControl>
              <FormControlLabel
                value="Primary"
                control={
                  <Radio
                    size="small"
                    checked
                    color="primary"
                    icon={<RadiobuttonSmallEmpty />}
                    checkedIcon={<RadiobuttonSmallChecked />}
                  />
                }
                label="Primary"
              />
            </FormControl>
            <FormControl>
              <FormControlLabel
                value="Secondary"
                control={
                  <Radio
                    size="small"
                    checked
                    color="secondary"
                    icon={<RadiobuttonSmallEmpty />}
                    checkedIcon={<RadiobuttonSmallChecked />}
                  />
                }
                label="Secondary"
              />
            </FormControl>
            <FormControl>
              <FormControlLabel
                value="Accent 1"
                control={
                  <Radio
                    size="small"
                    checked
                    color="accent-1"
                    icon={<RadiobuttonSmallEmpty />}
                    checkedIcon={<RadiobuttonSmallChecked />}
                  />
                }
                label="Accent 1"
              />
            </FormControl>
            <FormControl>
              <FormControlLabel
                value="Accent 2"
                control={
                  <Radio
                    size="small"
                    checked
                    color="accent-2"
                    icon={<RadiobuttonSmallEmpty />}
                    checkedIcon={<RadiobuttonSmallChecked />}
                  />
                }
                label="Accent 2"
              />
            </FormControl>
            <FormControl>
              <FormControlLabel
                value="Accent 3"
                control={
                  <Radio
                    size="small"
                    checked
                    color="accent-3"
                    icon={<RadiobuttonSmallEmpty />}
                    checkedIcon={<RadiobuttonSmallChecked />}
                  />
                }
                label="Accent 3"
              />
            </FormControl>
            <FormControl>
              <FormControlLabel
                value="Accent 4"
                control={
                  <Radio
                    size="small"
                    checked
                    color="accent-4"
                    icon={<RadiobuttonSmallEmpty />}
                    checkedIcon={<RadiobuttonSmallChecked />}
                  />
                }
                label="Accent 4"
              />
            </FormControl>
            <FormControl>
              <FormControlLabel
                value="success"
                control={
                  <Radio
                    size="small"
                    checked
                    color="success"
                    icon={<RadiobuttonSmallEmpty />}
                    checkedIcon={<RadiobuttonSmallChecked />}
                  />
                }
                label="Success"
              />
            </FormControl>
            <FormControl>
              <FormControlLabel
                value="Info"
                control={
                  <Radio
                    size="small"
                    checked
                    color="info"
                    icon={<RadiobuttonSmallEmpty />}
                    checkedIcon={<RadiobuttonSmallChecked />}
                  />
                }
                label="Info"
              />
            </FormControl>
            <FormControl>
              <FormControlLabel
                value="Warning"
                control={
                  <Radio
                    size="small"
                    checked
                    color="warning"
                    icon={<RadiobuttonSmallEmpty />}
                    checkedIcon={<RadiobuttonSmallChecked />}
                  />
                }
                label="Warning"
              />
            </FormControl>
            <FormControl>
              <FormControlLabel
                value="Error"
                control={
                  <Radio
                    size="small"
                    checked
                    color="error"
                    icon={<RadiobuttonSmallEmpty />}
                    checkedIcon={<RadiobuttonSmallChecked />}
                  />
                }
                label="Error"
              />
            </FormControl>
          </RadioGroup>
        </CardContent>
      </Card>
    </Grid>
  );
}
