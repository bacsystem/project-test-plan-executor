"use client";

import { useRouter } from "next/navigation";

import { Avatar, Box, Button, Card, CardContent, ListItemIcon, MenuItem, MenuList, Typography } from "@mui/material";

import NiController from "@/icons/nexture/ni-controller";
import NiEllipsisHorizontal from "@/icons/nexture/ni-ellipsis-horizontal";
import NiFolder from "@/icons/nexture/ni-folder";
import NiHearts from "@/icons/nexture/ni-hearts";
import NiLock from "@/icons/nexture/ni-lock";
import NiMessages from "@/icons/nexture/ni-messages";
import NiPulse from "@/icons/nexture/ni-pulse";

type UserProfileMenuProps = {
  selected: "overview" | "projects" | "permissions" | "friends" | "social";
};

export default function UserProfileMenu({ selected }: UserProfileMenuProps) {
  const router = useRouter();

  return (
    <Card className="mb-5">
      <CardContent className="flex flex-col items-center gap-5">
        <Box className="flex flex-col items-center">
          <Avatar alt="avatar" src="/images/avatars/avatar-1.jpg" className="mb-2 h-20 w-20 rounded-4xl" />
          <Typography variant="subtitle1" component="p">
            Laura Ellis
          </Typography>
          <Typography variant="body2" component="p" className="text-text-secondary -mt-0.5">
            Executive UI/UX Designer
          </Typography>
        </Box>

        <Box className="flex w-full max-w-sm flex-row gap-1">
          <Button
            size="medium"
            color="primary"
            variant="contained"
            startIcon={<NiMessages size={"medium"} />}
            className="flex-1"
          >
            Contact
          </Button>
          <Button size="medium" color="primary" variant="pastel" className="flex-1">
            Follow
          </Button>
          <Button
            className="icon-only flex-none"
            size="medium"
            color="primary"
            variant="pastel"
            startIcon={<NiEllipsisHorizontal size={"medium"} />}
          />
        </Box>

        <Box className="w-full">
          <MenuList className="p-0">
            <MenuItem selected={selected === "overview" && true} onClick={() => router.push("/pages/user/overview")}>
              <ListItemIcon>
                <NiPulse size={20} />
              </ListItemIcon>
              Overview
            </MenuItem>
            <MenuItem selected={selected === "projects" && true} onClick={() => router.push("/pages/user/projects")}>
              <ListItemIcon>
                <NiFolder size={20} />
              </ListItemIcon>
              Projects
            </MenuItem>
            <MenuItem
              selected={selected === "permissions" && true}
              onClick={() => router.push("/pages/user/permissions")}
            >
              <ListItemIcon>
                <NiLock size={20} />
              </ListItemIcon>
              Permissions
            </MenuItem>
            <MenuItem selected={selected === "friends" && true} onClick={() => router.push("/pages/user/friends")}>
              <ListItemIcon>
                <NiHearts size={20} />
              </ListItemIcon>
              Friends
            </MenuItem>
            <MenuItem selected={selected === "social" && true} onClick={() => router.push("/pages/user/social")}>
              <ListItemIcon>
                <NiController size={20} />
              </ListItemIcon>
              Social
            </MenuItem>
          </MenuList>
        </Box>
      </CardContent>
    </Card>
  );
}
