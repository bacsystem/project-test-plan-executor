"use client";

import { WorkspaceData } from "../page";
import Link from "next/link";

import { Avatar, Box, Button, Card, CardContent, Typography } from "@mui/material";

import NiEllipsisHorizontal from "@/icons/nexture/ni-ellipsis-horizontal";
import { cn } from "@/lib/utils";

export default function Workspace(workdspaceData: WorkspaceData) {
  return (
    <Card>
      <CardContent className="flex flex-col">
        <Box className="mb-4 flex flex-row justify-between">
          <Link href={workdspaceData.link} className="transition-all hover:scale-110">
            <Avatar className="large me-3" src={workdspaceData.icon} alt={workdspaceData.name}></Avatar>
          </Link>

          <Box className="flex flex-row items-center gap-4">
            <Typography variant="body2">{workdspaceData.users}</Typography>
            <Button
              className="icon-only"
              variant="outlined"
              color="grey"
              size="small"
              startIcon={<NiEllipsisHorizontal size={"small"} />}
            ></Button>
          </Box>
        </Box>

        <Box className="mb-4">
          <Link href={workdspaceData.link} className="link-text-primary link-underline-hover">
            <Typography variant="subtitle2">{workdspaceData.name}</Typography>
          </Link>

          <Typography variant="body2" className="text-text-secondary mb-3">
            {workdspaceData.ownership}
          </Typography>
          <Typography variant="body1" className="text-text-secondary">
            {workdspaceData.description}
          </Typography>
        </Box>

        <Box className="flex flex-row items-end gap-6">
          {workdspaceData.fileTypes.map((file) => {
            return (
              <Box key={file.id} className="flex flex-row items-center gap-1.5">
                <Box className={cn("h-4 w-4 rounded-lg border-2", file.background, file.border)}></Box>
                <Box className="leading-4">{file.name}</Box>
              </Box>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
}
