import { Box, Card, CardContent, Chip, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";

export default function DashboardCommerceTopSearchTerms() {
  return (
    <>
      <Typography variant="h6" component="h6" className="mt-2 mb-3">
        Top Search Terms
      </Typography>
      <Card>
        <CardContent>
          <Box className="flex h-76.5 w-full items-start overflow-auto">
            <List dense className="w-full">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary="Wooden toys for toddlers" />
                  <Chip label="24" variant="filled" className="text-sm" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary="Eco-friendly wooden toys" />
                  <Chip label="22" variant="filled" className="text-sm" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary="Handmade wooden toys" />
                  <Chip label="19" variant="filled" className="text-sm" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary="Wooden puzzles for kids" />
                  <Chip label="18" variant="filled" className="text-sm" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary="Games for babies" />
                  <Chip label="18" variant="filled" className="text-sm" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary="Wooden stacking toys" />
                  <Chip label="17" variant="filled" className="text-sm" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary="Classic wooden toys" />
                  <Chip label="14" variant="filled" className="text-sm" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary="Wooden baby toys" />
                  <Chip label="12" variant="filled" className="text-sm" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary="Wooden vs plastic toys" />
                  <Chip label="11" variant="filled" className="text-sm" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary="Toys for brain development" />
                  <Chip label="9" variant="filled" className="text-sm" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary="Fun wooden toys for boys" />
                  <Chip label="6" variant="filled" className="text-sm" />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}
