import NextLink from "next/link";
import { useTranslations } from "next-intl";

import { Box, Button, Typography } from "@mui/material";

import { useLayoutContext } from "@/components/layout/layout-context";
import { MenuLinkButton } from "@/components/layout/menu-link-button";
import NiChevronLeftSmall from "@/icons/nexture/ni-chevron-left-small";

export const DriveMenuContent = () => {
  const t = useTranslations("dashboard");

  const { setTemporaryShowPrimaryMenu, setMenuSelectedSecondaryItem } = useLayoutContext();
  const handleBackButtonClick = () => {
    setTemporaryShowPrimaryMenu(true);
    setMenuSelectedSecondaryItem(undefined);
  };
  return (
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
          Drive
        </Typography>
      </Box>
      <Box className="flex h-full w-full flex-1 flex-col justify-between gap-8">
        <Box className="flex flex-1 flex-col gap-4">
          <Box className="flex flex-col gap-1">
            <Typography variant="body2" className={"text-text-disabled-dark px-2.5 leading-6 font-semibold"}>
              Files
            </Typography>
            <MenuLinkButton to="/applications/drive/home" icon="NiHome">
              Home
            </MenuLinkButton>
            <MenuLinkButton to="/applications/drive/files" icon="NiDirectory">
              Files
            </MenuLinkButton>
            <MenuLinkButton to="/applications/drive/favorites" icon="NiStars">
              Favorites
            </MenuLinkButton>
            <MenuLinkButton to="/applications/drive/shared" icon="NiShare">
              Shared
            </MenuLinkButton>
            <MenuLinkButton to="/applications/drive/spam" icon="NiExclamationHexagon">
              Spam
            </MenuLinkButton>
            <MenuLinkButton to="/applications/drive/trash" icon="NiBinEmpty">
              Trash
            </MenuLinkButton>
          </Box>

          {/* Labels */}
          <Box className="flex flex-col gap-1">
            <Typography variant="body2" className={"text-text-disabled-dark px-2.5 leading-6 font-semibold"}>
              Labels
            </Typography>
            <MenuLinkButton
              to="/applications/drive/label?value=feedback"
              icon="NiSquircle"
              iconVariant="contained"
              iconClassName="text-primary opacity-40"
            >
              Feedback
            </MenuLinkButton>
            <MenuLinkButton
              to="/applications/drive/label?value=mockup"
              icon="NiSquircle"
              iconVariant="contained"
              iconClassName="text-secondary opacity-40"
            >
              Mockup
            </MenuLinkButton>
            <MenuLinkButton
              to="/applications/drive/label?value=asset"
              icon="NiSquircle"
              iconVariant="contained"
              iconClassName="text-accent-1 opacity-40"
            >
              Asset
            </MenuLinkButton>
            <MenuLinkButton
              to="/applications/drive/label?value=meeting"
              icon="NiSquircle"
              iconVariant="contained"
              iconClassName="text-accent-2 opacity-40"
            >
              Meeting
            </MenuLinkButton>
            <MenuLinkButton
              to="/applications/drive/label?value=campaign"
              icon="NiSquircle"
              iconVariant="contained"
              iconClassName="text-accent-3 opacity-40"
            >
              Campaign
            </MenuLinkButton>
          </Box>

          {/* Controls */}
          <Box className="flex flex-col gap-1">
            <Typography variant="body2" className={"text-text-disabled-dark px-2.5 leading-6 font-semibold"}>
              Controls
            </Typography>
            <MenuLinkButton to="/applications/drive/workspaces" icon="NiBriefcase">
              Workspaces
            </MenuLinkButton>
            <MenuLinkButton to="/applications/drive/organizations" icon="NiUsers">
              Organizations
            </MenuLinkButton>
            <MenuLinkButton to="/applications/drive/settings" icon="NiKnobs">
              Settings
            </MenuLinkButton>
          </Box>
        </Box>

        <Box
          component={NextLink}
          href="/applications/drive/premium-plans"
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
  );
};
