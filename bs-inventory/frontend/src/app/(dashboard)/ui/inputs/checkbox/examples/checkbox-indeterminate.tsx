import { useState } from "react";

import { Box, Card, CardContent, Checkbox, FormControl, FormControlLabel, Grid, Typography } from "@mui/material";

import {
  CheckboxMediumChecked,
  CheckboxMediumEmpty,
  CheckboxMediumIndeterminate,
  CheckboxSmallChecked,
  CheckboxSmallEmpty,
  CheckboxSmallIndeterminate,
} from "@/icons/form/mui-checkbox";

export default function CheckboxIndeterminate() {
  const [checkedStates, setCheckedStates] = useState([true, false]);

  const handleChangeStates1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedStates([event.target.checked, event.target.checked]);
  };

  const handleChangeStates2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedStates([event.target.checked, checkedStates[1]]);
  };

  const handleChangeStates3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedStates([checkedStates[0], event.target.checked]);
  };

  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Indeterminate
          </Typography>

          <Box className="mb-4">
            <FormControl>
              <FormControlLabel
                label="Small"
                control={
                  <Checkbox
                    size="small"
                    checked={checkedStates[0] && checkedStates[1]}
                    indeterminate={checkedStates[0] !== checkedStates[1]}
                    onChange={handleChangeStates1}
                    icon={<CheckboxSmallEmpty />}
                    checkedIcon={<CheckboxSmallChecked />}
                    indeterminateIcon={<CheckboxSmallIndeterminate />}
                  />
                }
              />
            </FormControl>
            <Box className="ms-7 flex flex-col">
              <FormControl>
                <FormControlLabel
                  label="Child 1"
                  control={
                    <Checkbox
                      size="small"
                      checked={checkedStates[0]}
                      onChange={handleChangeStates2}
                      icon={<CheckboxSmallEmpty />}
                      checkedIcon={<CheckboxSmallChecked />}
                      indeterminateIcon={<CheckboxSmallIndeterminate />}
                    />
                  }
                />
              </FormControl>
              <FormControl>
                <FormControlLabel
                  label="Child 2"
                  control={
                    <Checkbox
                      size="small"
                      checked={checkedStates[1]}
                      onChange={handleChangeStates3}
                      icon={<CheckboxSmallEmpty />}
                      checkedIcon={<CheckboxSmallChecked />}
                      indeterminateIcon={<CheckboxSmallIndeterminate />}
                    />
                  }
                />
              </FormControl>
            </Box>
          </Box>

          <Box>
            <FormControl>
              <FormControlLabel
                label="Medium"
                control={
                  <Checkbox
                    size="medium"
                    checked={checkedStates[0] && checkedStates[1]}
                    indeterminate={checkedStates[0] !== checkedStates[1]}
                    onChange={handleChangeStates1}
                    icon={<CheckboxMediumEmpty />}
                    checkedIcon={<CheckboxMediumChecked />}
                    indeterminateIcon={<CheckboxMediumIndeterminate />}
                  />
                }
              />
            </FormControl>

            <Box className="ms-7 flex flex-col">
              <FormControl>
                <FormControlLabel
                  label="Child 1"
                  control={
                    <Checkbox
                      size="medium"
                      checked={checkedStates[0]}
                      onChange={handleChangeStates2}
                      icon={<CheckboxMediumEmpty />}
                      checkedIcon={<CheckboxMediumChecked />}
                      indeterminateIcon={<CheckboxMediumIndeterminate />}
                    />
                  }
                />
              </FormControl>
              <FormControl>
                <FormControlLabel
                  label="Child 2"
                  control={
                    <Checkbox
                      size="medium"
                      checked={checkedStates[1]}
                      onChange={handleChangeStates3}
                      icon={<CheckboxMediumEmpty />}
                      checkedIcon={<CheckboxMediumChecked />}
                      indeterminateIcon={<CheckboxMediumIndeterminate />}
                    />
                  }
                />
              </FormControl>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
