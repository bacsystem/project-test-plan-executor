"use client";

import Link from "next/link";

import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import NiDocumentFull from "@/icons/nexture/ni-document-full";
import NiFolder from "@/icons/nexture/ni-folder";

export default function Favorites() {
  return (
    <>
      <Typography variant="h6" component="h6" className="mt-2 mb-3 lg:mt-0">
        Favorites
      </Typography>
      <Card>
        <CardContent>
          <List className="-mx-2 -my-2">
            <ListItem disablePadding>
              <ListItemButton href="/applications/drive/folder" component={Link}>
                <ListItemIcon>
                  <NiFolder size="large" className="text-rating" />
                </ListItemIcon>
                <ListItemText primary="Documents" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton href="/applications/drive/folder" component={Link}>
                <ListItemIcon>
                  <NiFolder size="large" className="text-rating" />
                </ListItemIcon>
                <ListItemText primary="Reports" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton href="/applications/drive/folder" component={Link}>
                <ListItemIcon>
                  <NiFolder size="large" className="text-rating" />
                </ListItemIcon>
                <ListItemText primary="Permissions" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton href="/applications/drive/folder" component={Link}>
                <ListItemIcon>
                  <NiFolder size="large" className="text-rating" />
                </ListItemIcon>
                <ListItemText primary="Tutorials" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton href="/applications/drive/folder" component={Link}>
                <ListItemIcon>
                  <NiDocumentFull size="large" className="text-secondary" />
                </ListItemIcon>
                <ListItemText primary="Brand_Voice_Guidelines.pdf" />
              </ListItemButton>
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </>
  );
}
