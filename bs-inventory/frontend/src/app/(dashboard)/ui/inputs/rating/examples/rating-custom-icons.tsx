import { Card, CardContent, FormGroup, FormLabel, Grid, Rating, Typography } from "@mui/material";

import NiBrush from "@/icons/nexture/ni-brush";
import NiChef from "@/icons/nexture/ni-chef";
import NiDrink from "@/icons/nexture/ni-drink";

export default function RatingCustomIcons() {
  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Custom Icons
          </Typography>

          <FormGroup>
            <FormLabel component="label">Drinks</FormLabel>
            <Rating
              defaultValue={4}
              max={5}
              icon={<NiDrink variant="contained" size="medium" className="contained text-accent-2!" />}
              emptyIcon={<NiDrink size="medium" className="outlined" />}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel component="label">Food</FormLabel>
            <Rating
              defaultValue={4}
              max={5}
              icon={<NiChef variant="contained" size="medium" className="contained text-accent-3!" />}
              emptyIcon={<NiChef size="medium" className="outlined" />}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel component="label">Ambient</FormLabel>
            <Rating
              defaultValue={4}
              max={5}
              icon={<NiBrush variant="contained" size="medium" className="contained text-accent-4!" />}
              emptyIcon={<NiBrush size="medium" className="outlined" />}
            />
          </FormGroup>
        </CardContent>
      </Card>
    </Grid>
  );
}
