import { Box, Card, CardContent, Checkbox, FormControl, FormControlLabel, Grid, Typography } from "@mui/material";

import { CheckboxSmallChecked, CheckboxSmallEmpty } from "@/icons/form/mui-checkbox";

export default function CheckboxColor() {
  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Color
          </Typography>

          <Box className="flex flex-col">
            <FormControl>
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    defaultChecked
                    icon={<CheckboxSmallEmpty />}
                    checkedIcon={<CheckboxSmallChecked />}
                    color="primary"
                  />
                }
                label="Primary"
              />
            </FormControl>
            <FormControl>
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    defaultChecked
                    icon={<CheckboxSmallEmpty />}
                    checkedIcon={<CheckboxSmallChecked />}
                    color="secondary"
                  />
                }
                label="Secondary"
              />
            </FormControl>
            <FormControl>
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    defaultChecked
                    icon={<CheckboxSmallEmpty />}
                    checkedIcon={<CheckboxSmallChecked />}
                    color="accent-1"
                  />
                }
                label="Accent 1"
              />
            </FormControl>
            <FormControl>
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    defaultChecked
                    icon={<CheckboxSmallEmpty />}
                    checkedIcon={<CheckboxSmallChecked />}
                    color="accent-2"
                  />
                }
                label="Accent 2"
              />
            </FormControl>
            <FormControl>
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    defaultChecked
                    icon={<CheckboxSmallEmpty />}
                    checkedIcon={<CheckboxSmallChecked />}
                    color="accent-3"
                  />
                }
                label="Accent 3"
              />
            </FormControl>
            <FormControl>
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    defaultChecked
                    icon={<CheckboxSmallEmpty />}
                    checkedIcon={<CheckboxSmallChecked />}
                    color="accent-4"
                  />
                }
                label="Accent 4"
              />
            </FormControl>
            <FormControl>
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    defaultChecked
                    icon={<CheckboxSmallEmpty />}
                    checkedIcon={<CheckboxSmallChecked />}
                    color="success"
                  />
                }
                label="Success"
              />
            </FormControl>
            <FormControl>
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    defaultChecked
                    icon={<CheckboxSmallEmpty />}
                    checkedIcon={<CheckboxSmallChecked />}
                    color="info"
                  />
                }
                label="Info"
              />
            </FormControl>
            <FormControl>
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    defaultChecked
                    icon={<CheckboxSmallEmpty />}
                    checkedIcon={<CheckboxSmallChecked />}
                    color="warning"
                  />
                }
                label="Warning"
              />
            </FormControl>
            <FormControl>
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    defaultChecked
                    icon={<CheckboxSmallEmpty />}
                    checkedIcon={<CheckboxSmallChecked />}
                    color="error"
                  />
                }
                label="Error"
              />
            </FormControl>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
