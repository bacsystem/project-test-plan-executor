import { useState } from "react";

import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Switch,
  Typography,
} from "@mui/material";

interface WorkInfoData {
  id: string;
  freelance: boolean;
  "work-from-home": boolean;
  "work-from-office": boolean;
}

export default function SettingsWork() {
  const [workInfo, setWorkInfo] = useState<WorkInfoData>({
    id: "4232-0594-3495",
    freelance: true,
    "work-from-home": true,
    "work-from-office": false,
  });

  const handleFreelanceChange = (event: any) => {
    setWorkInfo({ ...workInfo, [event.target.name]: event.target.checked });
  };

  const handleWorkFromHomeChange = (event: any) => {
    setWorkInfo({ ...workInfo, [event.target.name]: event.target.checked });
  };

  const handleWorkFromOfficeChange = (event: any) => {
    setWorkInfo({ ...workInfo, [event.target.name]: event.target.checked });
  };

  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Work
          </Typography>
          <FormControl className="outlined lg:flex-row lg:gap-2.5" variant="standard" size="small" fullWidth>
            <FormLabel component="label" className="min-w-60">
              Preferences
            </FormLabel>

            <FormGroup className="mb-0 flex flex-col gap-2">
              <FormControlLabel
                control={
                  <Switch
                    checked={workInfo["freelance"]}
                    onChange={handleFreelanceChange}
                    name={"freelance"}
                    size="small"
                  />
                }
                label="Open to Freelance Offers"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={workInfo["work-from-home"]}
                    onChange={handleWorkFromHomeChange}
                    name={"work-from-home"}
                    size="small"
                  />
                }
                label="Can Work from Home"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={workInfo["work-from-office"]}
                    onChange={handleWorkFromOfficeChange}
                    name={"work-from-office"}
                    size="small"
                  />
                }
                label="Can Work from Office"
              />
            </FormGroup>
          </FormControl>

          <Button size="medium" color="primary" variant="outlined">
            Update
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
}
