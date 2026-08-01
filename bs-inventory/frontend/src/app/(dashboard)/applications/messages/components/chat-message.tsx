"use client";
import "yet-another-react-lightbox/styles.css";

import { Conversation } from "./types";
import EmojiPicker, { EmojiStyle } from "emoji-picker-react";
import { MouseEvent, useState } from "react";
import Lightbox from "yet-another-react-lightbox";

import { Avatar, Box, Button, Card, CardContent, Grid, Popover, Typography } from "@mui/material";

import NiAcorn from "@/icons/nexture/ni-acorn";
import NiAirBalloon from "@/icons/nexture/ni-air-balloon";
import NiChef from "@/icons/nexture/ni-chef";
import NiCross from "@/icons/nexture/ni-cross";
import NiFaceSmile from "@/icons/nexture/ni-face-smile";
import NiFlag from "@/icons/nexture/ni-flag";
import NiGerm from "@/icons/nexture/ni-germ";
import NiQuestionHexagon from "@/icons/nexture/ni-question-hexagon";
import NiReverseLeft from "@/icons/nexture/ni-reverse-left";
import NiShare from "@/icons/nexture/ni-share";
import NiTelescope from "@/icons/nexture/ni-telescope";
import NiTrophy from "@/icons/nexture/ni-trophy";
import { cn } from "@/lib/utils";

type ChatMessageProps = {
  conversation: Conversation;
};

export default function ChatMessage({ conversation }: ChatMessageProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const [reactionAnchorEl, setReactionAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [reaction, setReaction] = useState<string | null>(null);
  const handleReactionClick = (event: MouseEvent<HTMLButtonElement>) => {
    setReactionAnchorEl(event.currentTarget);
  };

  const handleReactionClose = () => {
    setReactionAnchorEl(null);
  };

  const reactionOpen = Boolean(reactionAnchorEl);
  return (
    <Box
      key={conversation.id}
      className={cn(
        "row relative flex w-full gap-2.5",
        conversation.owner && "flex-row-reverse self-end",
        conversation.images && "w-full max-w-sm",
      )}
    >
      <Avatar alt={conversation.name} src={conversation.avatar} className="mt-5 flex-none" />
      <Card className={cn("group relative overflow-visible", conversation.borderClass && conversation.borderClass)}>
        <CardContent className="relative flex flex-col gap-3 py-2!">
          <Box
            className={cn(
              "relative flex flex-row items-baseline gap-2.5 pe-16",
              conversation.owner && "flex-row-reverse ps-16 pe-0",
            )}
          >
            {/* Title and date */}
            <Typography variant="subtitle2" className={cn(conversation.titleClass && conversation.titleClass)}>
              {conversation.name}
            </Typography>
            <Typography variant="body2" className="text-text-disabled">
              {conversation.date}
            </Typography>

            {/* Actions */}
            <Box
              className={cn(
                "pointer-events-none absolute -top-1 flex gap-1 opacity-0 transition-opacity group-hover:pointer-events-auto group-hover:opacity-100",
                reactionOpen && "pointer-events-auto opacity-100",
                conversation.owner && "flex-row-reverse",
                conversation.owner && "ltr:right-[unset] ltr:-left-3 rtl:-right-3 rtl:left-[unset]",
                !conversation.owner && "ltr:-right-3 ltr:left-[unset] rtl:right-[unset] rtl:-left-3",
              )}
            >
              <Button
                className="icon-only"
                size="tiny"
                color="grey"
                variant="pastel"
                startIcon={<NiFaceSmile size={"small"} />}
                onClick={handleReactionClick}
              />
              <Button
                className="icon-only"
                size="tiny"
                color="grey"
                variant="pastel"
                startIcon={<NiShare size={"small"} />}
              />
            </Box>
          </Box>

          {conversation.images && (
            <>
              <Grid container spacing={2.5} size={12}>
                {conversation.images.map((image, index) => {
                  return (
                    <Grid key={index} size={{ xs: 12, sm: conversation.images?.length === 1 ? 12 : 6 }}>
                      <img
                        src={image}
                        alt={"recent"}
                        loading="lazy"
                        className="relative z-0 h-50 w-full max-w-xs cursor-pointer rounded-lg object-cover transition-transform"
                        onClick={() => setLightboxOpen(true)}
                      />
                    </Grid>
                  );
                })}
              </Grid>
              <Lightbox
                open={lightboxOpen}
                close={() => setLightboxOpen(false)}
                slides={[{ src: "/images/products/product-2-large.jpg" }]}
                controller={{
                  closeOnBackdropClick: true,
                  disableSwipeNavigation: true,
                }}
                className="rounded-lightbox"
                render={{
                  buttonPrev: () => undefined,
                  buttonNext: () => undefined,
                  iconClose: () => <NiCross size={"large"} />,
                }}
              />
            </>
          )}
          <Typography
            variant="body1"
            className={cn("emoji-container whitespace-pre-line", conversation.owner && "text-end")}
          >
            {conversation.message}
          </Typography>
        </CardContent>
        <Button
          variant="outlined"
          size="small"
          color="grey"
          className={cn(
            "icon-only border-grey-50 hover:text-primary bg-background-paper! pointer-events-none absolute -bottom-3.5 opacity-0 transition-opacity",
            conversation.owner ? "inset-s-7" : "inset-e-7",
            reaction && "pointer-events-auto opacity-100",
          )}
          onClick={handleReactionClick}
        >
          {reaction && <Box className="emoji-container">{reaction}</Box>}
        </Button>
      </Card>

      {/* Reaction popover */}
      <Popover
        open={reactionOpen}
        anchorEl={reactionAnchorEl}
        onClose={handleReactionClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
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
    </Box>
  );
}
