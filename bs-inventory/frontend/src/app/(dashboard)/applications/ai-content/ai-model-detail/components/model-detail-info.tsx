import { Avatar, Box, Button, Card, CardContent, Chip, Typography } from "@mui/material";

import NiEllipsisHorizontal from "@/icons/nexture/ni-ellipsis-horizontal";
import NiLike from "@/icons/nexture/ni-like";
import NiUnlike from "@/icons/nexture/ni-unlike";
import { cn } from "@/lib/utils";

export default function ModelDetailInfo() {
  return (
    <Card className="mb-5">
      <CardContent className="flex flex-col items-center gap-5">
        <Box className="flex flex-col items-center">
          <Avatar
            className="bg-secondary/10 mb-2 h-20 w-20 rounded-4xl"
            alt="Color Analysis"
            src="/images/models/model-15.jpg"
          ></Avatar>

          <Typography variant="subtitle1" component="p">
            Neon Pulse
          </Typography>
          <Typography variant="body2" component="p" className="text-text-secondary -mt-0.5 mb-1">
            General
          </Typography>
          <Chip label="v1.6.2" variant="outlined" size="small" />
        </Box>

        <Box className="flex w-full max-w-sm flex-row gap-1">
          <Button
            size="medium"
            color="grey"
            variant="pastel"
            startIcon={<NiLike size={"medium"} />}
            className={cn(
              "[.active]:text-primary [.active]:bg-grey-25 hover:text-primary [.active:hover]:text-text-primary min-w-0 flex-1 md:min-w-16",
              "active",
            )}
          >
            2,781
          </Button>
          <Button
            size="medium"
            color="grey"
            variant="pastel"
            startIcon={<NiUnlike size={"medium"} />}
            className={cn(
              "[.active]:text-secondary [.active]:bg-grey-25 hover:text-secondary [.active:hover]:text-text-primary min-w-0 flex-1 md:min-w-16",
            )}
          >
            48
          </Button>
          <Button
            className="icon-only flex-none"
            size="medium"
            color="grey"
            variant="pastel"
            startIcon={<NiEllipsisHorizontal size={"medium"} />}
          />
        </Box>

        <Box className="w-full">
          <Typography variant="body1" className="text-text-primary text-center">
            Emulates tube lighting, reflections, and electric ambiance.
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
