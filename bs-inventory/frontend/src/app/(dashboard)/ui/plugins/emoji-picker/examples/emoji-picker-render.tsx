import EmojiPicker, { EmojiStyle } from "emoji-picker-react";
import { MouseEvent, useState } from "react";

import { Box, Button, Card, CardContent, FormControl, Popover, TextareaAutosize, Typography } from "@mui/material";

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
export default function EmojiPickerRender() {
  const [emojiAnchorEl, setEmojiAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [message, setMessage] = useState("");
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setEmojiAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setEmojiAnchorEl(null);
  };

  const emojiPickerOpen = Boolean(emojiAnchorEl);
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="h6" className="card-title">
          Render Textarea
        </Typography>

        <FormControl className="MuiTextField-root outlined relative mb-0 w-full">
          <TextareaAutosize
            minRows={2}
            maxRows={2}
            className="MuiInputBase-root MuiInput-root outlined autosize emoji-container w-full resize-none pe-28!"
            placeholder="Type..."
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);
            }}
          />
          <Box className="absolute inset-e-0 flex flex-row gap-0.25 p-2">
            <Button
              className="icon-only"
              color="grey"
              variant="text"
              startIcon={<NiFaceSmile />}
              onClick={handleClick}
            />
          </Box>
        </FormControl>
        <Popover
          open={emojiPickerOpen}
          anchorEl={emojiAnchorEl}
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
            onEmojiClick={(emojiObject) => {
              console.log(emojiObject);
              setMessage(message + emojiObject.emoji);
            }}
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
