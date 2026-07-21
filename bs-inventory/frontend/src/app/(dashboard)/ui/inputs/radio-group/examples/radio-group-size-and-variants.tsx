import { Card, CardContent, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from "@mui/material";

import {
  RadiobuttonMediumChecked,
  RadiobuttonMediumEmpty,
  RadiobuttonMediumEmptyOutlined,
  RadiobuttonSmallChecked,
  RadiobuttonSmallEmpty,
  RadiobuttonSmallEmptyOutlined,
} from "@/icons/form/mui-radiobutton";

export default function RadioGroupSizeAndVariants() {
  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Size and Variants
          </Typography>

          <RadioGroup name="row-radio-buttons-group" className="mb-0">
            <FormControl>
              <FormControlLabel
                value="small"
                control={
                  <Radio size="small" icon={<RadiobuttonSmallEmpty />} checkedIcon={<RadiobuttonSmallChecked />} />
                }
                label="Small"
              />
            </FormControl>
            <FormControl>
              <FormControlLabel
                value="small outlined"
                control={
                  <Radio
                    size="small"
                    icon={<RadiobuttonSmallEmptyOutlined />}
                    checkedIcon={<RadiobuttonSmallChecked />}
                  />
                }
                label="Small Outlined"
              />
            </FormControl>
            <FormControl>
              <FormControlLabel
                value="medium"
                control={
                  <Radio size="medium" icon={<RadiobuttonMediumEmpty />} checkedIcon={<RadiobuttonMediumChecked />} />
                }
                label="Medium"
              />
            </FormControl>
            <FormControl>
              <FormControlLabel
                value="medium outlined"
                control={
                  <Radio
                    size="medium"
                    icon={<RadiobuttonMediumEmptyOutlined />}
                    checkedIcon={<RadiobuttonMediumChecked />}
                  />
                }
                label="Medium Outlined"
              />
            </FormControl>
          </RadioGroup>
        </CardContent>
      </Card>
    </Grid>
  );
}
