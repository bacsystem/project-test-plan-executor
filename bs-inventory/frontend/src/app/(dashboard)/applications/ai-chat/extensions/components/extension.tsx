"use client";

import { ExtensionData } from "../page";
import Link from "next/link";

import { Avatar, Box, Button, Card, CardContent, Typography } from "@mui/material";

import NiLike from "@/icons/nexture/ni-like";
import NiUnlike from "@/icons/nexture/ni-unlike";
import { cn } from "@/lib/utils";

export default function Extension(extensionData: ExtensionData) {
  return (
    <Card>
      <CardContent className="flex flex-col">
        <Box className="mb-4 flex flex-row justify-between">
          <Link href={extensionData.link} className="transition-all hover:scale-110">
            <Avatar className="large me-3" src={extensionData.icon} alt={extensionData.name}></Avatar>
          </Link>

          <Box className="flex flex-row items-center gap-4">
            <Typography variant="body2">{extensionData.users}</Typography>
            {extensionData.isInstalled ? (
              <Button variant="pastel" color="grey" size="tiny">
                Installed
              </Button>
            ) : (
              <Button variant="outlined" color="grey" size="tiny">
                Install
              </Button>
            )}
          </Box>
        </Box>

        <Box className="mb-4">
          <Link href={extensionData.link} className="link-text-primary link-underline-hover">
            <Typography variant="subtitle2">{extensionData.name}</Typography>
          </Link>

          <Typography variant="body2" className="text-text-secondary mb-3">
            {extensionData.category}
          </Typography>
          <Typography variant="body1" className="text-text-secondary line-clamp-3">
            {extensionData.description}
          </Typography>
        </Box>

        <Box className="flex flex-row items-end gap-1">
          <Button
            size="tiny"
            color="grey"
            variant="pastel"
            startIcon={<NiLike size={"small"} />}
            className={cn(
              "[.active]:text-primary [.active]:bg-grey-25 hover:text-primary [.active:hover]:text-text-primary min-w-0 md:min-w-16",
              extensionData.isLiked && "active",
            )}
          >
            {extensionData.likes}
          </Button>
          <Button
            size="tiny"
            color="grey"
            variant="pastel"
            startIcon={<NiUnlike size={"small"} />}
            className={cn(
              "[.active]:text-secondary [.active]:bg-grey-25 hover:text-secondary [.active:hover]:text-text-primary min-w-0 md:min-w-16",
              extensionData.isUnliked && "active",
            )}
          >
            {extensionData.unlikes}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
