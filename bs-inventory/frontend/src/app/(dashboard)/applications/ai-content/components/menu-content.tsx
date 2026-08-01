import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import {
  Box,
  Button,
  Chip,
  ClickAwayListener,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Switch,
  Typography,
} from "@mui/material";

import { useLayoutContext } from "@/components/layout/layout-context";
import { MenuLinkButton } from "@/components/layout/menu-link-button";
import NiArrowCircleLeft from "@/icons/nexture/ni-arrow-circle-left";
import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";
import NiChevronLeftSmall from "@/icons/nexture/ni-chevron-left-small";
import NiDocumentImage from "@/icons/nexture/ni-document-image";
import NiScale from "@/icons/nexture/ni-scale";

const menuScenes = ["home", "create/image", "create/video", "create/upscale"];
export const AiContentMenuContent = () => {
  const pathname = usePathname();
  const t = useTranslations("dashboard");
  const { setTemporaryShowPrimaryMenu, setMenuSelectedSecondaryItem } = useLayoutContext();

  const [selectedMenuScene, setSelectedMenuScene] = useState<string>(menuScenes[0]);
  const [activeMenuScene, setActiveMenuScene] = useState<string>();

  const [sliderValue, setSliderValue] = useState<number>(1.5);
  const [isMenuSceneTemporary, setIsMenuSceneTemporary] = useState<boolean>(false);

  const handleSliderChange = (_event: Event, newValue: number | number[]) => {
    setSliderValue(newValue as number);
  };

  // set the active menu scene based on the location pathname
  useEffect(() => {
    setTimeout(() => {
      if (location.pathname === "/applications/ai-content/ai-upscale") {
        setSelectedMenuScene("create/upscale");
        setActiveMenuScene("create/upscale");
      } else if (location.pathname === "/applications/ai-content/ai-video") {
        setSelectedMenuScene("create/video");
        setActiveMenuScene("create/video");
      } else if (location.pathname === "/applications/ai-content/ai-image") {
        setSelectedMenuScene("create/image");
        setActiveMenuScene("create/image");
      } else {
        setSelectedMenuScene("home");
        setActiveMenuScene("home");
      }
    }, 0);
  }, [pathname]);

  const handleBackButtonClick = () => {
    setIsMenuSceneTemporary(true);
    setActiveMenuScene("home");
  };
  const handleHomeButtonClick = () => {
    setTemporaryShowPrimaryMenu(true);
    setMenuSelectedSecondaryItem(undefined);
  };

  const handleClickAway = () => {
    if (isMenuSceneTemporary) {
      // set the active menu scene to the selected menu scene
      setIsMenuSceneTemporary(false);
      setActiveMenuScene(selectedMenuScene);
    }
  };

  return (
    <>
      <ClickAwayListener onClickAway={handleClickAway}>
        <Box className="flex flex-1 flex-col">
          {activeMenuScene === "home" && (
            <>
              <Box className="mb-3.5 flex flex-row items-start gap-2">
                <Button
                  className="icon-only -mt-1"
                  size="small"
                  color="primary"
                  variant="text"
                  startIcon={<NiChevronLeftSmall size={"small"} />}
                  onClick={handleHomeButtonClick}
                />
                <Typography variant="h6" className={"text-primary -mt-1 leading-8"}>
                  AI Content
                </Typography>
              </Box>
              <Box className="flex h-full w-full flex-1 flex-col justify-between gap-8">
                <Box className="flex flex-1 flex-col gap-4">
                  {/* Workspace */}
                  <Box className="flex flex-col gap-1">
                    <Typography variant="body2" className={"text-text-disabled-dark px-2.5 leading-6 font-semibold"}>
                      Workspace
                    </Typography>
                    <MenuLinkButton to="/applications/ai-content/home" icon="NiHome">
                      Home
                    </MenuLinkButton>

                    <MenuLinkButton to="/applications/ai-content/library" icon="NiBookmark">
                      Library
                    </MenuLinkButton>

                    <MenuLinkButton to="/applications/ai-content/uploads" icon="NiArrowOutUp">
                      Uploads
                    </MenuLinkButton>
                  </Box>

                  {/* Create */}
                  <Box className="flex flex-col gap-1">
                    <Typography variant="body2" className={"text-text-disabled-dark px-2.5 leading-6 font-semibold"}>
                      Create
                    </Typography>

                    <MenuLinkButton to="/applications/ai-content/ai-image" icon="NiDocumentImage">
                      Image
                    </MenuLinkButton>
                    <MenuLinkButton to="/applications/ai-content/ai-video" icon="NiPlay">
                      Video
                    </MenuLinkButton>
                    <MenuLinkButton to="/applications/ai-content/ai-upscale" icon="NiScale">
                      Upscale
                    </MenuLinkButton>
                  </Box>

                  {/* Learn */}
                  <Box className="flex flex-col gap-1">
                    <Typography variant="body2" className={"text-text-disabled-dark px-2.5 leading-6 font-semibold"}>
                      Learn
                    </Typography>

                    <MenuLinkButton to="/applications/ai-content/learn" icon="NiGraduation">
                      Learn
                    </MenuLinkButton>
                    <MenuLinkButton to="/applications/ai-content/ai-models" icon="NiArchive">
                      Models
                    </MenuLinkButton>
                    <MenuLinkButton to="/applications/ai-content/faq" icon="NiQuestionHexagon">
                      Faq
                    </MenuLinkButton>
                  </Box>

                  {/* Controls */}
                  <Box className="flex flex-col gap-1">
                    <Typography variant="body2" className={"text-text-disabled-dark px-2.5 leading-6 font-semibold"}>
                      Controls
                    </Typography>

                    <MenuLinkButton to="/applications/ai-content/premium-plans" icon="NiMagicWand">
                      Premium Plans
                    </MenuLinkButton>
                    <MenuLinkButton to="/applications/ai-content/api-access" icon="NiCode">
                      API Access
                    </MenuLinkButton>
                    <MenuLinkButton to="/applications/ai-content/settings" icon="NiSettings">
                      Settings
                    </MenuLinkButton>
                  </Box>
                </Box>

                <Box
                  component={NextLink}
                  href="/applications/ai-content/premium-plans"
                  className="group flex w-full cursor-pointer flex-col items-center justify-center gap-2"
                >
                  <Typography variant="body1" className="px-4 text-center">
                    {t("menu-cta-copy")}
                  </Typography>
                  <Box className="group-hover:bg-primary/10 text-primary rounded-md px-5 py-2 font-medium transition-colors">
                    {t("menu-cta-button")}
                  </Box>
                </Box>
              </Box>
            </>
          )}
          {activeMenuScene === "create/image" && (
            <>
              <Box className="mb-3.5 flex flex-row items-start gap-2">
                <Button
                  className="icon-only -mt-1"
                  size="small"
                  color="primary"
                  variant="text"
                  startIcon={<NiChevronLeftSmall size={"small"} />}
                  onClick={handleBackButtonClick}
                />
                <Typography variant="h6" className={"text-primary -mt-1 leading-8"}>
                  AI Image
                </Typography>
              </Box>
              <Box className="flex h-full w-full flex-1 flex-col justify-between gap-8">
                <Box className="flex flex-1 flex-col gap-4">
                  {/* AI Settings */}
                  <Box className="flex flex-col gap-1">
                    <Typography variant="body2" className={"text-text-disabled-dark px-2.5 leading-6 font-semibold"}>
                      AI Settings
                    </Typography>
                    <Box className="flex flex-col gap-2 px-2.5">
                      <FormControl variant="filled" className="surface-standard mb-0 w-full">
                        <InputLabel>Model</InputLabel>
                        <Select
                          defaultValue={"Midjourney"}
                          label="Model"
                          IconComponent={NiChevronDownSmall}
                          MenuProps={{ className: "outlined" }}
                        >
                          <MenuItem value="Midjourney">Midjourney</MenuItem>
                          <MenuItem value="DALL·E">DALL·E</MenuItem>
                          <MenuItem value="Stable Diffusion">Stable Diffusion</MenuItem>
                          <MenuItem value="BitBrush">BitBrush</MenuItem>
                          <MenuItem value="Brush Master">Brush Master</MenuItem>
                          <MenuItem value="Craiyon">Craiyon</MenuItem>
                          <MenuItem value="Firefl">Firefl</MenuItem>
                          <MenuItem value="Artbreeder">Artbreeder</MenuItem>
                        </Select>
                      </FormControl>
                      <FormControl variant="filled" className="surface-standard mb-0 w-full">
                        <InputLabel>Style</InputLabel>
                        <Select
                          defaultValue={"Realism"}
                          label="Style"
                          IconComponent={NiChevronDownSmall}
                          MenuProps={{ className: "outlined" }}
                        >
                          <MenuItem value="Realism">Realism</MenuItem>
                          <MenuItem value="Bokeh">Bokeh</MenuItem>
                          <MenuItem value="Papercraft">Papercraft</MenuItem>
                          <MenuItem value="Painting">Painting</MenuItem>
                          <MenuItem value="Stencil">Stencil</MenuItem>
                          <MenuItem value="Polaroid">Polaroid</MenuItem>
                          <MenuItem value="Cyberpunk">Cyberpunk</MenuItem>
                          <MenuItem value="Mechanical">Mechanical</MenuItem>
                          <MenuItem value="Anime">Anime</MenuItem>
                          <MenuItem value="Mysticism">Mysticism</MenuItem>
                        </Select>
                      </FormControl>
                      <FormControl variant="filled" className="surface-standard mb-0 w-full">
                        <InputLabel>Enhancement</InputLabel>
                        <Select
                          defaultValue={"Auto"}
                          label="Enhancement"
                          IconComponent={NiChevronDownSmall}
                          MenuProps={{ className: "outlined" }}
                        >
                          <MenuItem value="Auto">Auto</MenuItem>
                          <MenuItem value="None">None</MenuItem>
                          <MenuItem value="Limited">Limited</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>

                  {/* Image */}
                  <Box className="flex flex-col gap-1">
                    <Typography variant="body2" className={"text-text-disabled-dark px-2.5 leading-6 font-semibold"}>
                      Image
                    </Typography>
                    <Box className="flex flex-col gap-2 px-2.5">
                      <FormControl variant="filled" className="surface-standard mb-0 w-full">
                        <InputLabel>Aspect Ratio</InputLabel>
                        <Select
                          defaultValue={"1:1"}
                          label="Aspect Ratio"
                          IconComponent={NiChevronDownSmall}
                          MenuProps={{ className: "outlined" }}
                        >
                          <MenuItem value="1:1">1:1</MenuItem>
                          <MenuItem value="4:3">4:3</MenuItem>
                          <MenuItem value="3:4">3:4</MenuItem>
                          <MenuItem value="16:9">16:9</MenuItem>
                          <MenuItem value="9:16">9:16</MenuItem>
                          <MenuItem value="2:1">2:1</MenuItem>
                          <MenuItem value="1:2">1:2</MenuItem>
                        </Select>
                      </FormControl>
                      <FormControl variant="filled" className="surface-standard mb-0 w-full">
                        <InputLabel>Resolution</InputLabel>
                        <Select
                          defaultValue={"1024x1024"}
                          label="Resolution"
                          IconComponent={NiChevronDownSmall}
                          MenuProps={{ className: "outlined" }}
                        >
                          <MenuItem value="768x768">768x768</MenuItem>
                          <MenuItem value="1024x1024">1024x1024</MenuItem>
                          <MenuItem value="1280x1280">1280x1280</MenuItem>
                          <MenuItem value="1600x1600">1600x1600</MenuItem>
                          <MenuItem value="1920x1920">1920x1920</MenuItem>
                        </Select>
                      </FormControl>
                      <FormControl variant="filled" className="surface-standard mb-0 w-full">
                        <InputLabel>Number of Images</InputLabel>
                        <Select
                          defaultValue={"4"}
                          label="Number of Images"
                          IconComponent={NiChevronDownSmall}
                          MenuProps={{ className: "outlined" }}
                        >
                          <MenuItem value="1">1</MenuItem>
                          <MenuItem value="2">2</MenuItem>
                          <MenuItem value="4">4</MenuItem>
                          <MenuItem value="8">8</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>

                  {/* Preferences */}
                  <Box className="flex flex-col gap-1">
                    <Typography variant="body2" className={"text-text-disabled-dark px-2.5 leading-6 font-semibold"}>
                      Preferences
                    </Typography>
                    <Box className="flex flex-col gap-2 px-2.5">
                      <FormControl className="mb-0">
                        <FormControlLabel control={<Switch defaultChecked size="small" />} label="Private" />
                      </FormControl>
                      <FormControl className="mb-0">
                        <FormControlLabel control={<Switch size="small" />} label="Transparency" />
                      </FormControl>
                      <FormControl className="mb-0">
                        <FormControlLabel control={<Switch size="small" />} label="Fixed Seed" />
                      </FormControl>
                      <FormControl className="mb-0">
                        <FormControlLabel control={<Switch size="small" />} label="Tiling" />
                      </FormControl>
                    </Box>
                  </Box>
                </Box>

                <Button
                  className="mt-2"
                  size="small"
                  color="grey"
                  variant="outlined"
                  startIcon={<NiArrowCircleLeft size={"small"} />}
                >
                  Reset to Defaults
                </Button>
              </Box>
            </>
          )}
          {activeMenuScene === "create/video" && (
            <>
              <Box className="mb-3.5 flex flex-row items-start gap-2">
                <Button
                  className="icon-only -mt-1"
                  size="small"
                  color="primary"
                  variant="text"
                  startIcon={<NiChevronLeftSmall size={"small"} />}
                  onClick={handleBackButtonClick}
                />
                <Typography variant="h6" className={"text-primary -mt-1 leading-8"}>
                  AI Video
                </Typography>
              </Box>
              <Box className="flex h-full w-full flex-1 flex-col justify-between gap-8">
                <Box className="flex flex-1 flex-col gap-4">
                  {/* AI Settings */}
                  <Box className="flex flex-col gap-1">
                    <Typography variant="body2" className={"text-text-disabled-dark px-2.5 leading-6 font-semibold"}>
                      AI Settings
                    </Typography>
                    <Box className="flex flex-col gap-2 px-2.5">
                      <FormControl variant="filled" className="surface-standard mb-0 w-full">
                        <InputLabel>Model</InputLabel>
                        <Select
                          defaultValue={"Veo 3"}
                          label="Model"
                          IconComponent={NiChevronDownSmall}
                          MenuProps={{ className: "outlined" }}
                        >
                          <MenuItem value="Veo 3">Veo 3</MenuItem>
                          <MenuItem value="Sora">Sora</MenuItem>
                          <MenuItem value="Runway Gen-3">Runway Gen-3</MenuItem>
                          <MenuItem value="Pika 2.0">Pika 2.0</MenuItem>
                          <MenuItem value="Kling AI 2.0">Kling AI 2.0</MenuItem>
                          <MenuItem value="Seedance 1.0">Seedance 1.0</MenuItem>
                          <MenuItem value="Midjourney V1">Midjourney V1</MenuItem>
                        </Select>
                      </FormControl>
                      <FormControl variant="filled" className="surface-standard mb-0 w-full">
                        <InputLabel>Motion Control</InputLabel>
                        <Select
                          defaultValue={"Dolly Out"}
                          label="Motion Control"
                          IconComponent={NiChevronDownSmall}
                          MenuProps={{ className: "outlined" }}
                        >
                          <MenuItem value="None">None</MenuItem>
                          <MenuItem value="Crane Down">Crane Down</MenuItem>
                          <MenuItem value="Crane Up">Crane Up</MenuItem>
                          <MenuItem value="Dolly Out">Dolly Out</MenuItem>
                          <MenuItem value="Dolly In">Dolly In</MenuItem>
                          <MenuItem value="Dolly Left">Dolly Left</MenuItem>
                          <MenuItem value="Orbit Left">Orbit Left</MenuItem>
                          <MenuItem value="Orbit Right">Orbit Right</MenuItem>
                          <MenuItem value="Tilt Down">Tilt Down</MenuItem>
                          <MenuItem value="Tilt Up">Tilt Up</MenuItem>
                        </Select>
                      </FormControl>
                      <FormControl variant="filled" className="surface-standard mb-0 w-full">
                        <InputLabel>Motion Elements</InputLabel>
                        <Select
                          defaultValue={"None"}
                          label="Motion Elements"
                          IconComponent={NiChevronDownSmall}
                          MenuProps={{ className: "outlined" }}
                        >
                          <MenuItem value="None">None</MenuItem>
                          <MenuItem value="Claynimation">Claynimation</MenuItem>
                          <MenuItem value="Retro Anime">Retro Anime</MenuItem>
                          <MenuItem value="Comic">Comic</MenuItem>
                          <MenuItem value="Flat">Flat</MenuItem>
                          <MenuItem value="Vintage">Vintage</MenuItem>
                        </Select>
                      </FormControl>
                      <FormControl variant="filled" className="surface-standard mb-0 w-full">
                        <InputLabel>Enhancement</InputLabel>
                        <Select
                          defaultValue={"Auto"}
                          label="Enhancement"
                          IconComponent={NiChevronDownSmall}
                          MenuProps={{ className: "outlined" }}
                        >
                          <MenuItem value="Auto">Auto</MenuItem>
                          <MenuItem value="None">None</MenuItem>
                          <MenuItem value="Limited">Limited</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>

                  {/* Video */}
                  <Box className="flex flex-col gap-1">
                    <Typography variant="body2" className={"text-text-disabled-dark px-2.5 leading-6 font-semibold"}>
                      Video
                    </Typography>
                    <Box className="flex flex-col gap-2 px-2.5">
                      <FormControl variant="filled" className="surface-standard mb-0 w-full">
                        <InputLabel>Aspect Ratio</InputLabel>
                        <Select
                          defaultValue={"1:1"}
                          label="Aspect Ratio"
                          IconComponent={NiChevronDownSmall}
                          MenuProps={{ className: "outlined" }}
                        >
                          <MenuItem value="1:1">1:1</MenuItem>
                          <MenuItem value="4:3">4:3</MenuItem>
                          <MenuItem value="3:4">3:4</MenuItem>
                          <MenuItem value="16:9">16:9</MenuItem>
                          <MenuItem value="9:16">9:16</MenuItem>
                          <MenuItem value="2:1">2:1</MenuItem>
                          <MenuItem value="1:2">1:2</MenuItem>
                        </Select>
                      </FormControl>
                      <FormControl variant="filled" className="surface-standard mb-0 w-full">
                        <InputLabel>Resolution</InputLabel>
                        <Select
                          defaultValue={"720p"}
                          label="Resolution"
                          IconComponent={NiChevronDownSmall}
                          MenuProps={{ className: "outlined" }}
                        >
                          <MenuItem value="480p">480p</MenuItem>
                          <MenuItem value="720p">720p</MenuItem>
                          <MenuItem value="1080p">1080p</MenuItem>
                          <MenuItem value="1440p">1440p</MenuItem>
                          <MenuItem value="2160p">2160p</MenuItem>
                        </Select>
                      </FormControl>
                      <FormControl variant="filled" className="surface-standard mb-0 w-full">
                        <InputLabel>Number of Videos</InputLabel>
                        <Select
                          defaultValue={"2"}
                          label="Number of Videos"
                          IconComponent={NiChevronDownSmall}
                          MenuProps={{ className: "outlined" }}
                        >
                          <MenuItem value="1">1</MenuItem>
                          <MenuItem value="2">2</MenuItem>
                          <MenuItem value="3">3</MenuItem>
                          <MenuItem value="4">4</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>

                  {/* Preferences */}
                  <Box className="flex flex-col gap-1">
                    <Typography variant="body2" className={"text-text-disabled-dark px-2.5 leading-6 font-semibold"}>
                      Preferences
                    </Typography>
                    <Box className="flex flex-col gap-2 px-2.5">
                      <FormControl className="mb-0">
                        <FormControlLabel control={<Switch defaultChecked size="small" />} label="Private" />
                      </FormControl>
                      <FormControl className="mb-0">
                        <FormControlLabel control={<Switch size="small" />} label="Smoothing" />
                      </FormControl>
                      <FormControl className="mb-0">
                        <FormControlLabel control={<Switch size="small" />} label="Fixed Seed" />
                      </FormControl>
                    </Box>
                  </Box>
                </Box>

                <Button
                  className="mt-2"
                  size="small"
                  color="grey"
                  variant="outlined"
                  startIcon={<NiArrowCircleLeft size={"small"} />}
                >
                  Reset to Defaults
                </Button>
              </Box>
            </>
          )}
          {activeMenuScene === "create/upscale" && (
            <>
              <Box className="mb-3.5 flex flex-row items-start gap-2">
                <Button
                  className="icon-only -mt-1"
                  size="small"
                  color="primary"
                  variant="text"
                  startIcon={<NiChevronLeftSmall size={"small"} />}
                  onClick={handleBackButtonClick}
                />
                <Typography variant="h6" className={"text-primary -mt-1 leading-8"}>
                  Upscale
                </Typography>
              </Box>
              <Box className="flex h-full w-full flex-1 flex-col justify-between gap-8">
                <Box className="flex flex-1 flex-col gap-4">
                  {/* Source */}
                  <Box className="flex flex-col gap-1">
                    <Typography variant="body2" className={"text-text-disabled-dark px-2.5 leading-6 font-semibold"}>
                      Source
                    </Typography>
                    <Box className="px-2.5">
                      <Button
                        color="text-primary"
                        variant="paper"
                        className="bg-background-paper! hover:outline-primary/40! flex h-40 w-full flex-col items-center justify-center gap-2 hover:outline-2!"
                      >
                        <NiDocumentImage />
                        <Typography variant="button">Select Image</Typography>
                      </Button>
                    </Box>
                  </Box>

                  {/* Settings */}
                  <Box className="flex flex-col gap-1">
                    <Typography variant="body2" className={"text-text-disabled-dark px-2.5 leading-6 font-semibold"}>
                      Settings
                    </Typography>
                    <Box className="flex flex-col gap-2 px-2.5">
                      <FormControl variant="filled" className="surface-standard mb-0 w-full">
                        <InputLabel>Mode</InputLabel>
                        <Select
                          defaultValue={"General"}
                          label="Mode"
                          IconComponent={NiChevronDownSmall}
                          MenuProps={{ className: "outlined" }}
                        >
                          <MenuItem value="General">General</MenuItem>
                          <MenuItem value="Creative">Creative</MenuItem>
                          <MenuItem value="Realistic">Realistic</MenuItem>
                        </Select>
                      </FormControl>
                      <FormControl variant="filled" className="surface-standard mb-0 w-full">
                        <InputLabel>Version</InputLabel>
                        <Select
                          defaultValue={"Stable"}
                          label="Version"
                          IconComponent={NiChevronDownSmall}
                          MenuProps={{ className: "outlined" }}
                        >
                          <MenuItem value="Stable">Stable</MenuItem>
                          <MenuItem value="Latest">Latest</MenuItem>
                          <MenuItem value="Legacy">Legacy</MenuItem>
                        </Select>
                      </FormControl>
                      <FormControl variant="filled" className="surface-standard mb-0 w-full">
                        <InputLabel>Creativity</InputLabel>
                        <Select
                          defaultValue={"Standard"}
                          label="Creativity"
                          IconComponent={NiChevronDownSmall}
                          MenuProps={{ className: "outlined" }}
                        >
                          <MenuItem value="Low">Low</MenuItem>
                          <MenuItem value="Standard">Standard</MenuItem>
                          <MenuItem value="High">High</MenuItem>
                          <MenuItem value="Ultra">Ultra</MenuItem>
                        </Select>
                      </FormControl>
                      <FormControl variant="filled" className="surface-standard mb-0 w-full">
                        <InputLabel>Details</InputLabel>
                        <Select
                          defaultValue={"Standard"}
                          label="Enhancement"
                          IconComponent={NiChevronDownSmall}
                          MenuProps={{ className: "outlined" }}
                        >
                          <MenuItem value="Low">Low</MenuItem>
                          <MenuItem value="Standard">Standard</MenuItem>
                          <MenuItem value="High">High</MenuItem>
                          <MenuItem value="Ultra">Ultra</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>

                  {/* Video */}
                  <Box className="flex flex-col gap-1">
                    <Typography variant="body2" className={"text-text-disabled-dark px-2.5 leading-6 font-semibold"}>
                      Multiplier
                    </Typography>
                    <Box className="flex flex-col gap-2 px-2.5">
                      <Box className="flex flex-row gap-4 ps-1.5">
                        <Slider
                          className="w-full"
                          onChange={handleSliderChange}
                          value={sliderValue}
                          size="small"
                          valueLabelDisplay="off"
                          step={0.25}
                          marks
                          min={1.25}
                          max={2.5}
                        />
                        <Chip label={sliderValue} size="small" variant="filled" className="min-w-12" />
                      </Box>
                    </Box>
                  </Box>

                  {/* Preferences */}
                  <Box className="flex flex-col gap-1">
                    <Typography variant="body2" className={"text-text-disabled-dark px-2.5 leading-6 font-semibold"}>
                      Preferences
                    </Typography>
                    <Box className="flex flex-col gap-2 px-2.5">
                      <FormControl className="mb-0">
                        <FormControlLabel control={<Switch defaultChecked size="small" />} label="Private" />
                      </FormControl>
                      <FormControl className="mb-0">
                        <FormControlLabel control={<Switch size="small" />} label="Smoothing" />
                      </FormControl>
                      <FormControl className="mb-0">
                        <FormControlLabel control={<Switch size="small" />} label="Fixed Seed" />
                      </FormControl>
                    </Box>
                  </Box>

                  <Button
                    className="mt-2"
                    size="medium"
                    color="primary"
                    variant="contained"
                    startIcon={<NiScale size={"medium"} />}
                  >
                    Upscale
                  </Button>
                </Box>

                <Button
                  className="mt-2"
                  size="small"
                  color="grey"
                  variant="outlined"
                  startIcon={<NiArrowCircleLeft size={"small"} />}
                >
                  Reset to Defaults
                </Button>
              </Box>
            </>
          )}
        </Box>
      </ClickAwayListener>
    </>
  );
};
