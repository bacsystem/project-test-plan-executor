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

import NiLinkBroken from "@/icons/nexture/ni-link-broken";
import NiScreen from "@/icons/nexture/ni-screen";
import NiSearch from "@/icons/nexture/ni-search";

export default function LPSources() {
  return (
    <Card className="h-full">
      <Typography variant="h6" component="h6" className="card-title px-4 pt-4">
        Traffic Sources
      </Typography>
      <CardContent className="p-0! pb-2!">
        <List className="h-61 items-start overflow-auto">
          <ListItem className="px-0 py-0">
            <ListItemButton classes={{ root: "group items-center justify-between" }}>
              <Box className="flex flex-row items-center">
                <ListItemAvatar>
                  <Avatar className="medium bg-primary-light/10 me-3">
                    <NiSearch className="text-primary" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  className="w-40 flex-none"
                  primary={
                    <Typography component="p" variant="subtitle2" className="leading-4">
                      1. Organic Search
                    </Typography>
                  }
                />
              </Box>

              <Typography component="p">4,482</Typography>
            </ListItemButton>
          </ListItem>

          <ListItem className="px-0 py-0">
            <ListItemButton classes={{ root: "group items-center justify-between" }}>
              <Box className="flex flex-row items-center">
                <ListItemAvatar>
                  <Avatar className="medium bg-secondary-light/10 me-3">
                    <NiScreen className="text-secondary" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  className="w-40 flex-none"
                  primary={
                    <Typography component="p" variant="subtitle2" className="leading-4">
                      2. Direct
                    </Typography>
                  }
                />
              </Box>

              <Typography component="p">3,672</Typography>
            </ListItemButton>
          </ListItem>

          <ListItem className="px-0 py-0">
            <ListItemButton classes={{ root: "group items-center justify-between" }}>
              <Box className="flex flex-row items-center">
                <ListItemAvatar>
                  <Avatar className="medium bg-accent-1-light/10 me-3">
                    <NiLinkBroken className="text-accent-1" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  className="w-40 flex-none"
                  primary={
                    <Typography component="p" variant="subtitle2" className="leading-4">
                      3. Refferral
                    </Typography>
                  }
                />
              </Box>

              <Typography component="p">1,884</Typography>
            </ListItemButton>
          </ListItem>

          <ListItem className="px-0 py-0">
            <ListItemButton classes={{ root: "group items-center justify-between" }}>
              <Box className="flex flex-row items-center">
                <ListItemAvatar>
                  <Avatar className="medium bg-accent-2-light/10 me-3">
                    <NiLinkBroken className="text-accent-2" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  className="w-40 flex-none"
                  primary={
                    <Typography component="p" variant="subtitle2" className="leading-4">
                      4. Social Media
                    </Typography>
                  }
                />
              </Box>

              <Typography component="p">1,240</Typography>
            </ListItemButton>
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
}
