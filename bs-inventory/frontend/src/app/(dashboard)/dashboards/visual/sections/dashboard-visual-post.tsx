import { SyntheticEvent, useState } from "react";

import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Fade,
  FormControl,
  FormLabel,
  Input,
  Menu,
  MenuItem,
  PopoverVirtualElement,
  TextareaAutosize,
  Typography,
} from "@mui/material";

import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";
import { cn } from "@/lib/utils";

export default function DashboardVisualPost() {
  const [anchorEl, setAnchorEl] = useState<EventTarget | Element | PopoverVirtualElement | null>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: Event | SyntheticEvent) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Typography variant="h6" component="h6" className="mt-2 mb-3 lg:mt-0">
        Quick Post
      </Typography>
      <Card className="h-83">
        <CardContent>
          <FormControl className="outlined" variant="standard" size="small" fullWidth>
            <FormLabel component="label">Title</FormLabel>
            <Input placeholder="" />
          </FormControl>

          <FormControl className="MuiTextField-root outlined" fullWidth>
            <FormLabel component="label">Content</FormLabel>
            <TextareaAutosize
              minRows={3}
              maxRows={3}
              className="MuiInputBase-root MuiInput-root MuiInputBase-formControl outlined autosize w-full"
              placeholder="Empty"
            />
          </FormControl>

          <ButtonGroup size="medium" variant="pastel">
            <Button>Publish</Button>
            <Button className="icon-only" onClick={handleClick}>
              <NiChevronRightSmall
                size={"medium"}
                className={cn("-ms-1 transition-transform rtl:rotate-180", open && "rotate-90 rtl:rotate-90")}
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
            <MenuItem>Save</MenuItem>
            <MenuItem>Draft</MenuItem>
          </Menu>
        </CardContent>
      </Card>
    </Box>
  );
}
