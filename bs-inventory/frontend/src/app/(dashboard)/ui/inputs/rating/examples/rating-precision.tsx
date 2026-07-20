import { Card, CardContent, FormGroup, FormLabel, Grid, Rating, Typography } from "@mui/material";

import NiStar from "@/icons/nexture/ni-star";

export default function RatingPrecision() {
  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Rating Precision
          </Typography>

          <FormGroup>
            <FormLabel component="label">Default</FormLabel>
            <Rating
              precision={0.5}
              defaultValue={3.5}
              max={5}
              icon={<NiStar variant="contained" size="medium" className="contained" />}
              emptyIcon={<NiStar size="medium" className="contained" />}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel component="label">Read Only</FormLabel>
            <Rating
              readOnly
              precision={0.5}
              defaultValue={3.5}
              max={5}
              icon={<NiStar variant="contained" size="medium" className="contained" />}
              emptyIcon={<NiStar size="medium" className="contained" />}
            />
          </FormGroup>
        </CardContent>
      </Card>
    </Grid>
  );
}
