import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState } from "react";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

import { useLayoutContext } from "@/components/layout/layout-context";
import { MenuLinkButton } from "@/components/layout/menu-link-button";
import NiChevronLeftSmall from "@/icons/nexture/ni-chevron-left-small";
import NiSearch from "@/icons/nexture/ni-search";

export const AiChatMenuContent = () => {
  const t = useTranslations("dashboard");

  const { setTemporaryShowPrimaryMenu, setMenuSelectedSecondaryItem } = useLayoutContext();

  const [open, setOpen] = useState(false);

  const handleClickOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleBackButtonClick = () => {
    setTemporaryShowPrimaryMenu(true);
    setMenuSelectedSecondaryItem(undefined);
  };
  return (
    <>
      <Box className="mb-3.5 flex flex-row items-start gap-2">
        <Button
          className="icon-only -mt-1"
          size="small"
          color="primary"
          variant="text"
          startIcon={<NiChevronLeftSmall size={"small"} />}
          onClick={handleBackButtonClick}
        />
        <Typography variant="h6" className={"text-primary -mt-1 leading-8"}>
          AI Chat
        </Typography>
      </Box>
      <Box className="flex h-full w-full flex-1 flex-col justify-between gap-8">
        <Box className="flex flex-1 flex-col gap-4">
          {/* New Chat and Extensions button */}
          <Box className="flex flex-col gap-1">
            <MenuLinkButton to="/applications/ai-chat/new-chat" icon="NiMessagePlus">
              New Chat
            </MenuLinkButton>

            <MenuLinkButton to="/applications/ai-chat/extensions" icon="NiPuzzle">
              Extensions
            </MenuLinkButton>
          </Box>

          {/* Installed Extensions */}
          <Box className="flex flex-col gap-1">
            <Typography variant="body2" className={"text-text-disabled-dark px-2.5 leading-6 font-semibold"}>
              Installed Extensions
            </Typography>
            <MenuLinkButton
              to="/applications/ai-chat/extension-detail?extension=flash"
              avatarSrc="/images/icons/lightning-icon.png"
              avatarAlt="Flash"
            >
              Flash
            </MenuLinkButton>
            <MenuLinkButton
              to="/applications/ai-chat/extension-detail?extension=code-master"
              avatarSrc="/images/icons/document-icon.png"
              avatarAlt="Code Master"
            >
              Code Master
            </MenuLinkButton>
            <MenuLinkButton
              to="/applications/ai-chat/extension-detail?extension=scholar-ai"
              avatarSrc="/images/icons/hat-icon.png"
              avatarAlt="Scholar AI"
            >
              Scholar AI
            </MenuLinkButton>
            <MenuLinkButton
              to="/applications/ai-chat/extension-detail?extension=color-analysis"
              avatarSrc="/images/icons/flask-icon.png"
              avatarAlt="Color Analysis"
            >
              Color Analysis
            </MenuLinkButton>
          </Box>

          {/* Controls */}
          <Box className="flex flex-col gap-1">
            <Typography variant="body2" className={"text-text-disabled-dark px-2.5 leading-6 font-semibold"}>
              Controls
            </Typography>
            <MenuLinkButton to="/applications/ai-chat/premium-plans" icon="NiMagicWand">
              Premium Plans
            </MenuLinkButton>
            <MenuLinkButton to="/applications/ai-chat/api-access" icon="NiCode">
              API Access
            </MenuLinkButton>
            <MenuLinkButton to="/applications/ai-chat/settings" icon="NiKnobs">
              Settings
            </MenuLinkButton>
          </Box>

          {/* Recent Chats */}
          <Box className="flex flex-col gap-1">
            <Box className="group flex cursor-pointer flex-row" onClick={handleClickOpenDialog}>
              <Typography
                variant="body2"
                className="text-text-disabled group-hover:text-primary flex-1 px-2.5 leading-6 font-semibold transition-colors"
              >
                Recent Chats
              </Typography>
              <NiSearch className="text-text-secondary group-hover:text-primary" />
            </Box>
            <MenuLinkButton to="/applications/ai-chat/recent-chat?chat=chat-1" size="medium" className="line-clamp-1">
              <Typography variant="body1" className="line-clamp-1 leading-5">
                Resume/CV reviews and rewrite
              </Typography>
            </MenuLinkButton>
            <MenuLinkButton to="/applications/ai-chat/recent-chat?chat=chat-2" size="medium" className="line-clamp-1">
              <Typography variant="body1" className="line-clamp-1 leading-5">
                Inventing recipes from random ingredients
              </Typography>
            </MenuLinkButton>
            <MenuLinkButton to="/applications/ai-chat/recent-chat?chat=chat-3" size="medium" className="line-clamp-1">
              <Typography variant="body1" className="line-clamp-1 leading-5">
                Comparing ideologies across european cultures
              </Typography>
            </MenuLinkButton>
            <MenuLinkButton to="/applications/ai-chat/recent-chat?chat=chat-4" size="medium" className="line-clamp-1">
              <Typography variant="body1" className="line-clamp-1 leading-5">
                Fan theories and character developments
              </Typography>
            </MenuLinkButton>
            <MenuLinkButton to="/applications/ai-chat/recent-chat?chat=chat-5" size="medium" className="line-clamp-1">
              <Typography variant="body1" className="line-clamp-1 leading-5">
                World-building for a fantasy game
              </Typography>
            </MenuLinkButton>
            <MenuLinkButton to="/applications/ai-chat/recent-chat?chat=chat-6" size="medium" className="line-clamp-1">
              <Typography variant="body1" className="line-clamp-1 leading-5">
                Recommendations for post-apocalyptic movies
              </Typography>
            </MenuLinkButton>
          </Box>
        </Box>

        <Box
          component={Link}
          href="/applications/ai-chat/premium-plans"
          className="group flex w-full cursor-pointer flex-col items-center justify-center gap-2"
        >
          <Typography variant="body1" className="px-4 text-center">
            {t("menu-cta-copy")}
          </Typography>
          <Box className="group-hover:bg-primary/10 text-primary rounded-md px-5 py-2 font-medium transition-colors">
            {t("menu-cta-button")}
          </Box>
        </Box>
      </Box>

      <Dialog
        onClose={handleCloseDialog}
        open={open}
        maxWidth="md"
        fullWidth
        classes={{ container: "items-start", paper: "mt-16" }}
      >
        <DialogTitle className="border-grey-100 border-b py-0">
          <Input
            classes={{ input: "ps-0!" }}
            className="w-full py-7!"
            placeholder="Search"
            startAdornment={
              <InputAdornment position="start">
                <NiSearch size="medium" />
              </InputAdornment>
            }
          />
        </DialogTitle>
        <DialogContent className="flex flex-col pt-6 pb-0">
          <Box className="flex flex-col gap-2.5">
            <Box>
              <Typography variant="body2" className="text-text-disabled mb-2 font-bold">
                Today
              </Typography>
              <List>
                <ListItem className="p-0">
                  <ListItemButton classes={{ root: "group items-start" }}>
                    <ListItemText
                      primary={
                        <Typography component="span" className="leading-4" variant="body1">
                          Invent quirky product names for a fictional subscription service
                        </Typography>
                      }
                      secondary="2 hours ago"
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem className="p-0">
                  <ListItemButton classes={{ root: "group items-start" }}>
                    <ListItemText
                      primary={
                        <Typography component="span" className="leading-4" variant="body1">
                          Refine AI image prompts for healthcare or visual storytelling
                        </Typography>
                      }
                      secondary="3 hours ago"
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem className="p-0">
                  <ListItemButton classes={{ root: "group items-start" }}>
                    <ListItemText
                      primary={
                        <Typography component="span" className="line-clamp-1 leading-4" variant="body1">
                          Brainstorm UI microcopy with playful tone variations
                        </Typography>
                      }
                      secondary="3 hours ago"
                    />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
            <Box>
              <Typography variant="body2" className="text-text-disabled mb-2 font-bold">
                Week
              </Typography>
              <List>
                <ListItem className="p-0">
                  <ListItemButton classes={{ root: "group items-start" }}>
                    <ListItemText
                      primary={
                        <Typography component="span" className="leading-4" variant="body1">
                          Translate idioms across languages with cultural nuance
                        </Typography>
                      }
                      secondary="2 days ago"
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem className="p-0">
                  <ListItemButton classes={{ root: "group items-start" }}>
                    <ListItemText
                      primary={
                        <Typography component="span" className="leading-4" variant="body1">
                          Compare localization strategies for global apps
                        </Typography>
                      }
                      secondary="2 days ago"
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem className="p-0">
                  <ListItemButton classes={{ root: "group items-start" }}>
                    <ListItemText
                      primary={
                        <Typography component="span" className="leading-4" variant="body1">
                          Blender scene organization for animation pipelines
                        </Typography>
                      }
                      secondary="4 days ago"
                    />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
            <Box>
              <Typography variant="body2" className="text-text-disabled mb-2 font-bold">
                Month
              </Typography>
              <List>
                <ListItem className="p-0">
                  <ListItemButton classes={{ root: "group items-start" }}>
                    <ListItemText
                      primary={
                        <Typography component="span" className="leading-4" variant="body1">
                          Iterate on taglines for a multilingual campaign
                        </Typography>
                      }
                      secondary="9 days ago"
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem className="p-0">
                  <ListItemButton classes={{ root: "group items-start" }}>
                    <ListItemText
                      primary={
                        <Typography component="span" className="leading-4" variant="body1">
                          Craft tone-shifting copy for different audience personas
                        </Typography>
                      }
                      secondary="10 days ago"
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem className="p-0">
                  <ListItemButton classes={{ root: "group items-start" }}>
                    <ListItemText
                      primary={
                        <Typography component="span" className="leading-4" variant="body1">
                          What makes a name “sticky” in branding?
                        </Typography>
                      }
                      secondary="10 days ago"
                    />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions className="justify-center">
          <Button variant="text" size="tiny" color="primary">
            View More
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
