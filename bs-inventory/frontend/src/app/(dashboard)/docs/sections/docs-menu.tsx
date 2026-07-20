import Link from "next/link";

import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

import NextureIcons, { IconName } from "@/icons/nexture-icons";

export type DocsMenuItemProps = {
  label?: string;
  id?: string;
  icon?: string;
  selected?: boolean;
  href?: string;
  buttonClassName?: string;
  labelClassName?: string;
};

function DocsMenuItem({ buttonClassName, labelClassName, label, icon, selected, href }: DocsMenuItemProps) {
  return (
    <ListItem disablePadding>
      <ListItemButton
        className={buttonClassName}
        selected={selected}
        LinkComponent={href ? Link : Box}
        href={href ? href : "#"}
      >
        {icon && (
          <ListItemIcon>
            <NextureIcons icon={icon as IconName} size="medium" />
          </ListItemIcon>
        )}
        <ListItemText
          primary={label}
          slotProps={{
            primary: { className: labelClassName },
          }}
        />
      </ListItemButton>
    </ListItem>
  );
}

export default function DocsMenu({ selectedID }: any) {
  const docsMenu: DocsMenuItemProps[] = [
    {
      label: "Welcome",
      id: "docs-welcome",
      buttonClassName: "pointer-events-none mt-4",
      labelClassName: "text-sm! font-semibold! text-text-disabled-dark",
    },
    {
      label: "Introduction",
      id: "docs-introduction",
      href: "/docs/welcome/introduction",
      icon: "NiAcorn",
    },
    {
      label: "FAQ",
      id: "docs-faq",
      href: "/docs/welcome/faq",
      icon: "NiQuestionHexagon",
    },
    {
      label: "Changelog",
      id: "docs-changelog",
      href: "/docs/welcome/changelog",
      icon: "NiListCheck",
    },
    {
      label: "Getting Started",
      id: "docs-getting-started",
      buttonClassName: "pointer-events-none mt-4",
      labelClassName: "text-sm! font-semibold! text-text-disabled-dark",
    },
    {
      label: "Installation",
      id: "docs-installation",
      href: "/docs/getting-started/installation",
      icon: "NiArrowInDown",
    },
    {
      label: "File Structure",
      id: "docs-file-structure",
      href: "/docs/getting-started/file-structure",
      icon: "NiDirectory",
    },
    {
      label: "Routing and Menu",
      id: "docs-routing-and-menu",
      href: "/docs/getting-started/routing-and-menu",
      icon: "NiPath",
    },
    {
      label: "Multi Language",
      id: "docs-multi-language",
      href: "/docs/getting-started/multi-language",
      icon: "NiMessages",
    },
    {
      label: "Theme",
      id: "docs-theme",
      buttonClassName: "pointer-events-none mt-4",
      labelClassName: "text-sm! font-semibold! text-text-disabled-dark",
    },
    {
      label: "Settings",
      id: "docs-settings",
      href: "/docs/theme/settings",
      icon: "NiKnobs",
    },
    {
      label: "Theme Provider",
      id: "docs-theme-provider",
      href: "/docs/theme/theme-provider",
      icon: "NiCatalog",
    },
    {
      label: "Styling",
      id: "docs-styling",
      href: "/docs/theme/styling",
      icon: "NiBrushArt",
    },
  ];

  return (
    <List className="-mt-6">
      {docsMenu?.map((item: DocsMenuItemProps) => {
        return <DocsMenuItem key={item.id} {...item} selected={item.id === selectedID ? true : false} />;
      })}
    </List>
  );
}
