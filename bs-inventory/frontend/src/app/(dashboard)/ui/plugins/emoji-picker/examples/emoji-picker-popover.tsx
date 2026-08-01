import EmojiPicker, { EmojiStyle } from "emoji-picker-react";
import { MouseEvent, useState } from "react";

import { Button, Card, CardContent, Popover, Typography } from "@mui/material";

import NiAcorn from "@/icons/nexture/ni-acorn";
import NiAirBalloon from "@/icons/nexture/ni-air-balloon";
import NiChef from "@/icons/nexture/ni-chef";
import NiFaceSmile from "@/icons/nexture/ni-face-smile";
import NiFlag from "@/icons/nexture/ni-flag";
import NiGerm from "@/icons/nexture/ni-germ";
import NiQuestionHexagon from "@/icons/nexture/ni-question-hexagon";
import NiReverseLeft from "@/icons/nexture/ni-reverse-left";
import NiTelescope from "@/icons/nexture/ni-telescope";
import NiTrophy from "@/icons/nexture/ni-trophy";
export default function EmojiPickerPopover() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="h6" className="card-title">
          Picker Popover
        </Typography>

        <Button variant="pastel" onClick={handleClick}>
          Open Picker
        </Button>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          elevation={3}
          slotProps={{
            paper: {
              className: "p-0.5! bg-transparent! outline-0! border-0! rounded-none!",
            },
          }}
        >
          <EmojiPicker
            emojiStyle={EmojiStyle.NATIVE}
            categoryIcons={{
              smileys_people: <NiFaceSmile size="large" />,
              suggested: <NiReverseLeft size="large" />,
              animals_nature: <NiGerm size="large" />,
              travel_places: <NiAirBalloon size="large" />,
              activities: <NiTrophy size="large" />,
              flags: <NiFlag size="large" />,
              food_drink: <NiChef size="large" />,
              objects: <NiTelescope size="large" />,
              symbols: <NiQuestionHexagon size="large" />,
              custom: <NiAcorn size="large" />,
            }}
          />
        </Popover>
      </CardContent>
    </Card>
  );
}
