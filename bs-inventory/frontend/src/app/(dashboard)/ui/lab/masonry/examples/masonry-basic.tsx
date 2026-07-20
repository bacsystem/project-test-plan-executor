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

export default function MasonryBasic() {
  return (
    <Masonry columns={4} spacing={5}>
      {heights.map((height, index) => (
        <Card key={index} className={height}>
          <CardContent>{index}</CardContent>
        </Card>
      ))}
    </Masonry>
  );
}
