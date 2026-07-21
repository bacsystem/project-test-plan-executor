import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

import NiBag from "@/icons/nexture/ni-bag";
import NiCells from "@/icons/nexture/ni-cells";
import NiEllipsisHorizontal from "@/icons/nexture/ni-ellipsis-horizontal";
import NiMessages from "@/icons/nexture/ni-messages";
import NiPercent from "@/icons/nexture/ni-percent";
import NiPlus from "@/icons/nexture/ni-plus";
import NiUsers from "@/icons/nexture/ni-users";

export default function LPShortcuts() {
  return (
    <Card className="h-full">
      <Box className="flex flex-1 flex-row items-start justify-between pe-4">
        <Typography variant="h6" component="h6" className="card-title px-4 pt-4">
          Shortcuts
        </Typography>
        <Button
          className="icon-only mt-3"
          size="tiny"
          color="grey"
          variant="text"
          startIcon={<NiPlus size={"small"} />}
        />
      </Box>
      <Box className="mb-1">
        <List>
          <ListItem className="py-0 ps-0 pe-4">
            <ListItemButton classes={{ root: "group items-start" }}>
              <ListItemAvatar>
                <Avatar className="medium bg-primary-light/10 me-3">
                  <NiBag size="medium" className="text-primary" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography component="p" variant="subtitle2" className="leading-4">
                    Add Product
                  </Typography>
                }
                secondary="/home/products/add"
              />
              <Button
                className="icon-only hover:text-text-primary hover:bg-grey-100 mt-1 hidden opacity-0 group-hover:flex group-hover:opacity-100"
                size="tiny"
                color="grey"
                variant="text"
                startIcon={<NiEllipsisHorizontal size={"small"} />}
              />
            </ListItemButton>
          </ListItem>
          <ListItem className="py-0 ps-0 pe-4">
            <ListItemButton classes={{ root: "group items-start" }}>
              <ListItemAvatar>
                <Avatar className="medium bg-secondary-light/10 me-3">
                  <NiCells size="medium" className="text-secondary" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography component="p" variant="subtitle2" className="leading-4">
                    Add Category
                  </Typography>
                }
                secondary="Jan 12, 2024"
                slotProps={{ primary: { className: "leading-4" } }}
              />
              <Button
                className="icon-only hover:text-text-primary hover:bg-grey-100 mt-1 hidden opacity-0 group-hover:flex group-hover:opacity-100"
                size="tiny"
                color="grey"
                variant="text"
                startIcon={<NiEllipsisHorizontal size={"small"} />}
              />
            </ListItemButton>
          </ListItem>
          <ListItem className="py-0 ps-0 pe-4">
            <ListItemButton classes={{ root: "group items-start" }}>
              <ListItemAvatar>
                <Avatar className="medium bg-accent-1-light/10 me-3">
                  <NiPercent size="medium" className="text-accent-1" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography component="p" variant="subtitle2" className="leading-4">
                    Discounts
                  </Typography>
                }
                secondary="/home/sales/discounts"
                slotProps={{ primary: { className: "leading-4" } }}
              />
              <Button
                className="icon-only hover:text-text-primary hover:bg-grey-100 mt-1 hidden opacity-0 group-hover:flex group-hover:opacity-100"
                size="tiny"
                color="grey"
                variant="text"
                startIcon={<NiEllipsisHorizontal size={"small"} />}
              />
            </ListItemButton>
          </ListItem>
          <ListItem className="py-0 ps-0 pe-4">
            <ListItemButton classes={{ root: "group items-start" }}>
              <ListItemAvatar>
                <Avatar className="medium bg-accent-2-light/10 me-3">
                  <NiUsers size="medium" className="text-accent-2" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography component="p" variant="subtitle2" className="leading-4">
                    Teams
                  </Typography>
                }
                secondary="/home/users/teams"
                slotProps={{ primary: { className: "leading-4" } }}
              />
              <Button
                className="icon-only hover:text-text-primary hover:bg-grey-100 mt-1 hidden opacity-0 group-hover:flex group-hover:opacity-100"
                size="tiny"
                color="grey"
                variant="text"
                startIcon={<NiEllipsisHorizontal size={"small"} />}
              />
            </ListItemButton>
          </ListItem>
          <ListItem className="py-0 ps-0 pe-4">
            <ListItemButton classes={{ root: "group items-start" }}>
              <ListItemAvatar>
                <Avatar className="medium bg-accent-3-light/10 me-3">
                  <NiMessages size="medium" className="text-accent-3" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography component="p" variant="subtitle2" className="leading-4">
                    Comments
                  </Typography>
                }
                secondary="/home/products/comments"
                slotProps={{ primary: { className: "leading-4" } }}
              />
              <Button
                className="icon-only hover:text-text-primary hover:bg-grey-100 mt-1 hidden opacity-0 group-hover:flex group-hover:opacity-100"
                size="tiny"
                color="grey"
                variant="text"
                startIcon={<NiEllipsisHorizontal size={"small"} />}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
      <CardActions disableSpacing>
        <Button variant="outlined" size="tiny" color="grey" className="w-full">
          Add Shortcut
        </Button>
      </CardActions>
    </Card>
  );
}
