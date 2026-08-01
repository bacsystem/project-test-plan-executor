import Masonry from "@mui/lab/Masonry";
import { Card, CardContent } from "@mui/material";
const heights = [
  "h-[150px]",
  "h-[120px]",
  "h-[360px]",
  "h-[280px]",
  "h-[210px]",
  "h-[180px]",
  "h-[180px]",
  "h-[200px]",
  "h-[160px]",
  "h-[140px]",
];

export default function MasonryServerSide() {
  return (
    <Masonry
      columns={{ xs: 1, sm: 2, lg: 3, xl: 4 }}
      spacing={5}
      defaultHeight={360}
      defaultColumns={4}
      defaultSpacing={5}
    >
      {heights.map((height, index) => (
        <Card key={index} className={height}>
          <CardContent>{index}</CardContent>
        </Card>
      ))}
    </Masonry>
  );
}
