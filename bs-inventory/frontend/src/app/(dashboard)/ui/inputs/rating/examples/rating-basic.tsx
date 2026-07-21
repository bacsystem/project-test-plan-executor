import { useState } from "react";

import { Box, Card, CardContent, FormGroup, FormLabel, Grid, Rating, Typography } from "@mui/material";

import NiStar from "@/icons/nexture/ni-star";

export default function RatingBasic() {
  const [valueBasic, setValueBasic] = useState<number | null>(4);

  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Basic
          </Typography>

          <FormGroup>
            <FormLabel component="label">Controlled</FormLabel>
            <Rating
              name="simple-controlled"
              value={valueBasic}
              onChange={(event, newValue) => {
                setValueBasic(newValue);
              }}
              icon={<NiStar variant="contained" size="medium" />}
              emptyIcon={<NiStar size="medium" className="outlined" />}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel component="label">Uncontrolled</FormLabel>
            <Rating
              defaultValue={4}
              max={5}
              icon={<NiStar variant="contained" size="medium" />}
              emptyIcon={<NiStar size="medium" className="outlined" />}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel component="label">Empty</FormLabel>
            <Rating
              defaultValue={0}
              max={5}
              icon={<NiStar variant="contained" size="medium" />}
              emptyIcon={<NiStar size="medium" className="outlined" />}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel component="label">Read Only</FormLabel>
            <Rating
              readOnly
              defaultValue={4}
              max={5}
              icon={<NiStar variant="contained" size="medium" />}
              emptyIcon={<NiStar size="medium" className="outlined" />}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel component="label">Count</FormLabel>
            <Box className="flex flex-row items-center">
              <Rating
                readOnly
                defaultValue={4}
                max={5}
                icon={<NiStar variant="contained" size="medium" />}
                emptyIcon={<NiStar size="medium" className="outlined" />}
              />
              <Typography variant="body1" component="span" className="text-text-secondary ms-1">
                (48)
              </Typography>
            </Box>
          </FormGroup>
          <FormGroup>
            <FormLabel component="label">Disabled</FormLabel>
            <Rating
              disabled
              value={4}
              max={5}
              icon={<NiStar variant="contained" size="medium" />}
              emptyIcon={<NiStar size="medium" className="outlined" />}
            />
          </FormGroup>
        </CardContent>
      </Card>
    </Grid>
  );
}
