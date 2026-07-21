import { Card, CardContent, FormGroup, FormLabel, Grid, Rating, Typography } from "@mui/material";

import NiStar from "@/icons/nexture/ni-star";

export default function RatingColors() {
  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Colors
          </Typography>

          <FormGroup>
            <FormLabel component="label">Default</FormLabel>
            <Rating
              defaultValue={4}
              max={5}
              icon={<NiStar variant="contained" size="medium" className="contained" />}
              emptyIcon={<NiStar size="medium" className="outlined" />}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel component="label">Primary</FormLabel>
            <Rating
              defaultValue={4}
              max={5}
              icon={<NiStar variant="contained" size="medium" className="contained text-primary!" />}
              emptyIcon={<NiStar size="medium" className="outlined" />}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel component="label">Secondary</FormLabel>
            <Rating
              defaultValue={4}
              max={5}
              icon={<NiStar variant="contained" size="medium" className="contained text-secondary!" />}
              emptyIcon={<NiStar size="medium" className="outlined" />}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel component="label">Accent 1</FormLabel>
            <Rating
              defaultValue={4}
              max={5}
              icon={<NiStar variant="contained" size="medium" className="contained text-accent-1!" />}
              emptyIcon={<NiStar size="medium" className="outlined" />}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel component="label">Accent 2</FormLabel>
            <Rating
              defaultValue={4}
              max={5}
              icon={<NiStar variant="contained" size="medium" className="contained text-accent-2!" />}
              emptyIcon={<NiStar size="medium" className="outlined" />}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel component="label">Accent 3</FormLabel>
            <Rating
              defaultValue={4}
              max={5}
              icon={<NiStar variant="contained" size="medium" className="contained text-accent-3!" />}
              emptyIcon={<NiStar size="medium" className="outlined" />}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel component="label">Accent 4</FormLabel>
            <Rating
              defaultValue={4}
              max={5}
              icon={<NiStar variant="contained" size="medium" className="contained text-accent-4!" />}
              emptyIcon={<NiStar size="medium" className="outlined" />}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel component="label">Warning</FormLabel>
            <Rating
              defaultValue={4}
              max={5}
              icon={<NiStar variant="contained" size="medium" className="contained text-warning!" />}
              emptyIcon={<NiStar size="medium" className="outlined" />}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel component="label">Error</FormLabel>
            <Rating
              defaultValue={4}
              max={5}
              icon={<NiStar variant="contained" size="medium" className="contained text-error!" />}
              emptyIcon={<NiStar size="medium" className="outlined" />}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel component="label">Info</FormLabel>
            <Rating
              defaultValue={4}
              max={5}
              icon={<NiStar variant="contained" size="medium" className="contained text-info!" />}
              emptyIcon={<NiStar size="medium" className="outlined" />}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel component="label">Success</FormLabel>
            <Rating
              defaultValue={4}
              max={5}
              icon={<NiStar variant="contained" size="medium" className="contained text-success!" />}
              emptyIcon={<NiStar size="medium" className="outlined" />}
            />
          </FormGroup>
        </CardContent>
      </Card>
    </Grid>
  );
}
