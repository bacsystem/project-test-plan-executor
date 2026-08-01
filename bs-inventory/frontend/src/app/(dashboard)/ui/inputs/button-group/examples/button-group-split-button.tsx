import React from "react";

import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Fade,
  Grid,
  Menu,
  MenuItem,
  PopoverVirtualElement,
  Typography,
} from "@mui/material";

import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";
import { cn } from "@/lib/utils";

export default function ButtonGroupSplitButton() {
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const options = ["Create a merge commit", "Squash and merge", "Rebase and merge"];

  const handleClickMainClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, index: number) => {
    setSelectedIndex(index);
    handleClose();
  };

  const [anchorEl, setAnchorEl] = React.useState<EventTarget | Element | PopoverVirtualElement | null>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: Event | React.SyntheticEvent) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Split Button
          </Typography>
          <Box className="row mb-4 flex flex-wrap items-start gap-2">
            <ButtonGroup size="large" variant="contained" aria-label="Button group with a nested menu">
              <Button onClick={handleClickMainClick}>{options[selectedIndex]}</Button>
              <Button
                className="icon-only"
                aria-controls={open ? "split-button-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-label="select merge strategy"
                aria-haspopup="menu"
                onClick={handleClick}
              >
                <NiChevronRightSmall
                  size={"large"}
                  className={cn("transition-transform rtl:rotate-180", open && "rotate-90 rtl:rotate-90")}
                />
              </Button>
            </ButtonGroup>

            <ButtonGroup size="medium" variant="contained" aria-label="Button group with a nested menu">
              <Button onClick={handleClickMainClick}>{options[selectedIndex]}</Button>
              <Button
                className="icon-only"
                aria-controls={open ? "split-button-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-label="select merge strategy"
                aria-haspopup="menu"
                onClick={handleClick}
              >
                <NiChevronRightSmall
                  size={"medium"}
                  className={cn("transition-transform rtl:rotate-180", open && "rotate-90 rtl:rotate-90")}
                />
              </Button>
            </ButtonGroup>

            <ButtonGroup size="small" variant="contained" aria-label="Button group with a nested menu">
              <Button onClick={handleClickMainClick}>{options[selectedIndex]}</Button>
              <Button
                className="icon-only"
                aria-controls={open ? "split-button-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-label="select merge strategy"
                aria-haspopup="menu"
                onClick={handleClick}
              >
                <NiChevronRightSmall
                  size={"small"}
                  className={cn("transition-transform rtl:rotate-180", open && "rotate-90 rtl:rotate-90")}
                />
              </Button>
            </ButtonGroup>

            <ButtonGroup size="tiny" variant="contained" aria-label="Button group with a nested menu">
              <Button onClick={handleClickMainClick}>{options[selectedIndex]}</Button>
              <Button
                className="icon-only"
                aria-controls={open ? "split-button-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-label="select merge strategy"
                aria-haspopup="menu"
                onClick={handleClick}
              >
                <NiChevronRightSmall
                  size={"small"}
                  className={cn("transition-transform rtl:rotate-180", open && "rotate-90 rtl:rotate-90")}
                />
              </Button>
            </ButtonGroup>

            <Menu
              anchorEl={anchorEl as Element}
              open={open}
              onClose={handleClose}
              className="mt-1"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              slots={{
                transition: Fade,
              }}
            >
              {options.map((option, index) => (
                <MenuItem
                  key={option}
                  disabled={index === 2}
                  selected={index === selectedIndex}
                  onClick={(event) => handleMenuItemClick(event, index)}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
