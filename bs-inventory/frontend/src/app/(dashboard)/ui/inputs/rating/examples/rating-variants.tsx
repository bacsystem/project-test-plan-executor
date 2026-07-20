import { Card, CardContent, FormGroup, FormLabel, Grid, Rating, Typography } from "@mui/material";

import NiStar from "@/icons/nexture/ni-star";

export default function RatingVariants() {
  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Variants
          </Typography>
          <FormGroup>
            <FormLabel component="label">Outlined</FormLabel>
            <Rating
              defaultValue={4}
              max={5}
              icon={<NiStar size="medium" className="outlined" />}
              emptyIcon={<NiStar size="medium" className="outlined" />}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel component="label">Outlined and Contained</FormLabel>
            <Rating
              defaultValue={4}
              max={5}
              icon={<NiStar variant="contained" size="medium" className="contained" />}
              emptyIcon={<NiStar size="medium" className="outlined" />}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel component="label">Contained</FormLabel>
            <Rating
              defaultValue={4}
              max={5}
              icon={<NiStar variant="contained" size="medium" className="contained" />}
              emptyIcon={<NiStar variant="contained" size="medium" className="contained" />}
            />
          </FormGroup>
        </CardContent>
      </Card>
    </Grid>
  );
}
