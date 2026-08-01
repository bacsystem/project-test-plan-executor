import Link from "next/link";
import { useEffect, useState } from "react";

import { Box, Card, CardContent, Chip, FormControl, MenuItem, Select, Typography } from "@mui/material";

import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";
import { getThemeImage } from "@/lib/image-helper";
import { useThemeContext } from "@/theme/theme-provider";

export default function DashboardBookingPopular() {
  const [location, setLocation] = useState<string>("Europe");
  const { theme, isDarkMode } = useThemeContext();

  const [configImage, setConfigImage] = useState("/images/booking/banner/booking-hero-green.png");
  useEffect(() => {
    const imageUrl = getThemeImage({
      srcSet: {
        "theme-blue": ["booking-hero-blue.png", "booking-hero-blue-dark.png"],
        "theme-green": ["booking-hero-green.png", "booking-hero-green-dark.png"],
        "theme-orange": ["booking-hero-orange.png", "booking-hero-orange-dark.png"],
        "theme-purple": ["booking-hero-purple.png", "booking-hero-purple-dark.png"],
      },
      directory: "/images/booking/banner/",
      current: { theme, isDarkMode },
    });
    setConfigImage(imageUrl);
  }, [theme, isDarkMode]);

  return (
    <Box>
      <Box className="mt-2 mb-3 flex flex-wrap justify-between gap-4">
        <Typography variant="h6" component="h6">
          Popular Destinations
        </Typography>

        <Box className="-mt-1.5 flex gap-1">
          <FormControl size="small" variant="standard" className="outlined mb-0 w-34">
            <Select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              IconComponent={NiChevronDownSmall}
              MenuProps={{ className: "outlined" }}
              slotProps={{
                root: {
                  className: "[&>.MuiInputBase-input]:py-0! rounded-sm!",
                },
              }}
            >
              <MenuItem value="Asia">Asia</MenuItem>
              <MenuItem value="Africa">Africa</MenuItem>
              <MenuItem value="America">America</MenuItem>
              <MenuItem value="Australia">Australia</MenuItem>
              <MenuItem value="Europe">Europe</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Card className="flex h-76.5 p-0">
        <CardContent className="outline-background-paper from-background-paper to-primary-light/10 z-10 flex flex-1 flex-row items-start justify-between rounded-3xl bg-linear-to-r p-7! outline-4 -outline-offset-4 rtl:bg-linear-to-l">
          <Box className="flex w-full flex-col gap-5 md:w-6/10">
            <Box className="flex flex-col gap-2">
              <Box className="flex flex-row items-center justify-between">
                <Link href="#" color="textPrimary" className="hover:text-primary font-semibold transition-colors">
                  France
                </Link>
                <Chip label="72 M" variant="filled" className="bg-primary-light/10 text-primary" />
              </Box>
              <Box className="bg-primary-light/10 h-0.5 w-full">
                <Box className="bg-primary h-0.5" style={{ width: "85%" }}></Box>
              </Box>
            </Box>

            <Box className="flex flex-col gap-2">
              <Box className="flex flex-row items-center justify-between">
                <Link href="#" color="textPrimary" className="hover:text-primary font-semibold transition-colors">
                  Spain
                </Link>
                <Chip label="70 M" variant="filled" className="bg-primary-light/10 text-primary" />
              </Box>
              <Box className="bg-primary-light/10 h-0.5 w-full">
                <Box className="bg-primary h-0.5" style={{ width: "75%" }}></Box>
              </Box>
            </Box>

            <Box className="flex flex-col gap-2">
              <Box className="flex flex-row items-center justify-between">
                <Link href="#" color="textPrimary" className="hover:text-primary font-semibold transition-colors">
                  Greece
                </Link>
                <Chip label="27 M" variant="filled" className="bg-primary-light/10 text-primary" />
              </Box>
              <Box className="bg-primary-light/10 h-0.5 w-full">
                <Box className="bg-primary h-0.5" style={{ width: "45%" }}></Box>
              </Box>
            </Box>

            <Box className="flex flex-col gap-2">
              <Box className="flex flex-row items-center justify-between">
                <Link href="#" color="textPrimary" className="hover:text-primary font-semibold transition-colors">
                  Italy
                </Link>
                <Chip label="25 M" variant="filled" className="bg-primary-light/10 text-primary" />
              </Box>
              <Box className="bg-primary-light/10 h-0.5 w-full">
                <Box className="bg-primary h-0.5" style={{ width: "40%" }}></Box>
              </Box>
            </Box>

            <Box className="flex flex-col gap-2">
              <Box className="flex flex-row items-center justify-between">
                <Link href="#" color="textPrimary" className="hover:text-primary font-semibold transition-colors">
                  Germany
                </Link>
                <Chip label="19 M" variant="filled" className="bg-primary-light/10 text-primary" />
              </Box>
              <Box className="bg-primary-light/10 h-0.5 w-full">
                <Box className="bg-primary h-0.5" style={{ width: "30%" }}></Box>
              </Box>
            </Box>
          </Box>

          <Box className="flex w-0 justify-center md:w-4/10 md:justify-end">
            <img
              alt="configure theme"
              sizes="100vw"
              className="hidden h-64 w-full max-w-xs object-contain md:block"
              src={configImage}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
