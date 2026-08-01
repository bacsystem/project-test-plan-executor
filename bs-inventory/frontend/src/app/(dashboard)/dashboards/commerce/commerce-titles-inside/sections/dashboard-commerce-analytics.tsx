import { useMemo } from "react";

import { Box, Button, Card, CardContent, Typography } from "@mui/material";

import NiChartPolar from "@/icons/nexture/ni-chart-polar";
import { getThemeImage } from "@/lib/image-helper";
import { useThemeContext } from "@/theme/theme-provider";

export default function DashboardCommerceAnalytics() {
  const { theme, isDarkMode } = useThemeContext();
  const imageContent = useMemo(() => {
    return getThemeImage({
      srcSet: {
        "theme-blue": ["blue-light-clipboard.png", "blue-dark-clipboard.png"],
        "theme-green": ["green-light-clipboard.png", "green-dark-clipboard.png"],
        "theme-orange": ["orange-light-clipboard.png", "orange-dark-clipboard.png"],
        "theme-purple": ["purple-light-clipboard.png", "purple-dark-clipboard.png"],
      },
      directory: "/images/three-d-icons/",
      current: { theme, isDarkMode },
    });
  }, [theme, isDarkMode]);
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="h6" className="card-title">
          Analytics
        </Typography>

        <Box className="flex h-76.5 w-full flex-col items-center justify-between">
          <Box className="flex flex-col items-center">
            {imageContent && <img alt="analytics" className="mb-4 w-full max-w-52" src={imageContent} />}
            <Typography component="p" className="text-center">
              Configure analytics to get extended results!
            </Typography>
          </Box>
          <Button size="medium" color="primary" variant="outlined" startIcon={<NiChartPolar size={"medium"} />}>
            Get Analytics
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
