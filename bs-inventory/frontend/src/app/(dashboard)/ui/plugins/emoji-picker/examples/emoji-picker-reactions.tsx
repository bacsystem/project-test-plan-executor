import EmojiPicker, { EmojiStyle } from "emoji-picker-react";

import { Card, CardContent, Typography } from "@mui/material";

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
export default function EmojiPickerReactions() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="h6" className="card-title">
          Reactions
        </Typography>
        <EmojiPicker
          emojiStyle={EmojiStyle.NATIVE}
          onEmojiClick={(emoji, event, api) => {
            api?.collapseToReactions();
            console.log(emoji, event);
          }}
          onReactionClick={(emoji, event) => {
            console.log(emoji, event);
          }}
          reactionsDefaultOpen
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
      </CardContent>
    </Card>
  );
}
