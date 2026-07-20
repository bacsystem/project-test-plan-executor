"use client";

import UserLanguageSwitch from "./user-language-switch";
import UserModeSwitch from "./user-mode-switch";
import UserThemeSwitch from "./user-theme-switch";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useTranslations } from "use-intl";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  AvatarGroup,
  Box,
  Card,
  CardContent,
  Divider,
  Fade,
  ListItemIcon,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Popper from "@mui/material/Popper";

import NiBuilding from "@/icons/nexture/ni-building";
import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";
import NiDocumentFull from "@/icons/nexture/ni-document-full";
import NiFolder from "@/icons/nexture/ni-folder";
import NiQuestionHexagon from "@/icons/nexture/ni-question-hexagon";
import NiSettings from "@/icons/nexture/ni-settings";
import NiUser from "@/icons/nexture/ni-user";
import NiUsers from "@/icons/nexture/ni-users";
import { cn } from "@/lib/utils";

export default function User() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const t = useTranslations("dashboard");

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    setOpen(false);
  };

  const router = useRouter();

  return (
    <>
      <Box ref={anchorRef}>
        {/* Desktop button */}
        <Button
          variant="surface"
          color="text-primary"
          className={cn(
            "group ms-2 hidden gap-2 rounded-lg py-0! pe-0! hover:py-1! hover:pe-1.5! md:flex",
            open && "active py-1! pe-1.5!",
          )}
          onClick={handleToggle}
        >
          <Box>Julian Carter</Box>
          <Avatar
            alt="avatar"
            src="/images/avatars/avatar-3.jpg"
            className={cn(
              "large transition-all group-hover:ms-0.5 group-hover:h-8 group-hover:w-8",
              open && "ms-0.5 h-8! w-8!",
            )}
          />
        </Button>
        {/* Desktop button */}

        {/* Mobile button */}
        <Button
          variant="surface"
          size="large"
          color="text-primary"
          className={cn(
            "icon-only hover-icon-shrink [&.active]:text-primary group ms-1 me-1 p-0! hover:p-1.5! md:hidden",
            open && "active p-1.5!",
          )}
          onClick={handleToggle}
          startIcon={
            <Avatar
              alt="avatar"
              src="/images/avatars/avatar-3.jpg"
              className={cn("large transition-all group-hover:h-7 group-hover:w-7", open && "h-7! w-7!")}
            />
          }
        />
        {/* Mobile button */}
      </Box>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-end"
        className="mt-3!"
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps}>
            <Box>
              <ClickAwayListener onClickAway={handleClose}>
                <Card className="shadow-darker-sm!">
                  <CardContent>
                    <Box className="max-w-64 sm:w-72 sm:max-w-none">
                      <Box className="mb-4 flex flex-col items-center">
                        <Avatar alt="avatar" src="/images/avatars/avatar-3.jpg" className="large mb-2" />
                        <Typography variant="subtitle2" component="p" className="mb-1">
                          Julian Carter
                        </Typography>
                        <Typography variant="body2" component="p" className="text-text-secondary -mt-2">
                          julian.carter@acorn.dev
                        </Typography>
                      </Box>

                      <Box>
                        <Accordion>
                          <AccordionSummary className="group">
                            <Button
                              component="div"
                              variant="pastel"
                              size="large"
                              color="text-primary"
                              className="full-width-button hover:text-primary group-aria-expanded:text-primary group-aria-expanded:rounded-b-none hover:bg-gray-500/10"
                              startIcon={<NiUsers size={20} />}
                              endIcon={<NiChevronRightSmall size={20} className="accordion-rotate" />}
                            >
                              <Box className="flex w-full flex-row items-center justify-between">
                                <Typography variant="button" component="span">
                                  {t("user-accounts")}
                                </Typography>
                                <AvatarGroup max={3} className="tiny transition-opacity group-aria-expanded:opacity-0">
                                  <Avatar className="tiny" alt="Laura Ellis" src="/images/avatars/avatar-3.jpg" />
                                  <Avatar className="tiny" alt="Travis Howard" src="/images/avatars/avatar-2.jpg" />
                                  <Avatar className="tiny" alt="Cindy Baker" src="/images/avatars/avatar-3.jpg" />
                                  <Avatar className="tiny" alt="Agnes Walker" src="/images/avatars/avatar-4.jpg" />
                                </AvatarGroup>
                              </Box>
                            </Button>
                          </AccordionSummary>
                          <AccordionDetails className="bg-grey-500/10 rounded-b-lg px-4 pt-2 pb-4">
                            <MenuList className="mb-4 p-0">
                              <MenuItem onClick={handleClose}>
                                <ListItemIcon className="me-2">
                                  <Avatar className="tiny" alt="Laura Ellis" src="/images/avatars/avatar-1.jpg" />
                                </ListItemIcon>
                                <Box>
                                  <Typography variant="body1" component="div">
                                    Laura Ellis
                                  </Typography>
                                  <Typography variant="body2" component="div" className="text-text-secondary -mt-1">
                                    laura@nexture.dev
                                  </Typography>
                                </Box>
                              </MenuItem>
                              <MenuItem onClick={handleClose}>
                                <ListItemIcon className="me-2">
                                  <Avatar className="tiny" alt="Travis Howard" src="/images/avatars/avatar-2.jpg" />
                                </ListItemIcon>
                                <Box>
                                  <Typography variant="body1" component="div">
                                    Travis Howard
                                  </Typography>
                                  <Typography variant="body2" component="div" className="text-text-secondary -mt-1">
                                    travis@nexture.dev
                                  </Typography>
                                </Box>
                              </MenuItem>
                              <MenuItem onClick={handleClose}>
                                <ListItemIcon className="me-2">
                                  <Avatar className="tiny" alt="Cindy Baker" src="/images/avatars/avatar-3.jpg" />
                                </ListItemIcon>
                                <Box>
                                  <Typography variant="body1" component="div">
                                    Cindy Baker
                                  </Typography>
                                  <Typography variant="body2" component="div" className="text-text-secondary -mt-1">
                                    cindy@nexture.dev
                                  </Typography>
                                </Box>
                              </MenuItem>
                              <MenuItem onClick={handleClose}>
                                <ListItemIcon className="me-2">
                                  <Avatar className="tiny" alt="Agnes Walker" src="/images/avatars/avatar-4.jpg" />
                                </ListItemIcon>
                                <Box>
                                  <Typography variant="body1" component="div">
                                    Agnes Walker
                                  </Typography>
                                  <Typography variant="body2" component="div" className="text-text-secondary -mt-1">
                                    agnes@nexture.dev
                                  </Typography>
                                </Box>
                              </MenuItem>
                            </MenuList>
                            <Button variant="outlined" size="tiny" color="grey" className="w-full">
                              {t("user-add-account")}
                            </Button>
                          </AccordionDetails>
                        </Accordion>
                      </Box>
                      <Divider className="large" />
                      <MenuList className="p-0">
                        <MenuItem
                          onClick={(event) => {
                            handleClose(event);
                            router.push("/pages/user/overview");
                          }}
                        >
                          <ListItemIcon>
                            <NiUser size={20} />
                          </ListItemIcon>
                          {t("user-overview")}
                        </MenuItem>
                        <MenuItem
                          onClick={(event) => {
                            handleClose(event);
                            router.push("/settings");
                          }}
                        >
                          <ListItemIcon>
                            <NiSettings size={20} />
                          </ListItemIcon>
                          {t("user-profile")}
                        </MenuItem>
                        <MenuItem
                          onClick={(event) => {
                            handleClose(event);
                            router.push("/pages/support/issues");
                          }}
                        >
                          <ListItemIcon>
                            <NiBuilding size={20} />
                          </ListItemIcon>
                          {t("user-issues")}
                        </MenuItem>
                        <MenuItem
                          onClick={(event) => {
                            handleClose(event);
                            router.push("/pages/user/projects");
                          }}
                        >
                          <ListItemIcon>
                            <NiFolder size={20} />
                          </ListItemIcon>
                          {t("user-projects")}
                        </MenuItem>
                        <Divider className="large" />

                        <UserModeSwitch />
                        <UserThemeSwitch />
                        <UserLanguageSwitch />

                        <Divider className="large" />
                        <MenuItem
                          onClick={(event) => {
                            handleClose(event);
                            router.push("/docs");
                          }}
                        >
                          <ListItemIcon>
                            <NiDocumentFull size={20} />
                          </ListItemIcon>
                          {t("user-documentation")}
                        </MenuItem>
                        <MenuItem
                          onClick={(event) => {
                            handleClose(event);
                            router.push("/pages/miscellaneous/knowledge-base");
                          }}
                        >
                          <ListItemIcon>
                            <NiQuestionHexagon size={20} />
                          </ListItemIcon>
                          {t("user-help")}
                        </MenuItem>
                      </MenuList>
                      <Box className="my-8"></Box>
                      <Button
                        component={Link}
                        href="/auth/sign-in"
                        variant="outlined"
                        size="tiny"
                        color="grey"
                        className="w-full"
                      >
                        {t("user-sign-out")}
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </ClickAwayListener>
            </Box>
          </Fade>
        )}
      </Popper>
    </>
  );
}
