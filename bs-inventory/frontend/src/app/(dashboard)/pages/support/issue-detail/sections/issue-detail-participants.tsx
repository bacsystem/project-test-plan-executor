import {
  Avatar,
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

export default function IssueDetailParticipants() {
  return (
    <Card className="mb-5">
      <Typography variant="h6" component="h6" className="card-title px-4 pt-4">
        Participants
      </Typography>
      <CardContent className="p-0! pb-2!">
        <List>
          <ListItem className="px-0 py-0">
            <ListItemButton classes={{ root: "group items-center justify-between" }}>
              <Box className="flex flex-row items-center">
                <ListItemAvatar>
                  <Avatar className="medium me-3" alt={"Laura Ellis"} src={"/images/avatars/avatar-1.jpg"}></Avatar>
                </ListItemAvatar>
                <ListItemText
                  className="flex-none"
                  primary={
                    <Typography component="p" variant="body1" className="leading-4">
                      Laura Ellis
                    </Typography>
                  }
                />
              </Box>
            </ListItemButton>
          </ListItem>

          <ListItem className="px-0 py-0">
            <ListItemButton classes={{ root: "group items-center justify-between" }}>
              <Box className="flex flex-row items-center">
                <ListItemAvatar>
                  <Avatar className="medium me-3" alt={"Laura Ellis"} src={"/images/avatars/avatar-2.jpg"}></Avatar>
                </ListItemAvatar>
                <ListItemText
                  className="w-32 flex-none"
                  primary={
                    <Typography component="p" variant="body1" className="leading-4">
                      Daniel Fontaine
                    </Typography>
                  }
                />
              </Box>
            </ListItemButton>
          </ListItem>

          <ListItem className="px-0 py-0">
            <ListItemButton classes={{ root: "group items-center justify-between" }}>
              <Box className="flex flex-row items-center">
                <ListItemAvatar>
                  <Avatar className="medium me-3" alt={"Laura Ellis"} src={"/images/avatars/avatar-3.jpg"}></Avatar>
                </ListItemAvatar>
                <ListItemText
                  className="w-32 flex-none"
                  primary={
                    <Typography component="p" variant="body1" className="leading-4">
                      Sofia Bennett
                    </Typography>
                  }
                />
              </Box>
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
                    <Typography component="p" variant="body1" className="leading-4">
                      Olivia Castillo
                    </Typography>
                  }
                />
              </Box>
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
                    <Typography component="p" variant="body1" className="leading-4">
                      Lucas Wright
                    </Typography>
                  }
                />
              </Box>
            </ListItemButton>
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
}
