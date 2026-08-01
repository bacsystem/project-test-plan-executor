import React, { useState } from "react";

import {
  Box,
  Button,
  Card,
  Chip,
  ClickAwayListener,
  Fade,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Popper,
  Tooltip,
  Typography,
} from "@mui/material";

import NiChevronUpDownSmall from "@/icons/nexture/ni-chevron-up-down-small";
import NextureIcons, { IconName } from "@/icons/nexture-icons";
import { cn } from "@/lib/utils";

export default function AccountSwitch() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  const [tooltipShow, setTooltipShow] = React.useState(false);

  const [accountID, setAccountID] = useState(2);
  const accounts = [
    {
      id: 0,
      label: "Sandbox",
      color: "text-primary",
      bg: "bg-primary-light/10",
      icon: "NiController",
      tier: "Basic",
    },
    {
      id: 1,
      label: "Vite",
      color: "text-secondary",
      bg: "bg-secondary-light/10",
      icon: "NiDocumentCode",
      tier: "Team",
    },
    {
      id: 2,
      label: "Next",
      color: "text-accent-1",
      bg: "bg-accent-1-light/10",
      icon: "NiBriefcase",
      tier: "Team",
    },
  ];

  const getActiveAccountByID = (accountID: number) => {
    return accounts.find((account) => account.id === accountID);
  };

  const getIcon = (mobile: boolean) => {
    return (
      <NextureIcons
        size={24}
        icon={getActiveAccountByID(accountID)?.icon as IconName}
        className={cn(
          !mobile && getActiveAccountByID(accountID)?.color,
          "transition-all group-hover:scale-[0.85]",
          open && "scale-[0.85]",
        )}
      />
    );
  };

  return (
    <>
      <Box ref={anchorRef}>
        {/* Desktop button */}
        <Button
          onClick={handleToggle}
          variant="surface"
          size="large"
          color="text-primary"
          className={cn(
            "group hover:bg-foreground hidden p-0 pe-4 md:flex",
            open && "bg-foreground shadow-darker-sm! backdrop-blur-sm",
          )}
          startIcon={
            <Box
              className={cn(
                "ms-1 flex items-center justify-center rounded-lg p-2 transition-all group-hover:bg-transparent",
                getActiveAccountByID(accountID)?.bg,
                open && "bg-transparent",
              )}
            >
              {getIcon(false)}
            </Box>
          }
          endIcon={<NiChevronUpDownSmall size={20} />}
        >
          <Box className="flex w-full flex-row items-center gap-2">
            <Typography variant="button" component="span">
              {getActiveAccountByID(accountID)?.label}
            </Typography>
            <Chip size="small" variant="outlined" label={getActiveAccountByID(accountID)?.tier} />
          </Box>
        </Button>
        {/* Desktop button */}

        {/* Mobile button */}
        <Tooltip className="md:hidden" title="Accounts" placement="bottom" arrow open={!open && tooltipShow}>
          <Button
            variant="surface"
            size="large"
            color="text-primary"
            className={cn("icon-only hover-icon-shrink [&.active]:text-primary sm:me-1", open && "active")}
            onClick={handleToggle}
            onMouseEnter={() => setTooltipShow(true)}
            onMouseLeave={() => setTooltipShow(false)}
            startIcon={getIcon(true)}
          />
        </Tooltip>
      </Box>
      {/* Mobile button */}

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        className="mt-3!"
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps}>
            <Box>
              <ClickAwayListener onClickAway={handleClose}>
                <Card className="shadow-darker-sm! w-72">
                  <List>
                    {accounts.map((account) => {
                      return (
                        <ListItem key={account.id} className={cn("p-0", account.id === accountID && "active")}>
                          <ListItemButton
                            onClick={() => {
                              setAccountID(account.id);
                              setOpen(false);
                            }}
                            classes={{ root: "group items-start" }}
                          >
                            <ListItemIcon>
                              <NextureIcons size={20} icon={account.icon as IconName} className={account.color} />
                            </ListItemIcon>
                            {account.label}
                            <Chip size="small" variant="outlined" label={account.tier} className="ms-auto" />
                          </ListItemButton>
                        </ListItem>
                      );
                    })}
                  </List>
                </Card>
              </ClickAwayListener>
            </Box>
          </Fade>
        )}
      </Popper>
    </>
  );
}
