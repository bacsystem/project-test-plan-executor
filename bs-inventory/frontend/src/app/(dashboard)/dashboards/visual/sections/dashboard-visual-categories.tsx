import { useRouter } from "next/navigation";

import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import NiDashboard from "@/icons/nexture/ni-dashboard";
import NiDevops from "@/icons/nexture/ni-devops";
import NiScreen from "@/icons/nexture/ni-screen";
import NiServer from "@/icons/nexture/ni-server";
import NiShield from "@/icons/nexture/ni-shield";
import NiShuffle from "@/icons/nexture/ni-shuffle";

export default function DashboardVisualCategories() {
  const router = useRouter();

  const handleCategoryClick = (event: any) => {
    event.preventDefault();
    router.push("/pages/support/issues");
  };

  return (
    <Box>
      <Typography variant="h6" component="h6" className="mt-2 mb-3">
        Categories
      </Typography>
      <Card className="h-full">
        <CardContent>
          <Box className="flex h-100 w-full items-start overflow-auto">
            <List dense className="w-full">
              <ListItem disablePadding>
                <ListItemButton onClick={handleCategoryClick}>
                  <ListItemIcon>
                    <NiDashboard className="text-primary" size="medium" />
                  </ListItemIcon>
                  <ListItemText primary="Performance" />
                  <Chip label="68" variant="filled" className="text-sm" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={handleCategoryClick}>
                  <ListItemText primary="Slow loading times" className="ps-7" />
                  <Chip label="24" variant="filled" className="text-sm" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={handleCategoryClick}>
                  <ListItemText primary="High memory or CPU usage" className="ps-7" />
                  <Chip label="14" variant="filled" className="text-sm" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={handleCategoryClick}>
                  <ListItemText primary="Asset delivery delays" className="ps-7" />
                  <Chip label="14" variant="filled" className="text-sm" />
                </ListItemButton>
              </ListItem>

              <Divider className="border-none" />

              <ListItem disablePadding>
                <ListItemButton onClick={handleCategoryClick}>
                  <ListItemIcon>
                    <NiShield className="text-secondary" size="medium" />
                  </ListItemIcon>
                  <ListItemText primary="Security" />
                  <Chip label="71" variant="filled" className="text-sm" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={handleCategoryClick}>
                  <ListItemText primary="SQL injection" className="ps-7" />
                  <Chip label="13" variant="filled" className="text-sm" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={handleCategoryClick}>
                  <ListItemText primary="Weak password enforcement" className="ps-7" />
                  <Chip label="16" variant="filled" className="text-sm" />
                </ListItemButton>
              </ListItem>

              <Divider className="border-none" />

              <ListItem disablePadding>
                <ListItemButton onClick={handleCategoryClick}>
                  <ListItemIcon>
                    <NiScreen className="text-accent-1" size="medium" />
                  </ListItemIcon>
                  <ListItemText primary="Interface" />
                  <Chip label="24" variant="filled" className="text-sm" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={handleCategoryClick}>
                  <ListItemText primary="Inconsistent design" className="ps-7" />
                  <Chip label="6" variant="filled" className="text-sm" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={handleCategoryClick}>
                  <ListItemText primary="Navigation difficulties" className="ps-7" />
                  <Chip label="8" variant="filled" className="text-sm" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={handleCategoryClick}>
                  <ListItemText primary="Accessibility concerns" className="ps-7" />
                  <Chip label="5" variant="filled" className="text-sm" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={handleCategoryClick}>
                  <ListItemText primary="Confusing error messages" className="ps-7" />
                  <Chip label="4" variant="filled" className="text-sm" />
                </ListItemButton>
              </ListItem>

              <Divider className="border-none" />

              <ListItem disablePadding>
                <ListItemButton onClick={handleCategoryClick}>
                  <ListItemIcon>
                    <NiShuffle className="text-accent-2" size="medium" />
                  </ListItemIcon>
                  <ListItemText primary="Functional" />
                  <Chip label="8" variant="filled" className="text-sm" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={handleCategoryClick}>
                  <ListItemText primary="Broken links" className="ps-7" />
                  <Chip label="5" variant="filled" className="text-sm" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={handleCategoryClick}>
                  <ListItemText primary="Forms not submitting correctly" className="ps-7" />
                  <Chip label="3" variant="filled" className="text-sm" />
                </ListItemButton>
              </ListItem>

              <Divider className="border-none" />

              <ListItem disablePadding>
                <ListItemButton onClick={handleCategoryClick}>
                  <ListItemIcon>
                    <NiDevops className="text-accent-3" size="medium" />
                  </ListItemIcon>
                  <ListItemText primary="Compatibility" />
                  <Chip label="36" variant="filled" className="text-sm" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={handleCategoryClick}>
                  <ListItemText primary="Browser compatibility issues" className="ps-7" />
                  <Chip label="6" variant="filled" className="text-sm" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={handleCategoryClick}>
                  <ListItemText primary="Mobile responsiveness" className="ps-7" />
                  <Chip label="8" variant="filled" className="text-sm" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={handleCategoryClick}>
                  <ListItemText primary="OS-specific bugs" className="ps-7" />
                  <Chip label="9" variant="filled" className="text-sm" />
                </ListItemButton>
              </ListItem>

              <Divider className="border-none" />

              <ListItem disablePadding>
                <ListItemButton onClick={handleCategoryClick}>
                  <ListItemIcon>
                    <NiServer className="text-accent-4" size="medium" />
                  </ListItemIcon>
                  <ListItemText primary="Database" />
                  <Chip label="48" variant="filled" className="text-sm" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={handleCategoryClick}>
                  <ListItemText primary="Database connection failures" className="ps-7" />
                  <Chip label="6" variant="filled" className="text-sm" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={handleCategoryClick}>
                  <ListItemText primary="Data storage bottlenecks" className="ps-7" />
                  <Chip label="8" variant="filled" className="text-sm" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={handleCategoryClick}>
                  <ListItemText primary="Inadequate error handling" className="ps-7" />
                  <Chip label="9" variant="filled" className="text-sm" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={handleCategoryClick}>
                  <ListItemText primary="Failure in data migration" className="ps-7" />
                  <Chip label="4" variant="filled" className="text-sm" />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
