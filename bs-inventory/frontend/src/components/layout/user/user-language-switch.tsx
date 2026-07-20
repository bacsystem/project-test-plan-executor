import React, { useTransition } from "react";
import { useLocale, useTranslations } from "use-intl";

import { Avatar, Chip, Fade, ListItemIcon, Menu, MenuItem, PopoverVirtualElement } from "@mui/material";

import { LocaleOption } from "@/constants";
import { setClientLocale } from "@/i18n/locale";
import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";
import NiMessages from "@/icons/nexture/ni-messages";
import { cn } from "@/lib/utils";

export default function UserLanguageSwitch() {
  const [anchorElLang, setAnchorElLang] = React.useState<EventTarget | Element | PopoverVirtualElement | null>(null);
  const openLang = Boolean(anchorElLang);
  const handleClickLang = (event: Event | React.SyntheticEvent) => {
    setAnchorElLang(event.currentTarget);
  };
  const handleCloseLang = () => {
    setAnchorElLang(null);
  };

  const t = useTranslations("dashboard");
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();

  function handleOnChangeLocale(value: LocaleOption) {
    startTransition(() => {
      setClientLocale(value);
    });
  }

  return (
    <>
      <MenuItem onClick={handleClickLang} className={cn(openLang && "bg-grey-500/10")} disabled={isPending}>
        <ListItemIcon>
          <NiMessages size={20} />
        </ListItemIcon>
        <div className="w-full"> {t("user-language")}</div>
        <Chip
          size="small"
          avatar={<Avatar className="nano" alt={t(locale)} src={`/images/flags/${locale}.jpg`} />}
          label={t(locale)}
          variant="outlined"
        />
        <ListItemIcon>
          <NiChevronRightSmall size={20} className={cn("ms-1 me-0 transition-transform", openLang && "rotate-90")} />
        </ListItemIcon>
      </MenuItem>
      <Menu
        anchorEl={anchorElLang as Element}
        open={openLang}
        onClose={handleCloseLang}
        classes={{ paper: "mt-1 w-72" }}
        slots={{
          transition: Fade,
        }}
      >
        <MenuItem
          className={cn(locale === "de" && "active")}
          onClick={() => {
            handleCloseLang();
            handleOnChangeLocale("de");
          }}
        >
          <ListItemIcon>
            <Avatar className="nano" alt="German" src="/images/flags/de.jpg" />
          </ListItemIcon>
          {t("de")}
        </MenuItem>
        <MenuItem
          className={cn(locale === "en" && "active")}
          onClick={() => {
            handleCloseLang();
            handleOnChangeLocale("en");
          }}
        >
          <ListItemIcon>
            <Avatar className="nano" alt="English" src="/images/flags/en.jpg" />
          </ListItemIcon>
          {t("en")}
        </MenuItem>
        <MenuItem
          className={cn(locale === "es" && "active")}
          onClick={() => {
            handleCloseLang();
            handleOnChangeLocale("es");
          }}
        >
          <ListItemIcon>
            <Avatar className="nano" alt="Spanish" src="/images/flags/es.jpg" />
          </ListItemIcon>
          {t("es")}
        </MenuItem>
        <MenuItem
          className={cn(locale === "fr" && "active")}
          onClick={() => {
            handleCloseLang();
            handleOnChangeLocale("fr");
          }}
        >
          <ListItemIcon>
            <Avatar className="nano" alt="French" src="/images/flags/fr.jpg" />
          </ListItemIcon>
          {t("fr")}
        </MenuItem>
        <MenuItem
          className={cn(locale === "ar" && "active")}
          onClick={() => {
            handleCloseLang();
            handleOnChangeLocale("ar");
          }}
        >
          <ListItemIcon>
            <Avatar className="nano" alt="Arabic" src="/images/flags/ar.jpg" />
          </ListItemIcon>
          {t("ar")}
        </MenuItem>
      </Menu>
    </>
  );
}
