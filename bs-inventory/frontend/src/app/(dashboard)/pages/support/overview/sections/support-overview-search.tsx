import {
  Card,
  CardContent,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";

import NiSearch from "@/icons/nexture/ni-search";
import { cn } from "@/lib/utils";
import { useThemeContext } from "@/theme/theme-provider";

export default function SupportOverviewSearch() {
  const { isDarkMode } = useThemeContext();

  return (
    <Card
      className={cn(
        isDarkMode
          ? "bg-[url(/images/misc/search-background-dark.svg)]"
          : "bg-[url(/images/misc/search-background-light.svg)]",
        "flex min-h-72 items-center justify-center bg-cover bg-center bg-no-repeat p-0",
      )}
    >
      <CardContent className="flex flex-col items-center p-7!">
        <Typography variant="h2" className="mb-4">
          How can we help?
        </Typography>

        <FormControl variant="outlined" size="medium" className="w-64">
          <InputLabel>Search</InputLabel>
          <OutlinedInput
            endAdornment={
              <InputAdornment position="end">
                <IconButton edge="end">
                  <NiSearch size="medium" className="text-text-disabled" />
                </IconButton>
              </InputAdornment>
            }
            label="Search"
          />
        </FormControl>
      </CardContent>
    </Card>
  );
}
