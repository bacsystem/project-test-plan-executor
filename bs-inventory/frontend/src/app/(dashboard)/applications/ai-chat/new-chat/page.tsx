"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import ChatMessage from "../components/chat-message";
import { Conversation } from "../components/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MouseEvent, SyntheticEvent, useCallback, useEffect, useState } from "react";

import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Fade,
  FormControl,
  Menu,
  MenuItem,
  PopoverVirtualElement,
  TextareaAutosize,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import { Grid } from "@mui/material";

import { useLayoutContext } from "@/components/layout/layout-context";
import NiArrowOutUp from "@/icons/nexture/ni-arrow-out-up";
import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";
import NiMicrophone from "@/icons/nexture/ni-microphone";
import NiSendRight from "@/icons/nexture/ni-send-right";
import NiSendUpRight from "@/icons/nexture/ni-send-up-right";
import { cn } from "@/lib/utils";

export default function NewChat() {
  const { scrollToBottom } = useLayoutContext();

  // Version select dropdown
  const [versionSelectAnchorEl, setVersionSelectAnchorEl] = useState<
    EventTarget | Element | PopoverVirtualElement | null
  >(null);
  const versionSelectOpen = Boolean(versionSelectAnchorEl);
  const handleVersionSelectClick = (event: Event | SyntheticEvent) => {
    setVersionSelectAnchorEl(event.currentTarget);
  };
  const versionSelectHandleClose = () => {
    setVersionSelectAnchorEl(null);
  };

  // Extension toggles
  const [extension, setExtension] = useState("flash");
  const handlePlatform = (_event: MouseEvent<HTMLElement>, newExtension: string) => {
    setExtension(newExtension);
  };

  // Conversation and input
  const dummyAIAnswers: Conversation[] = [
    {
      id: crypto.randomUUID(),
      type: "AI",
      animate: true,
      message: `###### AI feature is not active!

##### 🔧 Feature Status Overview
- **UI is active:** The interface is visible and clickable.
- **AI functionality is not implemented:** The smart behavior behind the UI hasn't been added.
- **This is a UI-only template:** It's meant to show how the feature will look and feel.
- **No backend logic:** The AI or automation that powers the feature is a backend task.
- **Random Text:** This is some AI explanation to serve as an answer.
- **One more for the road:** Another unordered list item.

##### 📌 What This Means
1. It won't perform any intelligent actions.
2. It won't give any answers but show the UI.`,
    },
    {
      id: crypto.randomUUID(),
      type: "AI",
      animate: true,
      message: `###### Brains not found!

##### 🛠️ Current Feature Status
- **UI is complete and visible:** Users can see and interact with the interface.
- **AI functionality is not active:** The smart behavior behind the UI hasn't been added.
- **This is a UI-only template:** It's meant to show how the feature will look and feel.
- **No backend logic:** The AI or automation that powers the feature is a backend task.

##### 📣 In Plain Terms
The feature looks ready on the surface, but it doesn't “do” anything smart yet. It's just the shell — the brains are nowhere to be found.`,
    },
    {
      id: crypto.randomUUID(),
      type: "AI",
      animate: true,
      message: `###### AI is not here!

##### 🧩 Static Text Messages
- **Markdown enabled:** Markdown works well with the typewriter animation.
- **UI is complete and visible:** Users can see and interact with the interface.
- **AI functionality is not active:** The smart behavior behind the UI hasn't been added.
- **This is a UI-only template:** It's meant to show how the feature will look and feel.
- **No backend logic:** The AI or automation that powers the feature is a backend task.

##### 📝 In Plain Terms
The feature looks ready on the surface, but it doesn't “do” anything smart yet. It's just the shell — the brains are nowhere to be found.`,
    },
    {
      id: crypto.randomUUID(),
      type: "AI",
      animate: true,
      message: `
This is an answer without any markdown and it should be alright.`,
    },
  ];

  const [inputValue, setInputValue] = useState("");
  const [conversation, setConversation] = useState<Conversation[]>([]);
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
        type: "User",
        message: inputValue,
      },
    ]);
    setInputValue("");
    sendDummyAIAnswer();
  };

  const sendDummyAIAnswer = () => {
    setTimeout(() => {
      setConversation((prev) => [...prev, dummyAIAnswers[Math.floor(Math.random() * dummyAIAnswers.length)]]);
    }, 500);
  };

  const askFeedbackQuestion = (question: string) => {
    setConversation([
      ...conversation,
      {
        id: crypto.randomUUID(),
        type: "User",
        message: question,
      },
    ]);
    setInputValue("");
    sendDummyAIAnswer();
  };

  // Scrolling
  const scrollToBottomOfPage = useCallback(() => {
    scrollToBottom();
  }, [scrollToBottom]);

  const [isAnimating, setIsAnimating] = useState(false);
  useEffect(() => {
    let intervalId: any;

    if (isAnimating) {
      intervalId = setInterval(() => {
        scrollToBottomOfPage();
      }, 100);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isAnimating]);

  useEffect(() => {
    scrollToBottomOfPage();
  }, [conversation]);

  const router = useRouter();

  return (
    <Box className="relative flex h-full min-h-[calc(100vh-12rem)] flex-col items-center gap-5">
      <Grid container spacing={2.5} className="w-full" size={12}>
        <Grid container spacing={2.5} className="w-full" size={12}>
          <Grid size={{ md: "grow", xs: 12 }}>
            <Box className="flex flex-row gap-2">
              <Typography variant="h1" component="h1" className="mb-0">
                AI Chat
              </Typography>
              <Button
                variant="outlined"
                size="tiny"
                color="grey"
                onClick={handleVersionSelectClick}
                endIcon={
                  <NiChevronRightSmall
                    size="small"
                    className={cn(
                      "-ms-1 transition-transform rtl:rotate-180",
                      versionSelectOpen && "rotate-90 rtl:rotate-90",
                    )}
                  />
                }
              >
                <Box className="w-full truncate text-clip">Flash v2.5.0</Box>
              </Button>
              <Menu
                anchorEl={versionSelectAnchorEl as Element}
                open={versionSelectOpen}
                onClose={versionSelectHandleClose}
                className="mt-1"
                slots={{
                  transition: Fade,
                }}
              >
                <MenuItem onClick={versionSelectHandleClose} selected>
                  Flash v2.5
                </MenuItem>
                <MenuItem onClick={versionSelectHandleClose}>Code Master 1.4.0</MenuItem>
                <MenuItem onClick={versionSelectHandleClose}>Story Teller 1.0.0</MenuItem>
                <MenuItem onClick={versionSelectHandleClose}>Idea Machine 6.1.0</MenuItem>
              </Menu>
            </Box>

            <Breadcrumbs>
              <Link color="inherit" href="/dashboards/default">
                Home
              </Link>
              <Link color="inherit" href="/applications">
                Applications
              </Link>
              <Typography variant="body2">AI Chat</Typography>
            </Breadcrumbs>
          </Grid>

          <Grid size={{ xs: 12, md: "auto" }} className="flex flex-row items-start gap-2">
            <Button
              size="medium"
              color="primary"
              variant="contained"
              startIcon={<NiSendUpRight size={"medium"} />}
              onClick={() => {
                router.push("/applications/ai-chat/premium-plans");
              }}
            >
              Upgrade
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Box
        className={cn(
          "flex w-full max-w-200 flex-1 flex-col items-center justify-center gap-5 pb-32",
          conversation.length > 0 && "items-end justify-start gap-5",
        )}
      >
        {conversation.length === 0 ? (
          <Box className="flex flex-col items-center gap-4">
            <Typography
              variant="h1"
              className="from-primary-dark via-primary to-primary-light inline-block bg-linear-to-r bg-clip-text text-center text-transparent"
            >
              Welcome Laura, how can I help?
            </Typography>

            <Box className="mt-2 flex flex-col items-center gap-1">
              <Button
                variant="outlined"
                color="grey"
                className="hover:text-primary"
                onClick={() => {
                  askFeedbackQuestion("What's a common myth in tech?");
                }}
              >
                What's a common myth in tech?
              </Button>
              <Button
                variant="outlined"
                color="grey"
                className="hover:text-primary"
                onClick={() => {
                  askFeedbackQuestion("Explain the universe");
                }}
              >
                Explain the universe
              </Button>
              <Button
                variant="outlined"
                color="grey"
                className="hover:text-primary"
                onClick={() => {
                  askFeedbackQuestion("How would you name an app?");
                }}
              >
                How would you name an app?
              </Button>
            </Box>
          </Box>
        ) : (
          conversation.map((conversationMessage) => {
            return (
              <ChatMessage
                key={conversationMessage.id}
                conversation={conversationMessage}
                onAnimationStart={() => {
                  setIsAnimating(true);
                }}
                onAnimationEnd={() => {
                  setIsAnimating(false);
                }}
                onFeedbackQuestionClick={askFeedbackQuestion}
              />
            );
          })
        )}
      </Box>

      <Box className="fixed bottom-0 z-2 w-full px-4 sm:max-w-208">
        <Box className="-mx-4">
          <Box className="p-4">
            <Card className="focus-within:outline-primary/40 focus-within:outline-2 focus-within:-outline-offset-2">
              <CardContent className="flex flex-col gap-4 p-0!">
                <FormControl className="MuiTextField-root relative mb-0 w-full">
                  <TextareaAutosize
                    minRows={2}
                    maxRows={3}
                    className="MuiInputBase-root MuiInput-root outlined autosize bg-background-paper! w-full resize-none pe-28! outline-none!"
                    placeholder="Chat with the AI assistant..."
                    onChange={handleInputChange}
                    onKeyDown={handleInputKeyDown}
                    value={inputValue}
                  />
                  <Box className="absolute inset-e-0 flex flex-row p-2">
                    <Tooltip title="Talk" arrow enterDelay={2000}>
                      <Button
                        className="icon-only"
                        size="medium"
                        color="grey"
                        variant="text"
                        startIcon={<NiMicrophone size={"medium"} />}
                      />
                    </Tooltip>
                    <Tooltip title="Upload" arrow enterDelay={2000}>
                      <Button
                        className="icon-only"
                        size="medium"
                        color="grey"
                        variant="text"
                        startIcon={<NiArrowOutUp size={"medium"} />}
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
                <ToggleButtonGroup
                  size="tiny"
                  color="primary"
                  value={extension}
                  exclusive
                  onChange={handlePlatform}
                  className="mb-2 hidden px-4 md:flex"
                >
                  <ToggleButton
                    size="tiny"
                    value="flash"
                    className="[.Mui-selected]:bg-primary/10! [.Mui-selected]:text-primary! px-3!"
                  >
                    Flash
                  </ToggleButton>
                  <ToggleButton
                    size="tiny"
                    value="code-master"
                    className="[.Mui-selected]:bg-primary/10! [.Mui-selected]:text-primary! px-3!"
                  >
                    Code Master
                  </ToggleButton>
                  <ToggleButton
                    size="tiny"
                    value="story-teller"
                    className="[.Mui-selected]:bg-primary/10! [.Mui-selected]:text-primary! px-3!"
                  >
                    Story Teller
                  </ToggleButton>
                  <ToggleButton
                    size="tiny"
                    value="idea-machine"
                    className="[.Mui-selected]:bg-primary/10! [.Mui-selected]:text-primary! px-3!"
                  >
                    Idea Machine
                  </ToggleButton>
                </ToggleButtonGroup>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
