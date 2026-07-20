import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { SyntheticEvent, useEffect, useState } from "react";

import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
  Badge,
  Box,
  Button,
  ClickAwayListener,
  Divider,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  PopoverVirtualElement,
  Select,
  Tab,
  TextField,
  Typography,
} from "@mui/material";

import { useLayoutContext } from "@/components/layout/layout-context";
import { MenuLinkButton } from "@/components/layout/menu-link-button";
import NiCheck from "@/icons/nexture/ni-check";
import NiCheckSquare from "@/icons/nexture/ni-check-square";
import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";
import NiChevronLeftSmall from "@/icons/nexture/ni-chevron-left-small";
import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";
import NiCross from "@/icons/nexture/ni-cross";
import NiDocumentImage from "@/icons/nexture/ni-document-image";
import NiEllipsisHorizontal from "@/icons/nexture/ni-ellipsis-horizontal";
import NiMessage from "@/icons/nexture/ni-message";
import NiMessages from "@/icons/nexture/ni-messages";
import NiSearch from "@/icons/nexture/ni-search";
import NiUser from "@/icons/nexture/ni-user";
import { cn } from "@/lib/utils";

const menuScenes = {
  HOME: "home",
  CONTACTS: "contacts",
  NEW_GROUP_1: "new-group-step-1",
  NEW_GROUP_2: "new-group-step-2",
  NEW_CONTACT: "new-contact",
};
export const MessagesMenuContent = () => {
  const pathname = usePathname();
  const t = useTranslations("dashboard");
  const router = useRouter();

  const { setTemporaryShowPrimaryMenu, setMenuSelectedSecondaryItem } = useLayoutContext();

  const [selectedMenuScene, setSelectedMenuScene] = useState<string>(menuScenes.HOME);
  const [activeMenuScene, setActiveMenuScene] = useState<string>();

  const [isMenuSceneTemporary, setIsMenuSceneTemporary] = useState<boolean>(false);

  // set the active menu scene based on the location pathname
  useEffect(() => {
    setTimeout(() => {
      setSelectedMenuScene(menuScenes.HOME);
      setActiveMenuScene(menuScenes.HOME);
    }, 0);
  }, [pathname]);

  const handleBackButtonClick = () => {
    setIsMenuSceneTemporary(false);
    setActiveMenuScene(menuScenes.HOME);
    setSelectedMenuScene(menuScenes.HOME);
  };

  const handleHomeButtonClick = () => {
    setTemporaryShowPrimaryMenu(true);
    setMenuSelectedSecondaryItem(undefined);
  };

  const handleChatClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setIsMenuSceneTemporary(false);
    setSelectedMenuScene(menuScenes.HOME);
    setActiveMenuScene(menuScenes.HOME);
    router.push("/applications/messages/chat");
  };

  const handleChatNewClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setIsMenuSceneTemporary(false);
    setSelectedMenuScene(menuScenes.HOME);
    setActiveMenuScene(menuScenes.HOME);
    router.push("/applications/messages/chat-new");
  };

  const handleNewGroupBackClick = () => {
    setIsMenuSceneTemporary(false);
    setSelectedMenuScene(menuScenes.NEW_GROUP_1);
    setActiveMenuScene(menuScenes.NEW_GROUP_1);
  };

  const handleClickAway = () => {
    if (isMenuSceneTemporary) {
      // set the active menu scene to the selected menu scene
      setIsMenuSceneTemporary(false);
      setActiveMenuScene(selectedMenuScene);
    }
  };

  const [tabValue, setTabValue] = useState("Recent");
  const handleChange = (_event: SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  const [moreMenuAnchorEl, setMoreMenuAnchorEl] = useState<EventTarget | Element | PopoverVirtualElement | null>(null);
  const openMoreMenu = Boolean(moreMenuAnchorEl);
  const handleClickMoreMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMoreMenuAnchorEl(event.currentTarget);
  };
  const handleCloseMoreMenu = () => {
    setMoreMenuAnchorEl(null);
  };

  return (
    <>
      <ClickAwayListener onClickAway={handleClickAway}>
        <Box className="flex flex-1 flex-col">
          {activeMenuScene === menuScenes.HOME && (
            <>
              <Box className="mb-3.5 flex flex-row items-start justify-between gap-2 px-2.5">
                <Box className="flex gap-2">
                  <Button
                    className="icon-only -mt-1"
                    size="small"
                    color="primary"
                    variant="text"
                    startIcon={<NiChevronLeftSmall size={"small"} />}
                    onClick={handleHomeButtonClick}
                  />
                  <Typography variant="h6" className={"text-primary -mt-1 leading-8"}>
                    Messages
                  </Typography>
                </Box>

                <Box className="flex">
                  <Button
                    className="icon-only -mt-1"
                    size="small"
                    color="grey"
                    variant="text"
                    onClick={handleClickMoreMenu}
                    startIcon={<NiEllipsisHorizontal size={"small"} />}
                  />
                  <Menu
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                    anchorEl={moreMenuAnchorEl as Element}
                    open={openMoreMenu}
                    onClose={handleCloseMoreMenu}
                    className="mt-1"
                  >
                    <MenuItem>
                      <ListItemIcon>
                        <NiMessage size={"medium"} />
                      </ListItemIcon>
                      <ListItemText>New Chat</ListItemText>
                    </MenuItem>
                    <MenuItem>
                      <ListItemIcon>
                        <NiMessages size={"medium"} />
                      </ListItemIcon>
                      <ListItemText>New Group</ListItemText>
                    </MenuItem>
                    <MenuItem>
                      <ListItemIcon>
                        <NiUser size={"medium"} />
                      </ListItemIcon>
                      <ListItemText>New Contact</ListItemText>
                    </MenuItem>
                    <Divider className="large" />
                    <MenuItem>
                      <ListItemIcon>
                        <NiCheckSquare size={"medium"} />
                      </ListItemIcon>
                      <ListItemText>Mark All Read</ListItemText>
                    </MenuItem>
                  </Menu>
                </Box>
              </Box>
              <Box className="flex h-full w-full flex-1 flex-col justify-between gap-8">
                <Box className="flex flex-1 flex-col gap-4">
                  {/* Search */}
                  <Box className="flex flex-col gap-1">
                    <FormControl variant="standard" className="outlined mb-0 px-2.5" size="small">
                      <Input
                        placeholder="Search"
                        size="small"
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton onClick={() => {}}>
                              <NiSearch size="medium" className="text-text-secondary" />
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </Box>

                  {/* Favorites */}
                  <Box className="flex flex-col gap-1">
                    <Typography variant="body2" className={"text-text-disabled-dark px-2.5 leading-6 font-semibold"}>
                      Favorites
                    </Typography>

                    <MenuLinkButton
                      onClick={handleChatClick}
                      avatarSrc="/images/avatars/avatar-3.jpg"
                      avatarClassname="small me-2 scale-100!"
                      to="/applications/messages/chat?chat=chat-1"
                    >
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Daniela Fontaine
                          </Typography>
                          <Typography component="p" className="text-text-secondary leading-3" variant="body2">
                            02:30 PM
                          </Typography>
                        </Box>
                        <Badge
                          badgeContent={2}
                          color="primary"
                          className="flex items-center"
                          slotProps={{
                            badge: { className: "pointer-events-none static transform-none" },
                          }}
                        />
                      </Box>
                    </MenuLinkButton>
                    <MenuLinkButton
                      onClick={handleChatClick}
                      avatarSrc="/images/models/model-13.jpg"
                      avatarClassname="small me-2 scale-100!"
                      to="/applications/messages/chat?chat=chat-1"
                    >
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            The Ellis Family
                          </Typography>
                          <Typography component="p" className="text-text-secondary leading-3" variant="body2">
                            Yesterday
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                    <MenuLinkButton
                      onClick={handleChatClick}
                      avatarSrc="/images/avatars/avatar-8.jpg"
                      avatarClassname="small me-2 scale-100!"
                      to="/applications/messages/chat?chat=chat-1"
                    >
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Liam Carter
                          </Typography>
                          <Typography component="p" className="text-text-secondary leading-3" variant="body2">
                            Yesterday
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                  </Box>

                  {/* Recent and Unread */}
                  <Box className="flex flex-col gap-1">
                    <TabContext value={tabValue}>
                      <Box className="px-1.5">
                        <TabList onChange={handleChange} className="mb-0">
                          <Tab
                            label="Recent"
                            value="Recent"
                            className="text-text-disabled-light! [&.Mui-selected]:text-text-disabled-dark! hover:text-text-disabled-dark! border-none! bg-transparent! px-1! py-0! text-sm! leading-6! font-semibold!"
                          />
                          <Tab
                            label="Unread"
                            value="Unread"
                            className="text-text-disabled-light! [&.Mui-selected]:text-text-disabled-dark! hover:text-text-disabled-dark! border-none! bg-transparent! px-1! py-0! text-sm! leading-6! font-semibold!"
                          />
                        </TabList>
                      </Box>
                      <TabPanel value="Recent" className="p-0">
                        <MenuLinkButton
                          onClick={handleChatNewClick}
                          avatarSrc="/images/avatars/avatar-12.jpg"
                          avatarClassname="small me-2 scale-100!"
                          className={cn(location.pathname === "/applications/messages/chat-new" && "active")}
                          to="/applications/messages/chat-new"
                        >
                          <Box className="flex w-full flex-row items-center justify-between">
                            <Box className="flex flex-col">
                              <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                                Ethan Cooper
                              </Typography>
                              <Typography component="p" className="text-text-secondary leading-3" variant="body2">
                                Now
                              </Typography>
                            </Box>
                          </Box>
                        </MenuLinkButton>
                        <MenuLinkButton
                          onClick={handleChatClick}
                          avatarSrc="/images/avatars/avatar-3.jpg"
                          avatarClassname="small me-2 scale-100!"
                          to="/applications/messages/chat?chat=chat-1"
                        >
                          <Box className="flex w-full flex-row items-center justify-between">
                            <Box className="flex flex-col">
                              <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                                Daniela Fontaine
                              </Typography>
                              <Typography component="p" className="text-text-secondary leading-3" variant="body2">
                                02:30 PM
                              </Typography>
                            </Box>
                            <Badge
                              badgeContent={2}
                              color="primary"
                              className="flex items-center"
                              slotProps={{
                                badge: { className: "pointer-events-none static transform-none" },
                              }}
                            />
                          </Box>
                        </MenuLinkButton>
                        <MenuLinkButton
                          onClick={handleChatClick}
                          avatarSrc="/images/avatars/avatar-7.jpg"
                          avatarClassname="small me-2 scale-100!"
                          to="/applications/messages/chat?chat=chat-1"
                        >
                          <Box className="flex w-full flex-row items-center justify-between">
                            <Box className="flex flex-col">
                              <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                                Laura Ellis
                              </Typography>
                              <Typography component="p" className="text-text-secondary leading-3" variant="body2">
                                02:48 PM
                              </Typography>
                            </Box>
                          </Box>
                        </MenuLinkButton>
                        <MenuLinkButton
                          onClick={handleChatClick}
                          avatarSrc="/images/avatars/avatar-10.jpg"
                          avatarClassname="small me-2 scale-100!"
                          to="/applications/messages/chat?chat=chat-1"
                        >
                          <Box className="flex w-full flex-row items-center justify-between">
                            <Box className="flex flex-col">
                              <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                                Mia Sullivan
                              </Typography>
                              <Typography component="p" className="text-text-secondary leading-3" variant="body2">
                                08:50 PM
                              </Typography>
                            </Box>
                          </Box>
                        </MenuLinkButton>
                        <MenuLinkButton
                          onClick={handleChatClick}
                          avatarSrc="/images/avatars/avatar-1.jpg"
                          avatarClassname="small me-2 scale-100!"
                          to="/applications/messages/chat?chat=chat-1"
                        >
                          <Box className="flex w-full flex-row items-center justify-between">
                            <Box className="flex flex-col">
                              <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                                Laura Ellis
                              </Typography>
                              <Typography component="p" className="text-text-secondary leading-3" variant="body2">
                                Yesterday
                              </Typography>
                            </Box>
                          </Box>
                        </MenuLinkButton>
                        <MenuLinkButton
                          onClick={handleChatClick}
                          to="/applications/messages/chat"
                          avatarSrc="/images/models/model-7.jpg"
                          avatarClassname="small me-2 scale-100!"
                          className={cn(location.pathname === "/applications/messages/chat" && "active")}
                        >
                          <Box className="flex w-full flex-row items-center justify-between">
                            <Box className="flex flex-col">
                              <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                                Rook & Roll
                              </Typography>
                              <Typography component="p" className="text-text-secondary leading-3" variant="body2">
                                Yesterday
                              </Typography>
                            </Box>
                          </Box>
                        </MenuLinkButton>
                        <MenuLinkButton
                          onClick={handleChatClick}
                          to="/applications/messages/chat?chat=chat-1"
                          avatarSrc="/images/avatars/avatar-8.jpg"
                          avatarClassname="small me-2 scale-100!"
                        >
                          <Box className="flex w-full flex-row items-center justify-between">
                            <Box className="flex flex-col">
                              <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                                Liam Carter
                              </Typography>
                              <Typography component="p" className="text-text-secondary leading-3" variant="body2">
                                Yesterday
                              </Typography>
                            </Box>
                          </Box>
                        </MenuLinkButton>
                        <MenuLinkButton
                          onClick={handleChatClick}
                          to="/applications/messages/chat?chat=chat-1"
                          avatarSrc="/images/models/model-13.jpg"
                          avatarClassname="small me-2 scale-100!"
                        >
                          <Box className="flex w-full flex-row items-center justify-between">
                            <Box className="flex flex-col">
                              <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                                The Ellis Family
                              </Typography>
                              <Typography component="p" className="text-text-secondary leading-3" variant="body2">
                                Yesterday
                              </Typography>
                            </Box>
                          </Box>
                        </MenuLinkButton>
                      </TabPanel>
                      <TabPanel value="Unread" className="p-0">
                        <MenuLinkButton
                          onClick={handleChatClick}
                          avatarSrc="/images/avatars/avatar-3.jpg"
                          avatarClassname="small me-2 scale-100!"
                          to="/applications/messages/chat?chat=chat-1"
                        >
                          <Box className="flex w-full flex-row items-center justify-between">
                            <Box className="flex flex-col">
                              <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                                Daniela Fontaine
                              </Typography>
                              <Typography component="p" className="text-text-secondary leading-3" variant="body2">
                                02:30 PM
                              </Typography>
                            </Box>
                            <Badge
                              badgeContent={2}
                              color="primary"
                              className="flex items-center"
                              slotProps={{
                                badge: { className: "pointer-events-none static transform-none" },
                              }}
                            />
                          </Box>
                        </MenuLinkButton>
                        <MenuLinkButton
                          onClick={handleChatClick}
                          avatarSrc="/images/models/model-15.jpg"
                          avatarClassname="small me-2 scale-100!"
                          to="/applications/messages/chat?chat=chat-1"
                        >
                          <Box className="flex w-full flex-row items-center justify-between">
                            <Box className="flex flex-col">
                              <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                                Daily Word
                              </Typography>
                              <Typography component="p" className="text-text-secondary leading-3" variant="body2">
                                Yesterday
                              </Typography>
                            </Box>
                            <Badge
                              badgeContent={999}
                              color="primary"
                              className="flex items-center"
                              slotProps={{
                                badge: { className: "pointer-events-none static transform-none" },
                              }}
                            />
                          </Box>
                        </MenuLinkButton>
                        <MenuLinkButton
                          onClick={handleChatClick}
                          avatarSrc="/images/models/model-10.jpg"
                          avatarClassname="small me-2 scale-100!"
                          to="/applications/messages/chat?chat=chat-1"
                        >
                          <Box className="flex w-full flex-row items-center justify-between">
                            <Box className="flex flex-col">
                              <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                                Channel 5
                              </Typography>
                              <Typography component="p" className="text-text-secondary leading-3" variant="body2">
                                Yesterday
                              </Typography>
                            </Box>
                            <Badge
                              badgeContent={999}
                              color="primary"
                              className="flex items-center"
                              slotProps={{
                                badge: { className: "pointer-events-none static transform-none" },
                              }}
                            />
                          </Box>
                        </MenuLinkButton>
                        <MenuLinkButton
                          onClick={handleChatClick}
                          avatarSrc="/images/models/model-11.jpg"
                          avatarClassname="small me-2 scale-100!"
                          to="/applications/messages/chat?chat=chat-1"
                        >
                          <Box className="flex w-full flex-row items-center justify-between">
                            <Box className="flex flex-col">
                              <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                                Gamers United
                              </Typography>
                              <Typography component="p" className="text-text-secondary leading-3" variant="body2">
                                Two days ago
                              </Typography>
                            </Box>
                            <Badge
                              badgeContent={999}
                              color="primary"
                              className="flex items-center"
                              slotProps={{
                                badge: { className: "pointer-events-none static transform-none" },
                              }}
                            />
                          </Box>
                        </MenuLinkButton>
                      </TabPanel>
                    </TabContext>
                  </Box>

                  {/* Actions */}
                  <Box className="flex flex-col gap-1">
                    <Typography variant="body2" className={"text-text-disabled-dark px-2.5 leading-6 font-semibold"}>
                      Actions
                    </Typography>

                    <MenuLinkButton
                      onClick={(event) => {
                        event.preventDefault();
                        setSelectedMenuScene(menuScenes.CONTACTS);
                        setActiveMenuScene(menuScenes.CONTACTS);
                      }}
                      icon="NiMessage"
                    >
                      New Chat
                    </MenuLinkButton>
                    <MenuLinkButton
                      onClick={(event) => {
                        event.preventDefault();
                        setSelectedMenuScene(menuScenes.NEW_GROUP_1);
                        setActiveMenuScene(menuScenes.NEW_GROUP_1);
                      }}
                      icon="NiMessages"
                    >
                      New Group
                    </MenuLinkButton>
                    <MenuLinkButton
                      onClick={(event) => {
                        event.preventDefault();
                        setSelectedMenuScene(menuScenes.NEW_CONTACT);
                        setActiveMenuScene(menuScenes.NEW_CONTACT);
                      }}
                      icon="NiUser"
                    >
                      New Contact
                    </MenuLinkButton>
                  </Box>
                </Box>

                <Box
                  component={Link}
                  href="#"
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
            </>
          )}
          {activeMenuScene === menuScenes.CONTACTS && (
            <>
              <Box className="mb-3.5 flex flex-row items-start gap-2 px-2.5">
                <Box className="flex gap-2">
                  <Button
                    className="icon-only -mt-1"
                    size="small"
                    color="primary"
                    variant="text"
                    startIcon={<NiChevronLeftSmall size={"small"} />}
                    onClick={handleBackButtonClick}
                  />
                  <Typography variant="h6" className={"text-primary -mt-1 leading-8"}>
                    Contacts
                  </Typography>
                </Box>
              </Box>
              <Box className="flex h-full w-full flex-1 flex-col justify-between gap-8">
                <Box className="flex flex-1 flex-col gap-4">
                  {/* Search */}
                  <Box className="flex flex-col gap-1">
                    <FormControl variant="standard" className="outlined mb-0 px-2.5" size="small">
                      <Input
                        placeholder="Search"
                        size="small"
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton onClick={() => {}}>
                              <NiSearch size="medium" className="text-text-secondary" />
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </Box>

                  {/* A */}
                  <Box className="flex flex-col gap-1">
                    <Typography variant="body2" className={"text-text-disabled-dark px-2.5 leading-6 font-semibold"}>
                      A
                    </Typography>

                    <MenuLinkButton
                      onClick={handleChatNewClick}
                      avatarSrc="/images/avatars/avatar-3.jpg"
                      avatarClassname="small me-2 scale-100!"
                    >
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Amelia Carter
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                    <MenuLinkButton
                      onClick={handleChatNewClick}
                      avatarSrc="/images/avatars/avatar-2.jpg"
                      avatarClassname="small me-2 scale-100!"
                    >
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Aaron Johnson
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                    <MenuLinkButton
                      onClick={handleChatNewClick}
                      avatarSrc="/images/avatars/avatar-7.jpg"
                      avatarClassname="small me-2 scale-100!"
                    >
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Ava Martinez
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                    <MenuLinkButton
                      onClick={handleChatNewClick}
                      avatarSrc="/images/avatars/avatar-9.jpg"
                      avatarClassname="small me-2 scale-100!"
                    >
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Adrian Smith
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                    <MenuLinkButton
                      onClick={handleChatNewClick}
                      avatarSrc="/images/avatars/avatar-12.jpg"
                      avatarClassname="small me-2 scale-100!"
                    >
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Alexander Davis
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                    <MenuLinkButton
                      onClick={handleChatNewClick}
                      avatarSrc="/images/avatars/avatar-16.jpg"
                      avatarClassname="small me-2 scale-100!"
                    >
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Ariana Wilson
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                  </Box>

                  {/* B */}
                  <Box className="flex flex-col gap-1">
                    <Typography variant="body2" className={"text-text-disabled-dark px-2.5 leading-6 font-semibold"}>
                      B
                    </Typography>

                    <MenuLinkButton
                      onClick={handleChatNewClick}
                      avatarSrc="/images/avatars/avatar-15.jpg"
                      avatarClassname="small me-2 scale-100!"
                    >
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Benjamin Cruz
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                    <MenuLinkButton
                      onClick={handleChatNewClick}
                      avatarSrc="/images/avatars/avatar-14.jpg"
                      avatarClassname="small me-2 scale-100!"
                    >
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Brooke Delgado
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                    <MenuLinkButton
                      onClick={handleChatNewClick}
                      avatarSrc="/images/avatars/avatar-8.jpg"
                      avatarClassname="small me-2 scale-100!"
                    >
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Bruce Schneider
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                  </Box>

                  {/* C */}
                  <Box className="flex flex-col gap-1">
                    <Typography variant="body2" className={"text-text-disabled-dark px-2.5 leading-6 font-semibold"}>
                      C
                    </Typography>

                    <MenuLinkButton
                      onClick={handleChatNewClick}
                      avatarSrc="/images/avatars/avatar-13.jpg"
                      avatarClassname="small me-2 scale-100!"
                    >
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Clara Nguyen
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                    <MenuLinkButton
                      onClick={handleChatNewClick}
                      avatarSrc="/images/avatars/avatar-7.jpg"
                      avatarClassname="small me-2 scale-100!"
                    >
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Cameron Ortiz
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                    <MenuLinkButton
                      onClick={handleChatNewClick}
                      avatarSrc="/images/avatars/avatar-6.jpg"
                      avatarClassname="small me-2 scale-100!"
                    >
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Chloe Stein
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                    <MenuLinkButton
                      onClick={handleChatNewClick}
                      avatarSrc="/images/avatars/avatar-4.jpg"
                      avatarClassname="small me-2 scale-100!"
                    >
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Cole Harrington
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                    <MenuLinkButton
                      onClick={handleChatNewClick}
                      avatarSrc="/images/avatars/avatar-8.jpg"
                      avatarClassname="small me-2 scale-100!"
                    >
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Connor Vasquez
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                    <MenuLinkButton
                      onClick={handleChatNewClick}
                      avatarSrc="/images/avatars/avatar-11.jpg"
                      avatarClassname="small me-2 scale-100!"
                    >
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Caroline Fischer
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                  </Box>

                  {/* D */}
                  <Box className="flex flex-col gap-1">
                    <Typography variant="body2" className={"text-text-disabled-dark px-2.5 leading-6 font-semibold"}>
                      D
                    </Typography>

                    <MenuLinkButton
                      onClick={handleChatNewClick}
                      avatarSrc="/images/avatars/avatar-6.jpg"
                      avatarClassname="small me-2 scale-100!"
                    >
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Daniel Whitaker
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                    <MenuLinkButton
                      onClick={handleChatNewClick}
                      avatarSrc="/images/avatars/avatar-9.jpg"
                      avatarClassname="small me-2 scale-100!"
                    >
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            David Chen
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                    <MenuLinkButton
                      onClick={handleChatNewClick}
                      avatarSrc="/images/avatars/avatar-13.jpg"
                      avatarClassname="small me-2 scale-100!"
                    >
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Daphne Russo
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                  </Box>

                  {/* E */}
                  <Box className="flex flex-col gap-1">
                    <Typography variant="body2" className={"text-text-disabled-dark px-2.5 leading-6 font-semibold"}>
                      E
                    </Typography>

                    <MenuLinkButton
                      onClick={handleChatNewClick}
                      avatarSrc="/images/avatars/avatar-2.jpg"
                      avatarClassname="small me-2 scale-100!"
                    >
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Eleanor Brooks
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                    <MenuLinkButton
                      onClick={handleChatNewClick}
                      avatarSrc="/images/avatars/avatar-13.jpg"
                      avatarClassname="small me-2 scale-100!"
                    >
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Emilia Novak
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                  </Box>

                  {/* F */}
                  <Box className="flex flex-col gap-1">
                    <Typography variant="body2" className={"text-text-disabled-dark px-2.5 leading-6 font-semibold"}>
                      F
                    </Typography>

                    <MenuLinkButton
                      onClick={handleChatNewClick}
                      avatarSrc="/images/avatars/avatar-14.jpg"
                      avatarClassname="small me-2 scale-100!"
                    >
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Fiona Clarke
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                    <MenuLinkButton
                      onClick={handleChatNewClick}
                      avatarSrc="/images/avatars/avatar-7.jpg"
                      avatarClassname="small me-2 scale-100!"
                    >
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Felix Donovan
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                    <MenuLinkButton
                      onClick={handleChatNewClick}
                      avatarSrc="/images/avatars/avatar-5.jpg"
                      avatarClassname="small me-2 scale-100!"
                    >
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Farah Mitchell
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                  </Box>

                  {/* K */}
                  <Box className="flex flex-col gap-1">
                    <Typography variant="body2" className={"text-text-disabled-dark px-2.5 leading-6 font-semibold"}>
                      K
                    </Typography>

                    <MenuLinkButton
                      onClick={handleChatNewClick}
                      avatarSrc="/images/avatars/avatar-12.jpg"
                      avatarClassname="small me-2 scale-100!"
                    >
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Kai Reynolds
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                    <MenuLinkButton
                      onClick={handleChatNewClick}
                      avatarSrc="/images/avatars/avatar-13.jpg"
                      avatarClassname="small me-2 scale-100!"
                    >
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Kristian O'Neill
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                  </Box>

                  {/* R */}
                  <Box className="flex flex-col gap-1">
                    <Typography variant="body2" className={"text-text-disabled-dark px-2.5 leading-6 font-semibold"}>
                      R
                    </Typography>

                    <MenuLinkButton
                      onClick={handleChatNewClick}
                      avatarSrc="/images/avatars/avatar-6.jpg"
                      avatarClassname="small me-2 scale-100!"
                    >
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Rafael Dominguez
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                    <MenuLinkButton
                      onClick={handleChatNewClick}
                      avatarSrc="/images/avatars/avatar-4.jpg"
                      avatarClassname="small me-2 scale-100!"
                    >
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Reese Caldwell
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                    <MenuLinkButton
                      onClick={handleChatNewClick}
                      avatarSrc="/images/avatars/avatar-3.jpg"
                      avatarClassname="small me-2 scale-100!"
                    >
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Riley Bennett
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                    <MenuLinkButton
                      onClick={handleChatNewClick}
                      avatarSrc="/images/avatars/avatar-10.jpg"
                      avatarClassname="small me-2 scale-100!"
                    >
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Ronan Castillo
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                    <MenuLinkButton
                      onClick={handleChatNewClick}
                      avatarSrc="/images/avatars/avatar-8.jpg"
                      avatarClassname="small me-2 scale-100!"
                    >
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Ruby Harrington
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                  </Box>

                  {/* T */}
                  <Box className="flex flex-col gap-1">
                    <Typography variant="body2" className={"text-text-disabled-dark px-2.5 leading-6 font-semibold"}>
                      T
                    </Typography>

                    <MenuLinkButton
                      onClick={handleChatNewClick}
                      avatarSrc="/images/avatars/avatar-15.jpg"
                      avatarClassname="small me-2 scale-100!"
                    >
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Theo Sullivan
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                    <MenuLinkButton
                      onClick={handleChatNewClick}
                      avatarSrc="/images/avatars/avatar-16.jpg"
                      avatarClassname="small me-2 scale-100!"
                    >
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Talia Brooks
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                  </Box>

                  {/* Z */}
                  <Box className="flex flex-col gap-1">
                    <Typography variant="body2" className={"text-text-disabled-dark px-2.5 leading-6 font-semibold"}>
                      Z
                    </Typography>

                    <MenuLinkButton
                      onClick={handleChatNewClick}
                      avatarSrc="/images/avatars/avatar-4.jpg"
                      avatarClassname="small me-2 scale-100!"
                    >
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Zane Holloway
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                    <MenuLinkButton
                      onClick={handleChatNewClick}
                      avatarSrc="/images/avatars/avatar-14.jpg"
                      avatarClassname="small me-2 scale-100!"
                    >
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Zara Whitman
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                    <MenuLinkButton
                      onClick={handleChatNewClick}
                      avatarSrc="/images/avatars/avatar-2.jpg"
                      avatarClassname="small me-2 scale-100!"
                    >
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Zayd Novak
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                    <MenuLinkButton
                      onClick={handleChatNewClick}
                      avatarSrc="/images/avatars/avatar-8.jpg"
                      avatarClassname="small me-2 scale-100!"
                    >
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Zoe Harrington
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                  </Box>
                </Box>
              </Box>
            </>
          )}
          {activeMenuScene === menuScenes.NEW_GROUP_1 && (
            <>
              <Box className="mb-3.5 flex flex-row items-start justify-between gap-2 px-2.5">
                <Box className="flex gap-2">
                  <Button
                    className="icon-only -mt-1"
                    size="small"
                    color="primary"
                    variant="text"
                    startIcon={<NiChevronLeftSmall size={"small"} />}
                    onClick={handleBackButtonClick}
                  />
                  <Typography variant="h6" className={"text-primary -mt-1 leading-8"}>
                    New Group
                  </Typography>
                </Box>
                <Box className="flex">
                  <Button
                    className="icon-only -mt-1"
                    size="small"
                    color="primary"
                    variant="pastel"
                    startIcon={<NiChevronRightSmall size={"small"} />}
                    onClick={() => {
                      setSelectedMenuScene(menuScenes.NEW_GROUP_2);
                      setActiveMenuScene(menuScenes.NEW_GROUP_2);
                    }}
                  />
                </Box>
              </Box>
              <Box className="flex h-full w-full flex-1 flex-col justify-between gap-8">
                <Box className="flex flex-1 flex-col gap-4">
                  {/* Search */}
                  <Box className="flex flex-col gap-1">
                    <FormControl variant="standard" className="outlined mb-0 px-2.5" size="small">
                      <Input
                        placeholder="Search"
                        size="small"
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton onClick={() => {}}>
                              <NiSearch size="medium" className="text-text-secondary" />
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </Box>

                  {/* Selected Members */}
                  <Box className="flex flex-col gap-1">
                    <Typography variant="body2" className={"text-text-disabled-dark px-2.5 leading-6 font-semibold"}>
                      Selected Members
                    </Typography>

                    <MenuLinkButton
                      avatarSrc="/images/avatars/avatar-9.jpg"
                      avatarClassname="small me-2 scale-100!"
                      className="bg-transparent! outline-0!"
                    >
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Adrian Smith
                          </Typography>
                        </Box>
                        <Button
                          className="icon-only hover:text-primary focus:ring-0! focus:ring-offset-0!"
                          size="small"
                          color="grey"
                          variant="text"
                          startIcon={<NiCross size="small" />}
                        />
                      </Box>
                    </MenuLinkButton>
                    <MenuLinkButton
                      avatarSrc="/images/avatars/avatar-7.jpg"
                      avatarClassname="small me-2 scale-100!"
                      className="bg-transparent! outline-0!"
                    >
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Cameron Ortiz
                          </Typography>
                        </Box>
                        <Button
                          className="icon-only hover:text-primary focus:ring-0! focus:ring-offset-0!"
                          size="small"
                          color="grey"
                          variant="text"
                          startIcon={<NiCross size="small" />}
                        />
                      </Box>
                    </MenuLinkButton>
                    <MenuLinkButton
                      avatarSrc="/images/avatars/avatar-4.jpg"
                      avatarClassname="small me-2 scale-100!"
                      className="bg-transparent! outline-0!"
                    >
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Cole Harrington
                          </Typography>
                        </Box>
                        <Button
                          className="icon-only hover:text-primary focus:ring-0! focus:ring-offset-0!"
                          size="small"
                          color="grey"
                          variant="text"
                          startIcon={<NiCross size="small" />}
                        />
                      </Box>
                    </MenuLinkButton>
                  </Box>

                  {/* A */}
                  <Box className="flex flex-col gap-1">
                    <Typography variant="body2" className={"text-text-disabled-dark px-2.5 leading-6 font-semibold"}>
                      A
                    </Typography>

                    <MenuLinkButton avatarSrc="/images/avatars/avatar-3.jpg" avatarClassname="small me-2 scale-100!">
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Amelia Carter
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                    <MenuLinkButton avatarSrc="/images/avatars/avatar-2.jpg" avatarClassname="small me-2 scale-100!">
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Aaron Johnson
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                    <MenuLinkButton avatarSrc="/images/avatars/avatar-7.jpg" avatarClassname="small me-2 scale-100!">
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Ava Martinez
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                    <MenuLinkButton avatarSrc="/images/avatars/avatar-9.jpg" avatarClassname="small me-2 scale-100!">
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Adrian Smith
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                    <MenuLinkButton avatarSrc="/images/avatars/avatar-12.jpg" avatarClassname="small me-2 scale-100!">
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Alexander Davis
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                    <MenuLinkButton avatarSrc="/images/avatars/avatar-16.jpg" avatarClassname="small me-2 scale-100!">
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Ariana Wilson
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                  </Box>

                  {/* B */}
                  <Box className="flex flex-col gap-1">
                    <Typography variant="body2" className={"text-text-disabled-dark px-2.5 leading-6 font-semibold"}>
                      B
                    </Typography>

                    <MenuLinkButton avatarSrc="/images/avatars/avatar-15.jpg" avatarClassname="small me-2 scale-100!">
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Benjamin Cruz
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                    <MenuLinkButton avatarSrc="/images/avatars/avatar-14.jpg" avatarClassname="small me-2 scale-100!">
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Brooke Delgado
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                    <MenuLinkButton avatarSrc="/images/avatars/avatar-8.jpg" avatarClassname="small me-2 scale-100!">
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Bruce Schneider
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                  </Box>

                  {/* C */}
                  <Box className="flex flex-col gap-1">
                    <Typography variant="body2" className={"text-text-disabled-dark px-2.5 leading-6 font-semibold"}>
                      C
                    </Typography>

                    <MenuLinkButton avatarSrc="/images/avatars/avatar-13.jpg" avatarClassname="small me-2 scale-100!">
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Clara Nguyen
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                    <MenuLinkButton avatarSrc="/images/avatars/avatar-7.jpg" avatarClassname="small me-2 scale-100!">
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Cameron Ortiz
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                    <MenuLinkButton avatarSrc="/images/avatars/avatar-6.jpg" avatarClassname="small me-2 scale-100!">
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Chloe Stein
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                    <MenuLinkButton avatarSrc="/images/avatars/avatar-4.jpg" avatarClassname="small me-2 scale-100!">
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Cole Harrington
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                    <MenuLinkButton avatarSrc="/images/avatars/avatar-8.jpg" avatarClassname="small me-2 scale-100!">
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Connor Vasquez
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                    <MenuLinkButton avatarSrc="/images/avatars/avatar-11.jpg" avatarClassname="small me-2 scale-100!">
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Caroline Fischer
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                  </Box>

                  {/* D */}
                  <Box className="flex flex-col gap-1">
                    <Typography variant="body2" className={"text-text-disabled-dark px-2.5 leading-6 font-semibold"}>
                      D
                    </Typography>

                    <MenuLinkButton avatarSrc="/images/avatars/avatar-6.jpg" avatarClassname="small me-2 scale-100!">
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Daniel Whitaker
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                    <MenuLinkButton avatarSrc="/images/avatars/avatar-9.jpg" avatarClassname="small me-2 scale-100!">
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            David Chen
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                    <MenuLinkButton avatarSrc="/images/avatars/avatar-13.jpg" avatarClassname="small me-2 scale-100!">
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Daphne Russo
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                    <MenuLinkButton avatarSrc="/images/avatars/avatar-13.jpg" avatarClassname="small me-2 scale-100!">
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Daphne Russo
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                  </Box>

                  {/* E */}
                  <Box className="flex flex-col gap-1">
                    <Typography variant="body2" className={"text-text-disabled-dark px-2.5 leading-6 font-semibold"}>
                      E
                    </Typography>

                    <MenuLinkButton avatarSrc="/images/avatars/avatar-2.jpg" avatarClassname="small me-2 scale-100!">
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Eleanor Brooks
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                    <MenuLinkButton avatarSrc="/images/avatars/avatar-13.jpg" avatarClassname="small me-2 scale-100!">
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Emilia Novak
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                  </Box>

                  {/* F */}
                  <Box className="flex flex-col gap-1">
                    <Typography variant="body2" className={"text-text-disabled-dark px-2.5 leading-6 font-semibold"}>
                      F
                    </Typography>

                    <MenuLinkButton avatarSrc="/images/avatars/avatar-14.jpg" avatarClassname="small me-2 scale-100!">
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Fiona Clarke
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                    <MenuLinkButton avatarSrc="/images/avatars/avatar-7.jpg" avatarClassname="small me-2 scale-100!">
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Felix Donovan
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                    <MenuLinkButton avatarSrc="/images/avatars/avatar-5.jpg" avatarClassname="small me-2 scale-100!">
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Farah Mitchell
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                  </Box>

                  {/* K */}
                  <Box className="flex flex-col gap-1">
                    <Typography variant="body2" className={"text-text-disabled-dark px-2.5 leading-6 font-semibold"}>
                      K
                    </Typography>

                    <MenuLinkButton avatarSrc="/images/avatars/avatar-12.jpg" avatarClassname="small me-2 scale-100!">
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Kai Reynolds
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                    <MenuLinkButton avatarSrc="/images/avatars/avatar-13.jpg" avatarClassname="small me-2 scale-100!">
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Kristian O'Neill
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                  </Box>

                  {/* R */}
                  <Box className="flex flex-col gap-1">
                    <Typography variant="body2" className={"text-text-disabled-dark px-2.5 leading-6 font-semibold"}>
                      R
                    </Typography>

                    <MenuLinkButton avatarSrc="/images/avatars/avatar-6.jpg" avatarClassname="small me-2 scale-100!">
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Rafael Dominguez
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                    <MenuLinkButton avatarSrc="/images/avatars/avatar-4.jpg" avatarClassname="small me-2 scale-100!">
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Reese Caldwell
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                    <MenuLinkButton avatarSrc="/images/avatars/avatar-3.jpg" avatarClassname="small me-2 scale-100!">
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Riley Bennett
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                    <MenuLinkButton avatarSrc="/images/avatars/avatar-10.jpg" avatarClassname="small me-2 scale-100!">
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Ronan Castillo
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                    <MenuLinkButton avatarSrc="/images/avatars/avatar-8.jpg" avatarClassname="small me-2 scale-100!">
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Ruby Harrington
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                  </Box>

                  {/* T */}
                  <Box className="flex flex-col gap-1">
                    <Typography variant="body2" className={"text-text-disabled-dark px-2.5 leading-6 font-semibold"}>
                      T
                    </Typography>

                    <MenuLinkButton avatarSrc="/images/avatars/avatar-15.jpg" avatarClassname="small me-2 scale-100!">
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Theo Sullivan
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                    <MenuLinkButton avatarSrc="/images/avatars/avatar-16.jpg" avatarClassname="small me-2 scale-100!">
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Talia Brooks
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                  </Box>

                  {/* Z */}
                  <Box className="flex flex-col gap-1">
                    <Typography variant="body2" className={"text-text-disabled-dark px-2.5 leading-6 font-semibold"}>
                      Z
                    </Typography>

                    <MenuLinkButton avatarSrc="/images/avatars/avatar-4.jpg" avatarClassname="small me-2 scale-100!">
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Zane Holloway
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                    <MenuLinkButton avatarSrc="/images/avatars/avatar-14.jpg" avatarClassname="small me-2 scale-100!">
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Zara Whitman
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                    <MenuLinkButton avatarSrc="/images/avatars/avatar-2.jpg" avatarClassname="small me-2 scale-100!">
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Zayd Novak
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                    <MenuLinkButton avatarSrc="/images/avatars/avatar-8.jpg" avatarClassname="small me-2 scale-100!">
                      <Box className="flex w-full flex-row items-center justify-between">
                        <Box className="flex flex-col">
                          <Typography component="p" className="line-clamp-1 leading-5 font-medium" variant="body1">
                            Zoe Harrington
                          </Typography>
                        </Box>
                      </Box>
                    </MenuLinkButton>
                  </Box>
                </Box>
              </Box>
            </>
          )}
          {activeMenuScene === menuScenes.NEW_GROUP_2 && (
            <>
              <Box className="mb-3.5 flex flex-row items-start justify-between gap-2 px-2.5">
                <Box className="flex gap-2">
                  <Button
                    className="icon-only -mt-1"
                    size="small"
                    color="primary"
                    variant="text"
                    startIcon={<NiChevronLeftSmall size={"small"} />}
                    onClick={handleNewGroupBackClick}
                  />
                  <Typography variant="h6" className={"text-primary -mt-1 leading-8"}>
                    New Group
                  </Typography>
                </Box>

                <Box className="flex">
                  <Button
                    className="icon-only -mt-1"
                    size="small"
                    color="primary"
                    variant="pastel"
                    startIcon={<NiCheck size={"small"} />}
                    onClick={handleChatNewClick}
                  />
                </Box>
              </Box>
              <Box className="flex h-full w-full flex-1 flex-col justify-between gap-8">
                <Box className="flex flex-1 flex-col gap-4">
                  {/* Contact Details */}
                  <Box className="flex flex-col gap-1">
                    <Typography variant="body2" className={"text-text-disabled-dark px-2.5 leading-6 font-semibold"}>
                      Settings
                    </Typography>

                    <Box className="flex flex-col gap-2 px-2.5">
                      <TextField label="Name" variant="filled" className="mb-0" defaultValue="Grand Masters" />
                      <FormControl variant="filled" className="mb-0 w-full">
                        <InputLabel>New Members</InputLabel>
                        <Select
                          defaultValue={"Require Approval"}
                          label="New Members"
                          IconComponent={NiChevronDownSmall}
                          MenuProps={{ className: "outlined" }}
                        >
                          <MenuItem value="Require Approval">Require Approval</MenuItem>
                          <MenuItem value="Accept">Accept</MenuItem>
                          <MenuItem value="Reject">Reject</MenuItem>
                        </Select>
                      </FormControl>
                      <Box>
                        <Button
                          color="grey"
                          variant="pastel"
                          className="flex h-40 w-full flex-col items-center justify-center gap-2"
                        >
                          <NiDocumentImage />
                          <Typography variant="button">Group Image</Typography>
                        </Button>
                      </Box>

                      <Button
                        className="mt-2"
                        size="medium"
                        color="primary"
                        variant="contained"
                        startIcon={<NiCheck size={"medium"} />}
                        onClick={handleChatNewClick}
                      >
                        Add
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </>
          )}
          {activeMenuScene === menuScenes.NEW_CONTACT && (
            <>
              <Box className="mb-3.5 flex flex-row items-start justify-between gap-2 px-2.5">
                <Box className="flex gap-2">
                  <Button
                    className="icon-only -mt-1"
                    size="small"
                    color="primary"
                    variant="text"
                    startIcon={<NiChevronLeftSmall size={"small"} />}
                    onClick={handleBackButtonClick}
                  />
                  <Typography variant="h6" className={"text-primary -mt-1 leading-8"}>
                    New Contact
                  </Typography>
                </Box>

                <Box className="flex">
                  <Button
                    className="icon-only -mt-1"
                    size="small"
                    color="primary"
                    variant="pastel"
                    startIcon={<NiCheck size={"small"} />}
                    onClick={handleChatNewClick}
                  />
                </Box>
              </Box>
              <Box className="flex h-full w-full flex-1 flex-col justify-between gap-8">
                <Box className="flex flex-1 flex-col gap-4">
                  {/* Contact Details */}
                  <Box className="flex flex-col gap-1">
                    <Typography variant="body2" className={"text-text-disabled-dark px-2.5 leading-6 font-semibold"}>
                      Contact Details
                    </Typography>

                    <Box className="flex flex-col gap-2 px-2.5">
                      <TextField label="First Name" variant="filled" className="mb-0" />
                      <TextField label="Last Name" variant="filled" className="mb-0" />
                      <TextField label="Email" variant="filled" className="mb-0" />
                      <TextField label="Phone" variant="filled" className="mb-0" />

                      <Button
                        className="mt-2"
                        size="medium"
                        color="primary"
                        variant="contained"
                        startIcon={<NiCheck size={"medium"} />}
                        onClick={handleChatNewClick}
                      >
                        Add
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </>
          )}
        </Box>
      </ClickAwayListener>
    </>
  );
};
