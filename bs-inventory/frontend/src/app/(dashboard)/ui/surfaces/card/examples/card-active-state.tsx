import * as React from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const cards = [
  {
    id: 1,
    title: "Active",
    description: "Plants are essential for all life.",
  },
  {
    id: 2,
    title: "State",
    description: "Animals are a part of nature.",
  },
  {
    id: 3,
    title: "Cards",
    description: "Humans depend on plants and animals for survival.",
  },
];

export default function CardActiveState() {
  const [selectedCard, setSelectedCard] = React.useState(0);
  return (
    <Box className="grid grid-cols-3 gap-2">
      {cards.map((card, index) => (
        <Card key={index}>
          <CardActionArea
            onClick={() => setSelectedCard(index)}
            data-active={selectedCard === index ? "" : undefined}
            className="data-active:hover:bg-grey-100 hover:bg-grey-50! data-active:bg-grey-50 h-full rounded-md"
          >
            <CardContent className="h-full">
              <Typography variant="h5" component="div">
                {card.title}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {card.description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
}
