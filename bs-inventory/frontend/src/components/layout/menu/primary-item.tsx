import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { memo, useMemo, useState } from "react";

import { Box, Button, Tooltip, Typography } from "@mui/material";

import NextureIcons from "@/icons/nexture-icons";
import { cn, isPathMatch } from "@/lib/utils";
import { MenuItem, MenuType } from "@/types";

type Props = {
  item: MenuItem;
  onSelect: (item: MenuItem) => void;
  isActive: boolean;
  menuType: MenuType;
  className?: string;
};

export const PrimaryItem = memo(function PrimaryItem({ item, onSelect, isActive, menuType, className }: Props) {
  const t = useTranslations("dashboard");

  const pathname = usePathname();
  const selected = useMemo(() => {
    if (!item) return false;
    if (item.href && isPathMatch(pathname, item.href)) return true;
    if (item.children) return item.children.some((child) => child.href && isPathMatch(pathname, child.href));

    return false;
  }, [item, pathname]);

  const [tooltipOpen, setTooltipOpen] = useState(false);

  if (menuType !== MenuType.Minimal) {
    return (
      <Box
        className={cn("group flex w-full cursor-pointer flex-col items-center gap-2 no-underline", className)}
        component={item.isExternalLink ? NextLink : "div"}
        href={item.isExternalLink ? item.href : undefined}
        target={item.isExternalLink ? "_blank" : undefined}
        rel={item.isExternalLink ? "noreferrer" : undefined}
        onClick={
          !item.isExternalLink
            ? () => {
                onSelect(item);
                setTooltipOpen(false);
              }
            : undefined
        }
      >
        <Button
          id={item.id}
          variant="surface"
          size="large"
          color={item.color || "text-primary"}
          className={cn(
            "icon-only h-10 w-10",
            selected && `active ${item.color ? `text-${item.color.replace("text-", "")}` : "text-primary"}`,
            isActive && "active",
            "group-hover:bg-background/60 group-hover:shadow-darker-sm group-hover:backdrop-blur-sm",
          )}
          startIcon={
            item.icon && (
              <NextureIcons
                variant={selected ? "contained" : "outlined"}
                icon={item.icon}
                size={24}
                className={cn(
                  "transition-transform group-hover:scale-[0.85]",
                  (selected || isActive) && "scale-[0.85]",
                )}
              />
            )
          }
          aria-label={t(item.label)}
        ></Button>
        <Typography
          variant="body2"
          component="span"
          className={cn(
            "text-text-primary -mt-1.5 mb-1.5 line-clamp-2 w-full text-center transition-all group-hover:mt-0 group-hover:mb-0",
            (selected || isActive) && "mt-0 mb-0",
            selected && "text-primary",
          )}
        >
          {t(item.label)}
        </Typography>
      </Box>
    );
  }

  return (
    <Box className={cn("group flex w-full flex-col items-center gap-2", className)}>
      <Tooltip
        key={`left-menu-primary-item-${item.id}`}
        open={tooltipOpen}
        onClose={() => setTooltipOpen(false)}
        onOpen={() => setTooltipOpen(true)}
        title={t(item.label)}
        placement="right"
        arrow
        slotProps={{ tooltip: { className: cn("large", selected && "text-primary") } }}
      >
        <Button
          id={item.id}
          variant="surface"
          size="large"
          color={item.color || "text-primary"}
          className={cn(
            "icon-only h-10 w-10",
            selected && `active ${item.color ? `text-${item.color.replace("text-", "")}` : "text-primary"}`,
            isActive && "active",
          )}
          startIcon={
            item.icon && (
              <NextureIcons
                variant={selected ? "contained" : "outlined"}
                icon={item.icon}
                size={24}
                className={cn(
                  "transition-transform group-hover:scale-[0.85]",
                  (selected || isActive) && "scale-[0.85]",
                )}
              />
            )
          }
          aria-label={t(item.label)}
          {...(item.isExternalLink
            ? {
                component: NextLink,
                href: item.href,
                target: "_blank",
                rel: "noreferrer",
              }
            : {
                onClick: () => {
                  onSelect(item);
                  setTooltipOpen(false);
                },
              })}
        ></Button>
      </Tooltip>
    </Box>
  );
});
