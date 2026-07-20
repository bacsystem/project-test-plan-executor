"use client";

import { SyntheticEvent, useState } from "react";
import { useRef } from "react";
import { useInViewport } from "react-in-viewport";

import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Box, Tab, Typography } from "@mui/material";

import NiChevronLeftSmall from "@/icons/nexture/ni-chevron-left-small";
import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export default function LPPreviews({ className }: Props) {
  const [value, setValue] = useState("green-light");
  const scrollRef = useRef(null);
  const { inViewport } = useInViewport(scrollRef, { threshold: 0.2 });

  const handleChange = (_event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box
      ref={scrollRef}
      className={cn(
        className,
        "lp-container-padding relative w-full justify-center opacity-0 transition-opacity duration-700",
        inViewport && "opacity-100",
      )}
    >
      <Box className="w-full">
        <Box className="lp-contained-container relative flex w-full flex-col gap-10">
          {/* Title and description */}
          <Box className="w-full">
            <Typography component="h2" variant="h2" className="lp-h2 text-center">
              Theme Previews
            </Typography>
            <Typography component="p" className="lp-leading mb-2.5 text-center">
              Each preview showcases primary, secondary, and accent colors, ensuring visual consistency across
              components.
            </Typography>

            <TabContext value={value}>
              <Box className="flex w-full items-center justify-center">
                <TabList
                  slotProps={{ list: { className: "gap-1" } }}
                  variant="scrollable"
                  allowScrollButtonsMobile
                  onChange={handleChange}
                  slots={{
                    endScrollButtonIcon: () => {
                      return <NiChevronRightSmall size="medium" className="-mt-3" />;
                    },
                    startScrollButtonIcon: () => {
                      return <NiChevronLeftSmall size="medium" className="-mt-3" />;
                    },
                  }}
                >
                  <Tab
                    label="Green Light"
                    value="green-light"
                    className="mb-3 [.Mui-selected]:border-[#66BA39]! [.Mui-selected]:text-[#66BA39]!"
                  />
                  <Tab
                    label="Blue Light"
                    value="blue-light"
                    className="mb-3 [.Mui-selected]:border-[#00C1EC]! [.Mui-selected]:text-[#00C1EC]!"
                  />
                  <Tab
                    label="Purple Light"
                    value="purple-light"
                    className="mb-3 [.Mui-selected]:border-[#BF33B2]! [.Mui-selected]:text-[#BF33B2]!"
                  />
                  <Tab
                    label="Orange Light"
                    value="orange-light"
                    className="mb-3 [.Mui-selected]:border-[#F8A52D]! [.Mui-selected]:text-[#F8A52D]!"
                  />
                  <Tab
                    label="Green Dark"
                    value="green-dark"
                    className="mb-3 [.Mui-selected]:border-[#66BA39]! [.Mui-selected]:text-[#66BA39]!"
                  />
                  <Tab
                    label="Blue Dark"
                    value="blue-dark"
                    className="mb-3 [.Mui-selected]:border-[#00C1EC]! [.Mui-selected]:text-[#00C1EC]!"
                  />
                  <Tab
                    label="Purple Dark"
                    value="purple-dark"
                    className="mb-3 [.Mui-selected]:border-[#BF33B2]! [.Mui-selected]:text-[#BF33B2]!"
                  />
                  <Tab
                    label="Orange Dark"
                    value="orange-dark"
                    className="mb-3 [.Mui-selected]:border-[#F8A52D]! [.Mui-selected]:text-[#F8A52D]!"
                  />
                </TabList>
              </Box>
              <TabPanel value="green-light" className="flex min-h-120 justify-center p-0">
                <img
                  src={"/images/previews/theme-preview-green-light.png"}
                  alt="preview image"
                  className="outline-line hidden max-w-full rounded-lg outline -outline-offset-1 md:flex xl:rounded-3xl"
                />
                <img
                  src={"/images/previews/theme-preview-green-light-sm.png"}
                  alt="preview image"
                  className="outline-line hidden max-w-full rounded-lg outline -outline-offset-1 sm:flex md:hidden"
                />
                <img
                  src={"/images/previews/theme-preview-green-light-xs.png"}
                  alt="preview image"
                  className="outline-line flex max-w-full rounded-lg outline -outline-offset-1 sm:hidden"
                />
              </TabPanel>
              <TabPanel value="blue-light" className="flex min-h-120 justify-center p-0">
                <img
                  src={"/images/previews/theme-preview-blue-light.png"}
                  alt="preview image"
                  className="outline-line hidden max-w-full rounded-lg outline -outline-offset-1 md:flex xl:rounded-3xl"
                />
                <img
                  src={"/images/previews/theme-preview-blue-light-sm.png"}
                  alt="preview image"
                  className="outline-line hidden max-w-full rounded-lg outline -outline-offset-1 sm:flex md:hidden"
                />
                <img
                  src={"/images/previews/theme-preview-blue-light-xs.png"}
                  alt="preview image"
                  className="outline-line flex max-w-full rounded-lg outline -outline-offset-1 sm:hidden"
                />
              </TabPanel>
              <TabPanel value="purple-light" className="flex min-h-120 justify-center p-0">
                <img
                  src={"/images/previews/theme-preview-purple-light.png"}
                  alt="preview image"
                  className="outline-line hidden max-w-full rounded-lg outline -outline-offset-1 md:flex xl:rounded-3xl"
                />
                <img
                  src={"/images/previews/theme-preview-purple-light-sm.png"}
                  alt="preview image"
                  className="outline-line hidden max-w-full rounded-lg outline -outline-offset-1 sm:flex md:hidden"
                />
                <img
                  src={"/images/previews/theme-preview-purple-light-xs.png"}
                  alt="preview image"
                  className="outline-line flex max-w-full rounded-lg outline -outline-offset-1 sm:hidden"
                />
              </TabPanel>
              <TabPanel value="orange-light" className="flex min-h-120 justify-center p-0">
                <img
                  src={"/images/previews/theme-preview-orange-light.png"}
                  alt="preview image"
                  className="outline-line hidden max-w-full rounded-lg outline -outline-offset-1 md:flex xl:rounded-3xl"
                />
                <img
                  src={"/images/previews/theme-preview-orange-light-sm.png"}
                  alt="preview image"
                  className="outline-line hidden max-w-full rounded-lg outline -outline-offset-1 sm:flex md:hidden"
                />
                <img
                  src={"/images/previews/theme-preview-orange-light-xs.png"}
                  alt="preview image"
                  className="outline-line flex max-w-full rounded-lg outline -outline-offset-1 sm:hidden"
                />
              </TabPanel>
              <TabPanel value="green-dark" className="flex min-h-120 justify-center p-0">
                <img
                  src={"/images/previews/theme-preview-green-dark.png"}
                  alt="preview image"
                  className="outline-line hidden max-w-full rounded-lg outline -outline-offset-1 md:flex xl:rounded-3xl"
                />
                <img
                  src={"/images/previews/theme-preview-green-dark-sm.png"}
                  alt="preview image"
                  className="outline-line hidden max-w-full rounded-lg outline -outline-offset-1 sm:flex md:hidden"
                />
                <img
                  src={"/images/previews/theme-preview-green-dark-xs.png"}
                  alt="preview image"
                  className="outline-line flex max-w-full rounded-lg outline -outline-offset-1 sm:hidden"
                />
              </TabPanel>
              <TabPanel value="blue-dark" className="flex min-h-120 justify-center p-0">
                <img
                  src={"/images/previews/theme-preview-blue-dark.png"}
                  alt="preview image"
                  className="outline-line hidden max-w-full rounded-lg outline -outline-offset-1 md:flex xl:rounded-3xl"
                />
                <img
                  src={"/images/previews/theme-preview-blue-dark-sm.png"}
                  alt="preview image"
                  className="outline-line hidden max-w-full rounded-lg outline -outline-offset-1 sm:flex md:hidden"
                />
                <img
                  src={"/images/previews/theme-preview-blue-dark-xs.png"}
                  alt="preview image"
                  className="outline-line flex max-w-full rounded-lg outline -outline-offset-1 sm:hidden"
                />
              </TabPanel>
              <TabPanel value="purple-dark" className="flex min-h-120 justify-center p-0">
                <img
                  src={"/images/previews/theme-preview-purple-dark.png"}
                  alt="preview image"
                  className="outline-line hidden max-w-full rounded-lg outline -outline-offset-1 md:flex xl:rounded-3xl"
                />
                <img
                  src={"/images/previews/theme-preview-purple-dark-sm.png"}
                  alt="preview image"
                  className="outline-line hidden max-w-full rounded-lg outline -outline-offset-1 sm:flex md:hidden"
                />
                <img
                  src={"/images/previews/theme-preview-purple-dark-xs.png"}
                  alt="preview image"
                  className="outline-line flex max-w-full rounded-lg outline -outline-offset-1 sm:hidden"
                />
              </TabPanel>
              <TabPanel value="orange-dark" className="flex min-h-120 justify-center p-0">
                <img
                  src={"/images/previews/theme-preview-orange-dark.png"}
                  alt="preview image"
                  className="outline-line hidden max-w-full rounded-lg outline -outline-offset-1 md:flex xl:rounded-3xl"
                />
                <img
                  src={"/images/previews/theme-preview-orange-dark-sm.png"}
                  alt="preview image"
                  className="outline-line hidden max-w-full rounded-lg outline -outline-offset-1 sm:flex md:hidden"
                />
                <img
                  src={"/images/previews/theme-preview-orange-dark-xs.png"}
                  alt="preview image"
                  className="outline-line flex max-w-full rounded-lg outline -outline-offset-1 sm:hidden"
                />
              </TabPanel>
            </TabContext>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
