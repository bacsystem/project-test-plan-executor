import * as React from "react";

import { Box, Button } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";

import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";
import NiEllipsisVertical from "@/icons/nexture/ni-ellipsis-vertical";
import NiHeart from "@/icons/nexture/ni-heart";
import NiShare from "@/icons/nexture/ni-share";
import { cn } from "@/lib/utils";

export default function CardComplex() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className="max-w-80">
      <Typography variant="h6" component="h6" className="card-title px-4 pt-4">
        Complex Card
      </Typography>
      <CardHeader
        slotProps={{ title: { variant: "body1" } }}
        avatar={<Avatar className="bg-primary">R</Avatar>}
        action={
          <Button
            className="icon-only"
            size="medium"
            color="text-secondary"
            variant="text"
            startIcon={<NiEllipsisVertical size={"medium"} />}
          />
        }
        title="Flower Pot"
        subheader="September 14, 2016"
        className="pt-0"
      />
      <Box className="px-4">
        <CardMedia component="img" className="h-48 rounded-md" image="/images/products/product-1.jpg" alt="product" />
      </Box>
      <CardContent>
        <Typography variant="body1" className="text-text-secondary">
          This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of
          frozen peas along with the mussels, if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button
          className="icon-only"
          size="medium"
          color="text-secondary"
          variant="text"
          startIcon={<NiShare size={"medium"} />}
        />
        <Button
          className="icon-only"
          size="medium"
          color="text-secondary"
          variant="text"
          startIcon={<NiHeart size={"medium"} />}
        />
        <Button
          onClick={handleExpandClick}
          className="icon-only ms-auto"
          size="medium"
          color="text-secondary"
          variant="text"
          startIcon={<NiChevronDownSmall size={"medium"} className={cn(expanded && "rotate-180")} />}
        />
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent className="pt-0!">
          <Typography className="mb-2" variant="subtitle2">
            Method
          </Typography>
          <Typography className="mb-2">
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10 minutes.
          </Typography>
          <Typography className="mb-2">
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken,
            shrimp and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp
            to a large plate and set aside, leaving chicken and chorizo in the pan. Add pimentón, bay leaves, garlic,
            tomatoes, onion, salt and pepper, and cook, stirring often until thickened and fragrant, about 10 minutes.
            Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography className="mb-2">
            Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook without stirring,
            until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
            mussels, tucking them down into the rice, and cook again without stirring, until mussels have opened and
            rice is just tender, 5 to 7 minutes more. (Discard any mussels that don&apos;t open.)
          </Typography>
          <Typography>Set aside off of the heat to let rest for 10 minutes, and then serve.</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
