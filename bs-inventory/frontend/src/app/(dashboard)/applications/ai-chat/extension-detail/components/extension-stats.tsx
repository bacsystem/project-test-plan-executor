"use client";

import Link from "next/link";

import { Box, Card, CardContent, Chip, Typography } from "@mui/material";

import NiLike from "@/icons/nexture/ni-like";
import NiMessageFilled from "@/icons/nexture/ni-message-filled";
import NiUsers from "@/icons/nexture/ni-users";

export default function ExtensionStats() {
  return (
    <Card className="mb-5">
      <CardContent>
        <Typography variant="h6" component="h6" className="card-title">
          Stats
        </Typography>

        <Box className="flex flex-col gap-5">
          <Box className="flex flex-row items-center gap-3">
            <Box className="bg-primary-light/10 flex h-9 w-9 flex-none items-center justify-center rounded-md">
              <NiUsers size={"medium"} className="text-primary" />
            </Box>
            <Box className="flex flex-1 flex-col gap-2">
              <Box className="flex flex-row items-center justify-between">
                <Link href="#" className="link-text-primary link-underline-hover font-semibold">
                  Users
                </Link>
                <Chip label="248K" variant="filled" />
              </Box>
            </Box>
          </Box>

          <Box className="flex flex-row items-center gap-3">
            <Box className="bg-secondary-light/10 flex h-9 w-9 flex-none items-center justify-center rounded-md">
              <NiMessageFilled size={"medium"} className="text-secondary" />
            </Box>
            <Box className="flex flex-1 flex-col gap-2">
              <Box className="flex flex-row items-center justify-between">
                <Link href="#" className="link-text-primary link-underline-hover font-semibold">
                  Conversations
                </Link>
                <Chip label="8M" variant="filled" />
              </Box>
            </Box>
          </Box>

          <Box className="flex flex-row items-center gap-3">
            <Box className="bg-accent-1-light/10 flex h-9 w-9 flex-none items-center justify-center rounded-md">
              <NiLike size={"medium"} className="text-accent-1" />
            </Box>
            <Box className="flex flex-1 flex-col gap-2">
              <Box className="flex flex-row items-center justify-between">
                <Link href="#" className="link-text-primary link-underline-hover font-semibold">
                  Rank
                </Link>
                <Chip label="13" variant="filled" />
              </Box>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
