import Link from "next/link";

import { Avatar, Box, Button, Card, CardContent, ListItemAvatar, ListItemText, Typography } from "@mui/material";

import NiEllipsisHorizontal from "@/icons/nexture/ni-ellipsis-horizontal";
import NiEyeOpen from "@/icons/nexture/ni-eye-open";
import NiLike from "@/icons/nexture/ni-like";
import NiRocket from "@/icons/nexture/ni-rocket";

export default function IssueDetailContentComments() {
  return (
    <>
      <Card className="mb-5">
        <CardContent>
          <Box className="mb-5 flex flex-row items-start justify-between">
            <Box className="flex flex-row items-center">
              <ListItemAvatar>
                <Avatar className="medium me-3" alt={"Ethan Cooper"} src={"/images/avatars/avatar-2.jpg"}></Avatar>
              </ListItemAvatar>
              <Box className="flex flex-col">
                <ListItemText
                  className="flex-none"
                  primary={
                    <Typography component="p" variant="body1" className="leading-4">
                      Ethan Cooper
                    </Typography>
                  }
                />
                <Typography variant="body2" className="text-text-secondary -mt-1">
                  3 hours ago
                </Typography>
              </Box>
            </Box>
            <Button
              className="icon-only"
              size="small"
              color="grey"
              variant="text"
              startIcon={<NiEllipsisHorizontal size={"small"} />}
            />
          </Box>
          <Box className="mb-6">
            <Typography variant="body1" component="p">
              Organize your web application with a clear and logical project structure. Keep essential files like HTML,
              CSS, and JavaScript separate, and use folders for assets such as images and fonts. A well-structured setup
              ensures maintainability and scalability as your application grows. Organize your files for a simple web
              application
            </Typography>
          </Box>

          <Box className="flex flex-row items-end gap-1">
            <Button
              size="tiny"
              color="grey"
              variant="pastel"
              startIcon={<NiLike size={"small"} />}
              className="active [.active]:text-primary [.active]:bg-grey-25 hover:text-primary [.active:hover]:text-text-primary min-w-0 md:min-w-16"
            >
              3
            </Button>
            <Button
              size="tiny"
              color="grey"
              variant="pastel"
              startIcon={<NiEyeOpen size={"small"} />}
              className="active [.active]:text-secondary [.active]:bg-grey-25 hover:text-secondary [.active:hover]:text-text-primary min-w-0 md:min-w-16"
            >
              2
            </Button>
            <Button
              size="tiny"
              color="grey"
              variant="pastel"
              startIcon={<NiRocket size={"small"} />}
              className="[.active]:text-accent-1 [.active]:bg-grey-25 hover:text-accent-1 [.active:hover]:text-text-primary min-w-0 md:min-w-16"
            >
              0
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Card className="mb-5">
        <CardContent>
          <Box className="mb-5 flex flex-row items-start justify-between">
            <Box className="flex flex-row items-center">
              <ListItemAvatar>
                <Avatar className="medium me-3" alt={"Olivia Castillo"} src={"/images/avatars/avatar-3.jpg"}></Avatar>
              </ListItemAvatar>
              <Box className="flex flex-col">
                <ListItemText
                  className="flex-none"
                  primary={
                    <Typography component="p" variant="body1" className="leading-4">
                      Olivia Castillo
                    </Typography>
                  }
                />
                <Typography variant="body2" className="text-text-secondary -mt-1">
                  20 minutes ago
                </Typography>
              </Box>
            </Box>
            <Button
              className="icon-only"
              size="small"
              color="grey"
              variant="text"
              startIcon={<NiEllipsisHorizontal size={"small"} />}
            />
          </Box>
          <Box className="mb-6">
            <Typography variant="body1" component="p">
              Same here:
            </Typography>
            <Link href="#">https://acorn.dev/products</Link>
          </Box>

          <Box className="flex flex-row items-end gap-1">
            <Button
              size="tiny"
              color="grey"
              variant="pastel"
              startIcon={<NiLike size={"small"} />}
              className="active [.active]:text-primary [.active]:bg-grey-25 hover:text-primary [.active:hover]:text-text-primary min-w-0 md:min-w-16"
            >
              1
            </Button>
            <Button
              size="tiny"
              color="grey"
              variant="pastel"
              startIcon={<NiEyeOpen size={"small"} />}
              className="[.active]:text-secondary [.active]:bg-grey-25 hover:text-secondary [.active:hover]:text-text-primary min-w-0 md:min-w-16"
            >
              0
            </Button>
            <Button
              size="tiny"
              color="grey"
              variant="pastel"
              startIcon={<NiRocket size={"small"} />}
              className="[.active]:text-accent-1 [.active]:bg-grey-25 hover:text-accent-1 [.active:hover]:text-text-primary min-w-0 md:min-w-16"
            >
              0
            </Button>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}
