import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

import NiTriangleDown from "@/icons/nexture/ni-triangle-down";
import NiTriangleUp from "@/icons/nexture/ni-triangle-up";

export default function SupportOverviewTopOpeners() {
  return (
    <Card>
      <Typography variant="h6" component="h6" className="card-title px-4 pt-4">
        Top Issue Closers
      </Typography>
      <CardContent className="p-0! pb-2!">
        <List>
          <ListItem className="px-0 py-0">
            <ListItemButton classes={{ root: "group items-center justify-between" }}>
              <Box className="flex flex-row items-center">
                <ListItemAvatar>
                  <Avatar className="medium me-3" alt={"Laura Ellis"} src={"/images/avatars/avatar-8.jpg"}></Avatar>
                </ListItemAvatar>
                <ListItemText
                  className="w-32 flex-none"
                  primary={
                    <Typography component="p" variant="subtitle2" className="leading-4">
                      1. Sofia Bennett
                    </Typography>
                  }
                />
              </Box>
              <Button
                className="pointer-events-none self-center"
                size="tiny"
                color="success"
                variant="pastel"
                startIcon={<NiTriangleUp size={"tiny"} />}
              >
                4.8%
              </Button>
              <Typography component="p">38</Typography>
            </ListItemButton>
          </ListItem>

          <ListItem className="px-0 py-0">
            <ListItemButton classes={{ root: "group items-center justify-between" }}>
              <Box className="flex flex-row items-center">
                <ListItemAvatar>
                  <Avatar className="medium me-3" alt={"Laura Ellis"} src={"/images/avatars/avatar-7.jpg"}></Avatar>
                </ListItemAvatar>
                <ListItemText
                  className="w-32 flex-none"
                  primary={
                    <Typography component="p" variant="subtitle2" className="leading-4">
                      2. Olivia Castillo
                    </Typography>
                  }
                />
              </Box>
              <Button
                className="pointer-events-none self-center"
                size="tiny"
                color="error"
                variant="pastel"
                startIcon={<NiTriangleDown size={"tiny"} />}
              >
                2.8%
              </Button>
              <Typography component="p">32</Typography>
            </ListItemButton>
          </ListItem>

          <ListItem className="px-0 py-0">
            <ListItemButton classes={{ root: "group items-center justify-between" }}>
              <Box className="flex flex-row items-center">
                <ListItemAvatar>
                  <Avatar className="medium me-3" alt={"Laura Ellis"} src={"/images/avatars/avatar-6.jpg"}></Avatar>
                </ListItemAvatar>
                <ListItemText
                  className="w-32 flex-none"
                  primary={
                    <Typography component="p" variant="subtitle2" className="leading-4">
                      3. Daniel Fontaine
                    </Typography>
                  }
                />
              </Box>
              <Button
                className="pointer-events-none self-center"
                size="tiny"
                color="error"
                variant="pastel"
                startIcon={<NiTriangleDown size={"tiny"} />}
              >
                3.7%
              </Button>
              <Typography component="p">28</Typography>
            </ListItemButton>
          </ListItem>

          <ListItem className="px-0 py-0">
            <ListItemButton classes={{ root: "group items-center justify-between" }}>
              <Box className="flex flex-row items-center">
                <ListItemAvatar>
                  <Avatar className="medium me-3" alt={"Laura Ellis"} src={"/images/avatars/avatar-5.jpg"}></Avatar>
                </ListItemAvatar>
                <ListItemText
                  className="w-32 flex-none"
                  primary={
                    <Typography component="p" variant="subtitle2" className="leading-4">
                      4. Laura Ellis
                    </Typography>
                  }
                />
              </Box>
              <Button
                className="pointer-events-none self-center"
                size="tiny"
                color="error"
                variant="pastel"
                startIcon={<NiTriangleDown size={"tiny"} />}
              >
                3.6%
              </Button>
              <Typography component="p">22</Typography>
            </ListItemButton>
          </ListItem>

          <ListItem className="px-0 py-0">
            <ListItemButton classes={{ root: "group items-center justify-between" }}>
              <Box className="flex flex-row items-center">
                <ListItemAvatar>
                  <Avatar className="medium me-3" alt={"Laura Ellis"} src={"/images/avatars/avatar-4.jpg"}></Avatar>
                </ListItemAvatar>
                <ListItemText
                  className="w-32 flex-none"
                  primary={
                    <Typography component="p" variant="subtitle2" className="leading-4">
                      5. Lucas Wright
                    </Typography>
                  }
                />
              </Box>
              <Button
                className="pointer-events-none self-center"
                size="tiny"
                color="error"
                variant="pastel"
                startIcon={<NiTriangleDown size={"tiny"} />}
              >
                5.2%
              </Button>
              <Typography component="p">18</Typography>
            </ListItemButton>
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
}
