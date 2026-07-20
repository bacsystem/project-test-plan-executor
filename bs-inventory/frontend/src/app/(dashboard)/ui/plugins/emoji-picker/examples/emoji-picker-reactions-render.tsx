import EmojiPicker, { EmojiStyle } from "emoji-picker-react";
import { MouseEvent, useState } from "react";

import { Box, Button, Card, CardContent, Chip, Link, Popover, Typography } from "@mui/material";

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
import NextureIcons from "@/icons/nexture-icons";
export default function EmojiPickerReactionsRender() {
  const [reactionAnchorEl, setReactionAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [reaction, setReaction] = useState<string | null>(null);
  const handleReactionClick = (event: MouseEvent<HTMLButtonElement>) => {
    setReactionAnchorEl(event.currentTarget);
  };

  const handleReactionClose = () => {
    setReactionAnchorEl(null);
  };

  const open = Boolean(reactionAnchorEl);
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="h6" className="card-title">
          Reaction Render
        </Typography>
        <Box className="border-grey-50 relative flex w-sm max-w-full flex-row items-start gap-2.5 rounded-lg border p-7">
          <NextureIcons icon={"NiShuffle"} size={"large"} />
          <Box className="flex flex-1 flex-col">
            <Box className="mb-1 flex flex-row justify-between gap-1">
              <Link href="#" variant="subtitle2" underline="hover" color="textPrimary" className="pt-0.25">
                Habit Hive
              </Link>
              <Chip label="Public" variant="filled" className="text-sm" size="small" />
            </Box>
            <Typography className="text-text-secondary line-clamp-2 min-h-8" variant="body2">
              A customizable habit tracker with features like daily insights, reminders, and progress visualizations to
              help users build healthy routines.
            </Typography>
            <Box className="flex flex-row items-end gap-1"></Box>
          </Box>
          <Button
            variant="outlined"
            size="small"
            color="grey"
            className="icon-only border-grey-50 hover:text-primary bg-background-paper! absolute right-7 -bottom-3.5"
            onClick={handleReactionClick}
          >
            {reaction ? <Box className="emoji-container">{reaction}</Box> : <NiFaceSmile size="small" />}
          </Button>
        </Box>

        <Popover
          open={open}
          anchorEl={reactionAnchorEl}
          onClose={handleReactionClose}
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
              setReaction(emojiObject.emoji);
              handleReactionClose();
            }}
            onReactionClick={(emojiObject) => {
              setReaction(emojiObject.emoji);
              handleReactionClose();
            }}
            reactionsDefaultOpen
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
