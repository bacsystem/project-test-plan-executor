import AIContentSelectImage from "./ai-content-select-image";
import { useState } from "react";

import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";

import NiArrowOutUp from "@/icons/nexture/ni-arrow-out-up";
import NiCheck from "@/icons/nexture/ni-check";
import NiChevronLeftSmall from "@/icons/nexture/ni-chevron-left-small";
import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";
import NiCrossFull from "@/icons/nexture/ni-cross-full";
import NiFloppyDisk from "@/icons/nexture/ni-floppy-disk";
import NiMagicWand from "@/icons/nexture/ni-magic-wand";
import NiSearch from "@/icons/nexture/ni-search";

type AIContentSelectProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function AIContentSelect({ open, onClose, onConfirm }: AIContentSelectProps) {
  const [tabValue] = useState("uploads");

  const [selectedID, setSelectedID] = useState("");

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" scroll="body">
      <DialogTitle>
        <Box className="flex flex-row justify-between">
          <Box>Select Image</Box>
          <Box className="flex flex-row">
            <Button
              className="icon-only"
              onClick={onClose}
              size="small"
              color="grey"
              startIcon={<NiCrossFull size="small" />}
            />
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent className="flex flex-col gap-5 pb-7">
        <TabContext value={tabValue}>
          <Box className="flex flex-row justify-between pt-0.25">
            <Tabs
              variant="scrollable"
              allowScrollButtonsMobile
              slots={{
                endScrollButtonIcon: () => {
                  return <NiChevronRightSmall size="medium" />;
                },
                startScrollButtonIcon: () => {
                  return <NiChevronLeftSmall size="medium" />;
                },
              }}
              className="mb-0 flex-none"
              value={tabValue}
            >
              <Tab
                icon={<NiArrowOutUp size="medium" className="me-0 md:me-1" />}
                iconPosition="start"
                label={<Box className="hidden md:flex">Uploads</Box>}
                value="uploads"
              />
              <Tab
                icon={<NiMagicWand size="medium" className="me-0 md:me-1" />}
                iconPosition="start"
                label={<Box className="hidden md:flex">Generated</Box>}
                value="generated"
              />
              <Tab
                icon={<NiFloppyDisk size="medium" className="me-0 md:me-1" />}
                iconPosition="start"
                label={<Box className="hidden md:flex">Saved</Box>}
                value="saved"
              />
            </Tabs>
            <Box className="flex flex-row items-start gap-1.5">
              <FormControl variant="standard" className="outlined mb-0 w-36" size="small">
                <Input
                  size="small"
                  placeholder="Search"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton>
                        <NiSearch size="medium" className="text-text-secondary" />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <Button
                variant="contained"
                color="primary"
                startIcon={<NiCheck />}
                disabled={selectedID === ""}
                onClick={onConfirm}
              >
                Confirm
              </Button>
            </Box>
          </Box>
          <TabPanel value="uploads" className="p-0">
            <Grid container size={12} className="w-full" spacing={2.5}>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Button
                  color="grey"
                  variant="pastel"
                  className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-lg"
                >
                  <NiArrowOutUp />
                  <Typography variant="button">Upload New</Typography>
                </Button>
              </Grid>

              {itemData.map((item, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                  <AIContentSelectImage
                    imagePath={item.img}
                    id={item.id}
                    checked={selectedID === item.id}
                    onChange={() => {
                      setSelectedID(item.id);
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </TabPanel>
        </TabContext>

        <Box className="flex flex-col items-start gap-4">
          <Button
            variant="contained"
            color="primary"
            startIcon={<NiCheck />}
            disabled={selectedID === ""}
            onClick={onConfirm}
          >
            Confirm
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

const itemData = [
  {
    img: "/images/products/product-1.jpg",
    id: crypto.randomUUID(),
  },
  {
    img: "/images/products/product-2.jpg",
    id: crypto.randomUUID(),
  },
  {
    img: "/images/products/product-3.jpg",
    id: crypto.randomUUID(),
  },
  {
    img: "/images/products/product-4.jpg",
    id: crypto.randomUUID(),
  },
  {
    img: "/images/products/product-5.jpg",
    id: crypto.randomUUID(),
  },
  {
    img: "/images/products/product-6.jpg",
    id: crypto.randomUUID(),
  },
  {
    img: "/images/products/product-7.jpg",
    id: crypto.randomUUID(),
  },
  {
    img: "/images/products/product-8.jpg",
    id: crypto.randomUUID(),
  },
  {
    img: "/images/products/product-9.jpg",
    id: crypto.randomUUID(),
  },
  {
    img: "/images/products/product-10.jpg",
    id: crypto.randomUUID(),
  },
  {
    img: "/images/products/product-11.jpg",
    id: crypto.randomUUID(),
  },
];
