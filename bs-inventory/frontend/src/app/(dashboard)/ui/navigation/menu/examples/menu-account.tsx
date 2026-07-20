import * as React from "react";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import NiArrowOutRight from "@/icons/nexture/ni-arrow-out-right";
import NiPlusSquare from "@/icons/nexture/ni-plus-square";
import NiSettings from "@/icons/nexture/ni-settings";

export default function MenuAccount() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box className="flex flex-row items-center gap-4 text-center">
        <Typography>Contact</Typography>
        <Typography>Profile</Typography>
        <Tooltip title="Account settings">
          <IconButton onClick={handleClick} size="small">
            <Avatar className="tiny">M</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            className: "p-3",
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar className="tiny me-2" /> <span>Profile</span>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar className="tiny me-2" /> <span>My account</span>
        </MenuItem>
        <Divider component="li" className="my-2!" />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <NiPlusSquare size="medium" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <NiSettings size="medium" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <NiArrowOutRight size="medium" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
