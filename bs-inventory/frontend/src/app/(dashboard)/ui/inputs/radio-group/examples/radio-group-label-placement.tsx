import {
  Box,
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

export default function RadioGroupLabelPlacement() {
  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Label Placement
          </Typography>

          <Box className="flex flex-col">
            <FormControl>
              <FormLabel id="demo-form-control-label-placement">Start</FormLabel>
              <RadioGroup row name="position" defaultValue="start-1" className="mb-0 gap-4">
                <FormControlLabel
                  value="start-1"
                  label="Start 1"
                  labelPlacement="start"
                  control={
                    <Radio size="small" icon={<RadiobuttonSmallEmpty />} checkedIcon={<RadiobuttonSmallChecked />} />
                  }
                />
                <FormControlLabel
                  value="start-2"
                  label="Start 2"
                  labelPlacement="start"
                  control={
                    <Radio size="small" icon={<RadiobuttonSmallEmpty />} checkedIcon={<RadiobuttonSmallChecked />} />
                  }
                />
              </RadioGroup>
            </FormControl>

            <FormControl>
              <FormLabel id="demo-form-control-label-placement">End</FormLabel>
              <RadioGroup row name="position" defaultValue="end-1" className="mb-0 gap-4">
                <FormControlLabel
                  value="end-1"
                  label="End 1"
                  labelPlacement="end"
                  control={
                    <Radio size="small" icon={<RadiobuttonSmallEmpty />} checkedIcon={<RadiobuttonSmallChecked />} />
                  }
                />
                <FormControlLabel
                  value="end-2"
                  label="End 2"
                  labelPlacement="end"
                  control={
                    <Radio size="small" icon={<RadiobuttonSmallEmpty />} checkedIcon={<RadiobuttonSmallChecked />} />
                  }
                />
              </RadioGroup>
            </FormControl>

            <FormControl>
              <FormLabel id="demo-form-control-label-placement">Top</FormLabel>
              <RadioGroup row name="position" defaultValue="top-1" className="mb-0 gap-4">
                <FormControlLabel
                  value="top-1"
                  label="Top 1"
                  labelPlacement="top"
                  control={
                    <Radio size="small" icon={<RadiobuttonSmallEmpty />} checkedIcon={<RadiobuttonSmallChecked />} />
                  }
                />
                <FormControlLabel
                  value="top-2"
                  label="Top 2"
                  labelPlacement="top"
                  control={
                    <Radio size="small" icon={<RadiobuttonSmallEmpty />} checkedIcon={<RadiobuttonSmallChecked />} />
                  }
                />
              </RadioGroup>
            </FormControl>

            <FormControl>
              <FormLabel id="demo-form-control-label-placement">Bottom</FormLabel>
              <RadioGroup row name="position" defaultValue="bottom-1" className="mb-0 gap-4">
                <FormControlLabel
                  value="bottom-1"
                  label="Bottom 1"
                  labelPlacement="bottom"
                  control={
                    <Radio size="small" icon={<RadiobuttonSmallEmpty />} checkedIcon={<RadiobuttonSmallChecked />} />
                  }
                />
                <FormControlLabel
                  value="bottom-2"
                  label="Bottom 2"
                  labelPlacement="bottom"
                  control={
                    <Radio size="small" icon={<RadiobuttonSmallEmpty />} checkedIcon={<RadiobuttonSmallChecked />} />
                  }
                />
              </RadioGroup>
            </FormControl>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
