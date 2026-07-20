/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import ChatMessage from "../components/chat-message";
import { Conversation } from "../components/types";
import EmojiPicker, { EmojiStyle } from "emoji-picker-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MouseEvent, useEffect, useState } from "react";

import {
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Popover,
  PopoverVirtualElement,
  TextareaAutosize,
  Tooltip,
  Typography,
} from "@mui/material";

import { useLayoutContext } from "@/components/layout/layout-context";
import NiAcorn from "@/icons/nexture/ni-acorn";
import NiAirBalloon from "@/icons/nexture/ni-air-balloon";
import NiCamera from "@/icons/nexture/ni-camera";
import NiChef from "@/icons/nexture/ni-chef";
import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";
import NiCross from "@/icons/nexture/ni-cross";
import NiEllipsisHorizontal from "@/icons/nexture/ni-ellipsis-horizontal";
import NiFaceSmile from "@/icons/nexture/ni-face-smile";
import NiFlag from "@/icons/nexture/ni-flag";
import NiGerm from "@/icons/nexture/ni-germ";
import NiMicrophone from "@/icons/nexture/ni-microphone";
import NiPhoneHandset from "@/icons/nexture/ni-phone-handset";
import NiPlusSquare from "@/icons/nexture/ni-plus-square";
import NiQuestionHexagon from "@/icons/nexture/ni-question-hexagon";
import NiReverseLeft from "@/icons/nexture/ni-reverse-left";
import NiSearch from "@/icons/nexture/ni-search";
import NiSendRight from "@/icons/nexture/ni-send-right";
import NiTelescope from "@/icons/nexture/ni-telescope";
import NiTrophy from "@/icons/nexture/ni-trophy";
import { cn } from "@/lib/utils";

export default function Page() {
  const router = useRouter();
  const { scrollToBottom } = useLayoutContext();
  const [callMenuAnchorEl, setCallMenuAnchorEl] = useState<EventTarget | Element | PopoverVirtualElement | null>(null);
  const openCallMenu = Boolean(callMenuAnchorEl);
  const handleClickCallMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setCallMenuAnchorEl(event.currentTarget);
  };
  const handleCloseCallMenu = () => {
    setCallMenuAnchorEl(null);
  };

  const [inputValue, setInputValue] = useState("");
  const [conversation, setConversation] = useState<Conversation[]>([
    {
      id: crypto.randomUUID(),
      avatar: "/images/avatars/avatar-1.jpg",
      name: "Laura Ellis",
      date: "01:20 PM",
      titleClass: "text-primary",
      borderClass: "outline outline-primary/10",
      message: `If I lose another game to the Sicilian Defense, I'm quitting chess and taking up checkers 😡`,
      owner: true,
    },
    {
      id: crypto.randomUUID(),
      avatar: "/images/avatars/avatar-3.jpg",
      name: "Daniela Fontaine",
      date: "01:21 PM",
      titleClass: "text-accent-6",
      borderClass: "",
      message: `Please don't. Checkers doesn't even have queens. Just learn the Anti-Sicilian lines.`,
      owner: false,
    },
    {
      id: crypto.randomUUID(),
      avatar: "/images/avatars/avatar-8.jpg",
      name: "Ethan Cooper",
      date: "01:24 PM",
      titleClass: "text-accent-1",
      borderClass: "",
      message: `Or… hear me out… embrace the chaos with the Wing Gambit. Reckless, but it'll throw people off.`,
      owner: false,
    },
    {
      id: crypto.randomUUID(),
      avatar: "/images/avatars/avatar-1.jpg",
      name: "Laura Ellis",
      date: "01:25 PM",
      titleClass: "text-primary",
      borderClass: "outline outline-primary/10",
      message: `Reckless is my middle name. But last time I tried a gambit, I lost in 12 moves 😢`,
      owner: true,
    },
    {
      id: crypto.randomUUID(),
      avatar: "/images/avatars/avatar-3.jpg",
      name: "Daniela Fontaine",
      date: "01:26 PM",
      titleClass: "text-accent-6",
      borderClass: "",
      message: `That's not a gambit problem, that's a “forgetting to castle” problem 😁`,
      owner: false,
    },
    {
      id: crypto.randomUUID(),
      avatar: "/images/avatars/avatar-1.jpg",
      name: "Laura Ellis",
      date: "01:26 PM",
      titleClass: "text-primary",
      borderClass: "outline outline-primary/10",
      message: `Fine, fine. Next match, I'll castle early. And when I win, I'm naming our club Pawn Stars.`,
      owner: true,
    },
    {
      id: crypto.randomUUID(),
      avatar: "/images/avatars/avatar-8.jpg",
      name: "Ethan Cooper",
      date: "01:30 PM",
      titleClass: "text-accent-1",
      borderClass: "",
      message: `No way. It has to be Knights of the Square Table. Classy and clever 😎`,
      owner: false,
    },
    {
      id: crypto.randomUUID(),
      avatar: "/images/avatars/avatar-8.jpg",
      name: "Ethan Cooper",
      date: "01:40 PM",
      titleClass: "text-accent-1",
      borderClass: "",
      message: `New group avatar!`,
      images: ["/images/products/product-2.jpg"],
      owner: false,
    },
    {
      id: crypto.randomUUID(),
      avatar: "/images/avatars/avatar-1.jpg",
      name: "Laura Ellis",
      date: "01:53 PM",
      titleClass: "text-primary",
      borderClass: "outline outline-primary/10",
      message: `Okay, we'll settle this the chess way: a mini-tournament. Winner gets naming rights.`,
      owner: true,
    },
    {
      id: crypto.randomUUID(),
      avatar: "/images/avatars/avatar-8.jpg",
      name: "Ethan Cooper",
      date: "01:54 PM",
      titleClass: "text-accent-1",
      borderClass: "",
      message: `Deal!👍`,
      owner: false,
    },
  ]);
  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };
  const handleInputKeyDown = (event: any) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendUserInput();
    }
  };
  const handleInputSendClick = () => {
    sendUserInput();
  };
  const sendUserInput = () => {
    if (inputValue.trim() === "") {
      return;
    }
    setConversation([
      ...conversation,
      {
        id: crypto.randomUUID(),
        avatar: "/images/avatars/avatar-1.jpg",
        date: "01:20 PM",
        name: "Laura Ellis",
        message: inputValue,
        titleClass: "text-primary",
        borderClass: "outline outline-primary/40",
        owner: true,
      },
    ]);
    setInputValue("");
  };

  // Scrolling
  useEffect(() => {
    setTimeout(() => {
      scrollToBottom();
    }, 0);
  }, [conversation]);

  const [emojiAnchorEl, setEmojiAnchorEl] = useState<HTMLButtonElement | null>(null);
  const emojiHandleButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    setEmojiAnchorEl(event.currentTarget);
  };
  const emojiHandleClose = () => {
    setEmojiAnchorEl(null);
  };
  const emojiPickerOpen = Boolean(emojiAnchorEl);

  return (
    <Box className="relative flex h-full min-h-[calc(100vh-12rem)] flex-col items-center gap-5">
      <Grid container spacing={5} className="w-full" size={12}>
        <Grid container spacing={2.5} className="w-full" size={12}>
          <Grid size={{ md: "grow", xs: 12 }}>
            <Box className="flex gap-2">
              <Avatar alt="Rook & Roll" src="/images/models/model-13.jpg" className="me-0" />
              <Box>
                <Typography variant="h1" component="h1" className="mb-0">
                  Rook & Roll
                </Typography>
                <Breadcrumbs>
                  <Link color="inherit" href="/dashboards/default">
                    Home
                  </Link>
                  <Link color="inherit" href="/applications">
                    Applications
                  </Link>
                  <Typography variant="body2">Messages</Typography>
                </Breadcrumbs>
              </Box>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: "auto" }} className="flex flex-row items-start gap-2">
            <Button
              className="surface-standard"
              size="medium"
              color="grey"
              variant="surface"
              onClick={handleClickCallMenu}
              startIcon={<NiPhoneHandset size={"medium"} className={cn("transition-transform rtl:rotate-180")} />}
              endIcon={
                <NiChevronRightSmall
                  size={"medium"}
                  className={cn("transition-transform rtl:rotate-180", openCallMenu && "rotate-90 rtl:rotate-90")}
                />
              }
            >
              Call
            </Button>

            <Menu
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              anchorEl={callMenuAnchorEl as Element}
              open={openCallMenu}
              onClose={handleCloseCallMenu}
              className="mt-1"
            >
              <MenuItem
                onClick={() => {
                  handleCloseCallMenu();
                  router.push("/applications/messages/call");
                }}
              >
                <ListItemIcon>
                  <NiCamera size={"medium"} />
                </ListItemIcon>
                <ListItemText>Video</ListItemText>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseCallMenu();
                  router.push("/applications/messages/call");
                }}
              >
                <ListItemIcon>
                  <NiMicrophone size={"medium"} />
                </ListItemIcon>
                <ListItemText>Voice</ListItemText>
              </MenuItem>
            </Menu>
            <Tooltip title="Search">
              <Button className="icon-only surface-standard" color="grey" variant="surface">
                <NiSearch size={"medium"} />
              </Button>
            </Tooltip>
            <Tooltip title="Settings">
              <Button className="icon-only surface-standard" color="grey" variant="surface">
                <NiEllipsisHorizontal size={"medium"} />
              </Button>
            </Tooltip>
            <Tooltip title="Close">
              <Button
                className="icon-only surface-standard"
                color="grey"
                variant="surface"
                component={Link}
                href="/applications/messages/home"
              >
                <NiCross size={"medium"} />
              </Button>
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>

      <Box className={cn("flex w-full max-w-200 flex-1 flex-col items-start justify-start gap-5 pb-32")}>
        {conversation.map((conversationMessage) => {
          return <ChatMessage key={conversationMessage.id} conversation={conversationMessage} />;
        })}
      </Box>

      <Box className="fixed bottom-0 z-2 w-full px-4 sm:max-w-208">
        <Box className="-mx-4">
          <Box className="p-4">
            <Card className="focus-within:outline-primary/40 focus-within:outline-2 focus-within:-outline-offset-2">
              <CardContent className="flex flex-row items-start p-0!">
                <FormControl className="MuiTextField-root relative mb-0 w-full flex-row items-start">
                  <Box className="absolute inset-s-0 flex flex-row p-2">
                    <Tooltip title="Upload" arrow enterDelay={2000}>
                      <Button
                        className="icon-only"
                        size="medium"
                        color="grey"
                        variant="text"
                        startIcon={<NiPlusSquare size={"medium"} />}
                      />
                    </Tooltip>
                  </Box>
                  <TextareaAutosize
                    minRows={1}
                    maxRows={2}
                    className="MuiInputBase-root MuiInput-root outlined autosize bg-background-paper! emoji-container w-full resize-none p-4! ps-12! pe-28! outline-none!"
                    placeholder="Type something..."
                    onChange={handleInputChange}
                    onKeyDown={handleInputKeyDown}
                    value={inputValue}
                  />
                  <Box className="absolute inset-e-0 flex flex-row p-2">
                    <Tooltip title="Emoji" arrow enterDelay={2000}>
                      <Button
                        className="icon-only"
                        size="medium"
                        color="grey"
                        variant="text"
                        startIcon={<NiFaceSmile size={"medium"} />}
                        onClick={emojiHandleButtonClick}
                      />
                    </Tooltip>
                    <Tooltip title="Talk" arrow enterDelay={2000}>
                      <Button
                        className="icon-only"
                        size="medium"
                        color="grey"
                        variant="text"
                        startIcon={<NiMicrophone size={"medium"} />}
                      />
                    </Tooltip>
                    <Tooltip title="Send" arrow enterDelay={2000}>
                      <Button
                        className="icon-only ms-1"
                        size="medium"
                        color="primary"
                        variant="pastel"
                        onClick={handleInputSendClick}
                        startIcon={<NiSendRight size={"medium"} />}
                      />
                    </Tooltip>
                  </Box>
                </FormControl>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>

      <Popover
        open={emojiPickerOpen}
        anchorEl={emojiAnchorEl}
        onClose={emojiHandleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
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
            setInputValue(inputValue + emojiObject.emoji);
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
    </Box>
  );
}
