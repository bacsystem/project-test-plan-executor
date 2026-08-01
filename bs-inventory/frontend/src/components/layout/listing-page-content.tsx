import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import {
  Box,
  Card,
  CardContent,
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Typography,
} from "@mui/material";
import { Grid } from "@mui/material";

import NiSearch from "@/icons/nexture/ni-search";
import NextureIcons, { IconName } from "@/icons/nexture-icons";
import { cn } from "@/lib/utils";
import { leftMenuItems } from "@/menu-items";
import { MenuItem } from "@/types";

export default function ListingPageContent() {
  const t = useTranslations("dashboard");
  const [search, setSearch] = useState<string>("");
  const [currentItems, setCurrentItems] = useState<MenuItem[]>([]);
  const pathname = usePathname();
  const router = useRouter();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch((event.target as HTMLInputElement).value);
  };

  const [mounted, setMounted] = useState(false);

  const findMenuItemForPath = (pathname: string): MenuItem | undefined => {
    let foundItem: MenuItem | undefined;

    const findItem = (items: MenuItem[]): boolean => {
      for (const item of items) {
        if (item.href === pathname) {
          foundItem = item;
          return true;
        }

        if (item.children && findItem(item.children)) {
          return true;
        }
      }
      return false;
    };

    findItem(leftMenuItems);

    if (!foundItem) {
      const pathParts = pathname.split("/").filter(Boolean);

      if (pathParts.length > 0) {
        for (let i = pathParts.length; i > 0; i--) {
          const partialPath = "/" + pathParts.slice(0, i).join("/");

          const findWithPartialPath = (items: MenuItem[]): boolean => {
            for (const item of items) {
              if (item.href === partialPath) {
                foundItem = item;
                return true;
              }

              if (item.children && findWithPartialPath(item.children)) {
                return true;
              }
            }
            return false;
          };

          if (findWithPartialPath(leftMenuItems)) {
            break;
          }
        }
      }
    }

    return foundItem;
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (pathname) {
      const menuItem = findMenuItemForPath(pathname);
      if (menuItem && menuItem.children) {
        setCurrentItems(menuItem.children);
      } else {
        setCurrentItems([]);
      }
    }
  }, [pathname]);

  if (!mounted) {
    return null;
  }

  const filteredItems = currentItems.filter(
    (item) =>
      item.label.toLowerCase().includes(search.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(search.toLowerCase())),
  );

  const handleItemClick = (href?: string) => {
    if (href) {
      router.push(href);
    }
  };

  return (
    <>
      <Grid size={12} className="flex flex-row gap-1.5">
        <FormControl variant="filled" size="medium" className="surface mb-0 flex-1">
          <InputLabel>Search</InputLabel>
          <FilledInput
            value={search}
            onChange={handleSearchChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton edge="end">{<NiSearch size="medium" className="text-text-disabled" />}</IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </Grid>

      <Grid container size={12} spacing={3}>
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => {
            const isIndexEven = Math.round(index / 2) === index / 2;
            const background = isIndexEven ? "bg-primary-light/10" : "bg-secondary-light/10";
            const color = isIndexEven ? "text-primary" : "text-secondary";
            const icon = item.icon ? (item.icon as IconName) : (item.listIcon as IconName);
            return (
              <Grid size={{ xs: 12, md: 6, lg: 4 }} key={item.id}>
                <Card
                  onClick={(event) => {
                    event.preventDefault();
                    handleItemClick(item.href);
                  }}
                  component="a"
                  href="#"
                  className="flex flex-row items-center p-1 transition-transform hover:scale-[1.02]"
                >
                  <Box
                    className={cn(
                      "flex h-24 w-16 flex-none items-center justify-center rounded-2xl",
                      background,
                      color,
                    )}
                  >
                    <NextureIcons icon={icon ? icon : "NiSquircle"} size={"large"} />
                  </Box>
                  <CardContent>
                    <Typography variant="h6" className="text-leading-5">
                      {t(item.label)}
                    </Typography>
                    <Typography variant="body2" className="text-text-secondary line-clamp-2 leading-4">
                      {item.description && t(item.description)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })
        ) : (
          <Typography variant="body1" className="mt-4 w-full text-center">
            Nothing found.
          </Typography>
        )}
      </Grid>
    </>
  );
}
