"use client";

import { iconList } from "./icon-list";
import Link from "next/link";
import React, { useCallback, useMemo, useRef } from "react";
import { useDebounce } from "react-use";

import {
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  FilledInput,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Snackbar,
  Typography,
} from "@mui/material";

import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";
import NiCross from "@/icons/nexture/ni-cross";
import NiDuplicate from "@/icons/nexture/ni-duplicate";
import NiSearch from "@/icons/nexture/ni-search";
import NextureIcons, { IconName, IconSize, IconVariant } from "@/icons/nexture-icons";
import { cn } from "@/lib/utils";

export default function SwitchPage() {
  const [size, setSize] = React.useState<IconSize>("large");
  const handleSizeChange = (event: SelectChangeEvent) => {
    setSize(event.target.value as IconSize);
  };

  const [variant, setVariant] = React.useState<IconVariant>("outlined");
  const handleVariantChange = (event: SelectChangeEvent) => {
    setVariant(event.target.value as IconVariant);
  };

  const [tone, setTone] = React.useState("two-tone");
  const handleToneChange = (event: SelectChangeEvent) => {
    setTone(event.target.value as string);
  };

  const [color, setColor] = React.useState("text-text-primary");
  const handleColorChange = (event: SelectChangeEvent) => {
    setColor(event.target.value as string);
  };

  const [category, setCategory] = React.useState("all");
  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  // Use uncontrolled input with ref for immediate typing response
  const inputRef = useRef<HTMLInputElement>(null);

  // State for current search text
  const [currentSearch, setCurrentSearch] = React.useState("");

  // Create debounced value for search filtering
  const [debouncedSearch, setDebouncedSearch] = React.useState<string>("");

  // Handle input changes
  const handleInputChange = () => {
    if (inputRef.current) {
      setCurrentSearch(inputRef.current.value);
    }
  };

  // Setup debounce effect
  useDebounce(
    () => {
      setDebouncedSearch(currentSearch);
    },
    300,
    [currentSearch],
  );

  const [snackbarMessage, setSnackbarMessage] = React.useState<string>("");
  const [snackbarOpen, setSnackbarOpen] = React.useState<boolean>(false);

  const handleCopyClick = useCallback(
    (iconName: string) => {
      navigator.clipboard
        .writeText(
          `<${iconName} variant="${variant}" size="${size}" className="${color}" oneTone={${tone == "one-tone" ? true : false}} />`,
        )
        .then(() => {
          setSnackbarMessage("Component copied successfully!");
          setSnackbarOpen(true);
        })
        .catch(() => {
          setSnackbarMessage("An error occured!");
          setSnackbarOpen(true);
        });
    },
    [variant, size, color, tone],
  );

  const renderCategory = (cat: string, categoryIcons: any) => {
    return (
      <React.Fragment key={cat}>
        <Grid size={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h6" className="card-title">
                {cat}
              </Typography>
              <Grid container spacing={2.5}>
                {categoryIcons.map(([iconName]: IconName) => (
                  <Grid
                    size={{ xs: 12, md: 6, lg: 4, xl: 3 }}
                    component={Paper}
                    variant="outlined"
                    elevation={0}
                    key={`${cat}-${iconName}`}
                    className="hover:border-grey-200 flex flex-col items-center rounded-lg p-3 transition-colors"
                  >
                    <NextureIcons
                      variant={variant}
                      icon={iconName as IconName}
                      size={size}
                      className={cn("mb-4", color)}
                      oneTone={tone == "one-tone" ? true : false}
                    />
                    <Button
                      size="small"
                      color="grey"
                      variant="pastel"
                      startIcon={<span className="w-4"></span>}
                      endIcon={
                        <NiDuplicate size={"small"} className="opacity-0 transition-opacity group-hover:opacity-100" />
                      }
                      className="group w-full"
                      onClick={() => {
                        handleCopyClick(iconName);
                      }}
                    >
                      {iconName}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </React.Fragment>
    );
  };

  // Create render content grouped by categories
  const renderIconContent = useMemo(() => {
    // First filter icons based on search and category
    const filteredIcons = Object.entries(iconList).filter(([key, icon]) => {
      // Apply search filter
      if (debouncedSearch) {
        const searchLower = debouncedSearch.toLowerCase();
        const matchesSearch =
          key.toLowerCase().includes(searchLower) ||
          (icon.keywords && icon.keywords.some((keyword: string) => keyword.toLowerCase().includes(searchLower))) ||
          (icon.categories && icon.categories.some((category: string) => category.toLowerCase().includes(searchLower)));

        if (!matchesSearch) return false;
      }

      // Apply category filter
      if (category !== "all") {
        return icon.categories && icon.categories.includes(category);
      }
      return true;
    });

    if (filteredIcons.length === 0) {
      return (
        <Typography variant="body1" className="mt-4 w-full text-center">
          Nothing found.
        </Typography>
      );
    }

    // Group by categories
    if (category === "all") {
      // Get all unique categories from filtered icons
      const categories = Array.from(new Set(filteredIcons.flatMap(([, icon]) => icon.categories))).sort();

      return categories.map((cat) => {
        // Get icons for this category
        const categoryIcons = filteredIcons.filter(([, icon]) => icon.categories.includes(cat));
        return renderCategory(cat, categoryIcons);
      });
    } else {
      // Single category is already filtered, just display icons
      return renderCategory(category, filteredIcons);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, debouncedSearch, size, color, tone, handleCopyClick]); // Only recalculate when these values change

  return (
    <Grid container spacing={5}>
      <Grid size={12} className="mb-2">
        <Typography variant="h1" component="h1" className="mb-0">
          Nexture Icons
        </Typography>
        <Breadcrumbs>
          <Link color="inherit" href="/dashboards/default">
            Home
          </Link>
          <Link color="inherit" href="/ui">
            UI Elements
          </Link>
          <Link color="inherit" href="/ui/data-display">
            Data Display
          </Link>
          <Typography variant="body2">Nexture Icons</Typography>
        </Breadcrumbs>
      </Grid>

      <Grid size={12} className="flex flex-row gap-1.5">
        <FormControl variant="filled" size="medium" className="surface mb-0 flex-1">
          <InputLabel>Search</InputLabel>
          <FilledInput
            inputRef={inputRef}
            value={currentSearch}
            onChange={handleInputChange}
            placeholder="Type to search icons..."
            endAdornment={
              <>
                <InputAdornment position="end" className={cn(currentSearch === "" && "hidden")}>
                  <IconButton edge="end" onClick={() => setCurrentSearch("")}>
                    {<NiCross size="medium" className="text-text-disabled" />}
                  </IconButton>
                </InputAdornment>
                <InputAdornment position="end">
                  <IconButton edge="end">{<NiSearch size="medium" className="text-text-disabled" />}</IconButton>
                </InputAdornment>
              </>
            }
          />
        </FormControl>

        <FormControl variant="filled" className="surface mb-0 w-40">
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            label="Category"
            onChange={handleCategoryChange}
            IconComponent={NiChevronDownSmall}
            MenuProps={{ className: "outlined" }}
          >
            <MenuItem value="all">All Categories</MenuItem>
            {Array.from(new Set(Object.values(iconList).flatMap((icon) => icon.categories)))
              .sort()
              .map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        <FormControl variant="filled" className="surface mb-0 w-32">
          <InputLabel>Variant</InputLabel>
          <Select
            value={variant as string}
            label="Variant"
            onChange={handleVariantChange}
            IconComponent={NiChevronDownSmall}
            MenuProps={{ className: "outlined" }}
          >
            <MenuItem value="outlined">Outlined</MenuItem>
            <MenuItem value="contained">Contained</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="filled" className="surface mb-0 w-32">
          <InputLabel>Size</InputLabel>
          <Select
            value={size as string}
            label="Size"
            onChange={handleSizeChange}
            IconComponent={NiChevronDownSmall}
            MenuProps={{ className: "outlined" }}
          >
            <MenuItem value="small">Small</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="large">Large</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="filled" className="surface mb-0 w-32">
          <InputLabel>Tone</InputLabel>
          <Select
            value={tone}
            label="Tone"
            onChange={handleToneChange}
            IconComponent={NiChevronDownSmall}
            MenuProps={{ className: "outlined" }}
          >
            <MenuItem value="one-tone">One Tone</MenuItem>
            <MenuItem value="two-tone">Two Tone</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="filled" className="surface mb-0 w-32">
          <InputLabel>Color</InputLabel>
          <Select
            value={color}
            label="Color"
            onChange={handleColorChange}
            IconComponent={NiChevronDownSmall}
            MenuProps={{ className: "outlined" }}
          >
            <MenuItem value="text-primary">Primary</MenuItem>
            <MenuItem value="text-secondary">Secondary</MenuItem>
            <MenuItem value="text-accent-1">Accent 1</MenuItem>
            <MenuItem value="text-accent-2">Accent 2</MenuItem>
            <MenuItem value="text-accent-3">Accent 3</MenuItem>
            <MenuItem value="text-accent-4">Accent 4</MenuItem>
            <MenuItem value="text-text-primary">Text Primary</MenuItem>
            <MenuItem value="text-text-secondary">Text Secondary</MenuItem>
            <MenuItem value="text-text-disabled">Text Disabled</MenuItem>
            <MenuItem value="text-error">Error</MenuItem>
            <MenuItem value="text-warning">Warning</MenuItem>
            <MenuItem value="text-success">Success</MenuItem>
            <MenuItem value="text-info">Info</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid container size={12}>
        {renderIconContent}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          message={snackbarMessage}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          onClose={() => {
            setSnackbarOpen(false);
          }}
        />
      </Grid>
    </Grid>
  );
}
