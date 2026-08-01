"use client";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import { SyntheticEvent, useState } from "react";

import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  FilledInput,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Pagination,
  PaginationItem,
  PopoverVirtualElement,
  Rating,
  Tooltip,
  Typography,
} from "@mui/material";

import { CheckboxSmallChecked, CheckboxSmallEmptyOutlined } from "@/icons/form/mui-checkbox";
import NiCheckSquare from "@/icons/nexture/ni-check-square";
import NiChevronLeftSmall from "@/icons/nexture/ni-chevron-left-small";
import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";
import NiCrossSquare from "@/icons/nexture/ni-cross-square";
import NiDuplicate from "@/icons/nexture/ni-duplicate";
import NiEllipsisHorizontal from "@/icons/nexture/ni-ellipsis-horizontal";
import NiExclamationSquare from "@/icons/nexture/ni-exclamation-square";
import NiMinusSquare from "@/icons/nexture/ni-minus-square";
import NiPenSquare from "@/icons/nexture/ni-pen-square";
import NiPlus from "@/icons/nexture/ni-plus";
import NiSearch from "@/icons/nexture/ni-search";
import NiStar from "@/icons/nexture/ni-star";
import { cn, currencyFormatter } from "@/lib/utils";

dayjs.extend(duration);
dayjs.extend(relativeTime);

const initialRows = [
  {
    id: 1,
    image: "/images/products/product-1.jpg",
    name: "Woolworth",
    price: 17.9,
    stock: 14,
    rating: 5,
    ratingCount: 25,
    updatedAt: dayjs("2025-05-15 14:20").toDate(),
    lastSale: dayjs().subtract(2, "hours").toDate(),
    status: "Active",
    description: "Handcrafted wooden toy made from eco-friendly materials.",
  },
  {
    id: 2,
    image: "/images/products/product-2.jpg",
    name: "Subwoofer",
    price: 5.25,
    stock: 31,
    rating: 5,
    ratingCount: 132,
    updatedAt: dayjs("2025-05-16 14:20").toDate(),
    lastSale: dayjs().subtract(5, "hours").toDate(),
    status: "Active",
    description: "Natural wooden toy crafted by hand using safe, earth-friendly",
  },
  {
    id: 3,
    image: "/images/products/product-3.jpg",
    name: "Dodo",
    price: 16.5,
    stock: 0,
    rating: 5,
    ratingCount: 78,
    updatedAt: dayjs("2025-05-24 14:20").toDate(),
    lastSale: dayjs().subtract(25, "minutes").toDate(),
    status: "No Stock",
    description: "Wooden dinasour with movable joints that is made from recycled materials.",
  },
  {
    id: 4,
    image: "/images/products/product-4.jpg",
    name: "Stretchy",
    price: 14.8,
    stock: 11,
    rating: 4.5,
    ratingCount: 54,
    updatedAt: dayjs("2025-05-26 14:20").toDate(),
    lastSale: dayjs().subtract(20, "minutes").toDate(),
    status: "Active",
    description: "Sustainably crafted wooden toy that brings natural charm and warmness.",
  },
  {
    id: 5,
    image: "/images/products/product-5.jpg",
    name: "Pony Soprano",
    price: 5.2,
    stock: 28,
    rating: 5,
    ratingCount: 168,
    updatedAt: dayjs("2025-05-20 14:20").toDate(),
    lastSale: dayjs().subtract(20, "minutes").toDate(),
    status: "Active",
    description: "Artisan-made wooden toy created from green materials.",
  },
  {
    id: 6,
    image: "/images/products/product-6.jpg",
    name: "Buck Rogers",
    price: 8.8,
    stock: 48,
    rating: 5,
    ratingCount: 4587,
    updatedAt: dayjs("2025-05-17 14:20").toDate(),
    lastSale: dayjs().subtract(5, "minutes").toDate(),
    status: "Active",
    description: "Sustainable wooden toy, crafted by hand for safe and natural play.",
  },
  {
    id: 7,
    image: "/images/products/product-7.jpg",
    name: "Cinnabun",
    price: 18.2,
    stock: 44,
    rating: 5,
    ratingCount: 455,
    updatedAt: dayjs("2025-05-12 14:20").toDate(),
    lastSale: dayjs().subtract(40, "minutes").toDate(),
    status: "Active",
    description: "Eco-safe wooden toy handcrafted with renewable wood.",
  },
  {
    id: 8,
    image: "/images/products/product-8.jpg",
    name: "Paperwork",
    price: 15.25,
    stock: 6,
    rating: 5,
    ratingCount: 5,
    updatedAt: dayjs("2025-05-13 14:20").toDate(),
    lastSale: dayjs().subtract(30, "minutes").toDate(),
    status: "Inactive",
    description: "Handcrafted wooden toys made for mindful play.",
  },
  {
    id: 9,
    image: "/images/products/product-4.jpg",
    name: "Stretchy",
    price: 9.9,
    stock: 31,
    rating: 4.5,
    ratingCount: 4,
    updatedAt: dayjs("2025-05-24 14:20").toDate(),
    lastSale: dayjs().subtract(4, "hours").toDate(),
    status: "Active",
    description: "Thoughtfully crafted wooden toys for greener childhoods.",
  },
  {
    id: 10,
    image: "/images/products/product-3.jpg",
    name: "Dodo",
    price: 14.0,
    stock: 32,
    rating: 5,
    ratingCount: 16,
    updatedAt: dayjs("2025-05-26 14:20").toDate(),
    lastSale: dayjs().subtract(4, "hours").toDate(),
    status: "Active",
    description: "Sustainably made wooden toys with simple natural design.",
  },
  {
    id: 11,
    image: "/images/products/product-2.jpg",
    name: "Subwoofer",
    price: 12.4,
    stock: 25,
    rating: 5,
    ratingCount: 232,
    updatedAt: dayjs("2025-05-28 14:20").toDate(),
    lastSale: dayjs().subtract(4, "hours").toDate(),
    status: "Active",
    description: "Earth-safe wooden toys made with care for the environment.",
  },
  {
    id: 12,
    image: "/images/products/product-1.jpg",
    name: "Woolworth",
    price: 16.3,
    stock: 43,
    rating: 5,
    ratingCount: 68,
    updatedAt: dayjs("2025-05-26 14:20").toDate(),
    lastSale: dayjs().subtract(4, "hours").toDate(),
    status: "Active",
    description: "Hand-crafted wooden toys made from earth-friendly materials.",
  },
  {
    id: 13,
    image: "/images/products/product-8.jpg",
    name: "Donatello",
    price: 16.5,
    stock: 27,
    rating: 5,
    ratingCount: 84,
    updatedAt: dayjs("2025-05-24 14:20").toDate(),
    lastSale: dayjs().subtract(3, "hours").toDate(),
    status: "Active",
    description: "Eco-conscious wooden toys blending traditional playtime with today's technology.",
  },
  {
    id: 14,
    image: "/images/products/product-7.jpg",
    name: "Bubbles",
    price: 12.4,
    stock: 23,
    rating: 1,
    ratingCount: 1,
    updatedAt: dayjs("2025-05-26 14:20").toDate(),
    lastSale: dayjs().subtract(3, "hours").toDate(),
    status: "Active",
    description: "Sustainable materials shaped into timeless play.",
  },
  {
    id: 15,
    image: "/images/products/product-6.jpg",
    name: "Birb",
    price: 14.6,
    stock: 45,
    rating: 5,
    ratingCount: 2,
    updatedAt: dayjs("2025-05-26 14:20").toDate(),
    lastSale: dayjs().subtract(3, "hours").toDate(),
    status: "Active",
    description: "Handmade wooden toys inspired by nature's simplicity.",
  },
  {
    id: 16,
    image: "/images/products/product-5.jpg",
    name: "Woolworth",
    price: 5.2,
    stock: 64,
    rating: 4,
    ratingCount: 47,
    updatedAt: dayjs("2025-05-22 14:20").toDate(),
    lastSale: dayjs().subtract(35, "minutes").toDate(),
    status: "Active",
    description: "Natural wooden toys created for safe, gentle play.",
  },
];

const renderStatus = (status: string) => {
  if (status === "Active") {
    return (
      <Button
        className="bg-background-paper/60 pointer-events-none absolute inset-e-2 top-2 self-center"
        size="tiny"
        color="success"
        variant="pastel"
        component="div"
        startIcon={<NiCheckSquare size={"tiny"} />}
      >
        {status}
      </Button>
    );
  } else if (status === "Inactive") {
    return (
      <Button
        className="bg-background-paper/60 pointer-events-none absolute inset-e-2 top-2 self-center"
        size="tiny"
        color="grey"
        variant="pastel"
        component="div"
        startIcon={<NiMinusSquare size={"tiny"} />}
      >
        {status}
      </Button>
    );
  } else {
    return (
      <Button
        className="bg-background-paper/60 pointer-events-none absolute inset-e-2 top-2 self-center"
        size="tiny"
        color="error"
        variant="pastel"
        component="div"
        startIcon={<NiExclamationSquare size={"tiny"} />}
      >
        {status}
      </Button>
    );
  }
};

export default function Page() {
  const [checkedIds, setCheckedIds] = useState<number[]>([]);

  const handleToggle = (id: number) => {
    if (checkedIds.includes(id)) {
      setCheckedIds(checkedIds.filter((item) => item !== id));
    } else {
      setCheckedIds([...checkedIds, id]);
    }
  };

  const [anchorElSelection, setAnchorElSelection] = useState<EventTarget | Element | PopoverVirtualElement | null>(
    null,
  );
  const openSelection = Boolean(anchorElSelection);
  const handleClickSelection = (event: Event | SyntheticEvent) => {
    setAnchorElSelection(event.currentTarget);
  };
  const handleCloseSelection = () => {
    setAnchorElSelection(null);
  };

  return (
    <Grid container spacing={5} className="w-full" size={12}>
      <Grid container spacing={2.5} className="w-full" size={12}>
        <Grid size={{ xs: 12, md: "grow" }}>
          <Typography variant="h1" component="h1" className="mb-0">
            Products Cards
          </Typography>
          <Breadcrumbs>
            <Link color="inherit" href="/dashboards/default">
              Home
            </Link>
            <Link color="inherit" href="/pages">
              Pages
            </Link>
            <Link color="inherit" href="/pages/ecommerce">
              Ecommerce
            </Link>
            <Typography variant="body2">Products Cards</Typography>
          </Breadcrumbs>
        </Grid>

        <Grid size={{ xs: 12, md: "auto" }} className="flex flex-row items-start gap-2">
          {checkedIds.length > 0 && (
            <>
              <Tooltip title="Selection">
                <Button
                  className="surface-standard"
                  size="medium"
                  color="grey"
                  variant="surface"
                  onClick={handleClickSelection}
                  endIcon={
                    <NiChevronRightSmall
                      size={"medium"}
                      className={cn("transition-transform rtl:rotate-180", openSelection && "rotate-90 rtl:rotate-90")}
                    />
                  }
                >
                  {checkedIds.length > 1 ? checkedIds.length + " Items" : checkedIds.length + " Item"}
                </Button>
              </Tooltip>

              <Menu
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                anchorEl={anchorElSelection as Element}
                open={openSelection}
                onClose={handleCloseSelection}
                className="mt-1"
              >
                <MenuItem
                  onClick={() => {
                    handleCloseSelection();
                  }}
                >
                  <ListItemIcon>
                    <NiPenSquare size="medium" />
                  </ListItemIcon>
                  <ListItemText>Edit</ListItemText>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleCloseSelection();
                  }}
                >
                  <ListItemIcon>
                    <NiDuplicate size="medium" />
                  </ListItemIcon>
                  <ListItemText>Duplicate</ListItemText>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleCloseSelection();
                  }}
                >
                  <ListItemIcon>
                    <NiCrossSquare size="medium" />
                  </ListItemIcon>
                  <ListItemText>Delete</ListItemText>
                </MenuItem>
              </Menu>
            </>
          )}
          <Tooltip title="Add Item">
            <Button
              className="surface-standard"
              size="medium"
              color="grey"
              variant="surface"
              startIcon={<NiPlus size={"medium"} />}
            >
              Add Item
            </Button>
          </Tooltip>
        </Grid>
      </Grid>
      <Grid container size={12} className="items-start">
        <Grid size={12}>
          <FormControl variant="filled" size="medium" className="surface mb-0" fullWidth>
            <InputLabel>Search</InputLabel>
            <FilledInput
              defaultValue=""
              placeholder="Type to search..."
              endAdornment={
                <>
                  <InputAdornment position="end">
                    <IconButton edge="end">{<NiSearch size="medium" className="text-text-disabled" />}</IconButton>
                  </InputAdornment>
                </>
              }
            />
          </FormControl>
        </Grid>

        <Grid size={12} container spacing={2.5}>
          {initialRows.map((product) => {
            return (
              <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={product.id}>
                <Card>
                  <Link href="/pages/ecommerce/product-detail" className="peer relative block pb-4">
                    <CardMedia
                      component="img"
                      alt={product.name}
                      className="h-48 rounded-md"
                      src={product.image}
                    ></CardMedia>
                    {renderStatus(product.status)}
                  </Link>
                  <CardContent className="peer-hover:[&_a.product-title]:text-primary pt-0">
                    <Box className="flex flex-row gap-2">
                      <Box className="flex-none">
                        <Checkbox
                          size="small"
                          icon={<CheckboxSmallEmptyOutlined />}
                          checkedIcon={<CheckboxSmallChecked />}
                          checked={checkedIds.includes(product.id)}
                          onChange={() => handleToggle(product.id)}
                        />
                      </Box>
                      <Box className="flex flex-1 flex-col">
                        <Box className="flex flex-1 flex-row justify-between">
                          <Typography
                            variant="h6"
                            component={Link}
                            href="/pages/ecommerce/product-detail"
                            className="hover:text-primary product-title line-clamp-1 h-6 transition-colors"
                          >
                            {product.name}
                          </Typography>
                          <Button className="icon-only flex-none" size="small" color="grey" variant="text">
                            <NiEllipsisHorizontal size={"small"} />
                          </Button>
                        </Box>
                        <Box className="flex flex-col gap-1">
                          <Typography variant="subtitle1">{currencyFormatter.format(product.price)}</Typography>
                          <Typography variant="body1" className="text-text-secondary line-clamp-2">
                            {product.description}
                          </Typography>
                          <Box className="flex flex-row items-center">
                            <Rating
                              readOnly
                              defaultValue={product.rating}
                              max={5}
                              size="small"
                              icon={<NiStar variant="contained" size="small" />}
                              emptyIcon={<NiStar size="small" className="outlined" />}
                            />
                            <Typography variant="body1" component="span" className="text-text-secondary ms-1">
                              ({product.ratingCount})
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        <Grid size={12} className="flex justify-center">
          <Pagination
            size="medium"
            count={3}
            className="surface-standard"
            renderItem={(item) => (
              <PaginationItem slots={{ previous: NiChevronLeftSmall, next: NiChevronRightSmall }} {...item} />
            )}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
