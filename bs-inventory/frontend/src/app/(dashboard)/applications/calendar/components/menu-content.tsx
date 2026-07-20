import dayjs from "dayjs";
import NextLink from "next/link";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { Box, Button, Checkbox, FormControl, FormControlLabel, Typography } from "@mui/material";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { useLayoutContext } from "@/components/layout/layout-context";
import { MenuLinkButton } from "@/components/layout/menu-link-button";
import { CheckboxSmallChecked, CheckboxSmallEmptyOutlined } from "@/icons/form/mui-checkbox";
import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";
import NiChevronLeftSmall from "@/icons/nexture/ni-chevron-left-small";
import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";
import { cn } from "@/lib/utils";

export const CalendarMenuContent = () => {
  const t = useTranslations("dashboard");

  const { setTemporaryShowPrimaryMenu, setMenuSelectedSecondaryItem } = useLayoutContext();
  const handleBackButtonClick = () => {
    setTemporaryShowPrimaryMenu(true);
    setMenuSelectedSecondaryItem(undefined);
  };

  const [date, setDate] = useState(dayjs().toDate());
  const handleDateChange = (value: any) => {
    setDate(dayjs(value).toDate());
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
          Calendar
        </Typography>
      </Box>
      <Box className="flex h-full w-full flex-1 flex-col justify-between gap-8">
        <Box className="flex flex-1 flex-col gap-4">
          <Box className="flex flex-col gap-1">
            <Typography variant="body2" className={"text-text-disabled-dark px-2.5 leading-6 font-semibold"}>
              Events
            </Typography>
            <MenuLinkButton to="/applications/calendar/home" icon="NiHome">
              Calendar
            </MenuLinkButton>
            <MenuLinkButton to="/applications/calendar/add-event" icon="NiPlusSquare">
              Add Event
            </MenuLinkButton>
          </Box>

          {/* My Calendars */}
          <Box className="flex flex-col gap-1">
            <Typography variant="body2" className={"text-text-disabled-dark px-2.5 leading-6 font-semibold"}>
              My Calendars
            </Typography>
            <Box className="mt-2.5 flex flex-col px-2.5">
              <FormControl>
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      defaultChecked
                      icon={<CheckboxSmallEmptyOutlined />}
                      checkedIcon={<CheckboxSmallChecked />}
                      color="primary"
                    />
                  }
                  label="Work"
                />
              </FormControl>
              <FormControl>
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      defaultChecked
                      icon={<CheckboxSmallEmptyOutlined />}
                      checkedIcon={<CheckboxSmallChecked />}
                      color="accent-3"
                    />
                  }
                  label="Personal"
                />
              </FormControl>
              <FormControl>
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      defaultChecked
                      icon={<CheckboxSmallEmptyOutlined />}
                      checkedIcon={<CheckboxSmallChecked />}
                      color="accent-2"
                    />
                  }
                  label="Birthdays"
                />
              </FormControl>
            </Box>
          </Box>

          {/* Other Calendars */}
          <Box className="flex flex-col gap-1">
            <Typography variant="body2" className={"text-text-disabled-dark px-2.5 leading-6 font-semibold"}>
              Other Calendars
            </Typography>
            <Box className="mt-2.5 flex flex-col px-2.5">
              <FormControl>
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      icon={<CheckboxSmallEmptyOutlined />}
                      checkedIcon={<CheckboxSmallChecked />}
                      color="secondary"
                    />
                  }
                  label="Liam Carter"
                />
              </FormControl>
              <FormControl>
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      icon={<CheckboxSmallEmptyOutlined />}
                      checkedIcon={<CheckboxSmallChecked />}
                      color="accent-1"
                    />
                  }
                  label="Olivia Peterson"
                />
              </FormControl>
              <FormControl>
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      icon={<CheckboxSmallEmptyOutlined />}
                      checkedIcon={<CheckboxSmallChecked />}
                      color="accent-4"
                    />
                  }
                  label="Laura Ellis"
                />
              </FormControl>
              <FormControl>
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      icon={<CheckboxSmallEmptyOutlined />}
                      checkedIcon={<CheckboxSmallChecked />}
                      color="accent-5"
                    />
                  }
                  label="Mia Sullivan"
                />
              </FormControl>
              <FormControl>
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      icon={<CheckboxSmallEmptyOutlined />}
                      checkedIcon={<CheckboxSmallChecked />}
                      color="accent-6"
                    />
                  }
                  label="Ethan Cooper"
                />
              </FormControl>
            </Box>
          </Box>

          {/* Navigate */}
          <Box className="flex flex-col gap-1">
            <Typography variant="body2" className={"text-text-disabled-dark px-2.5 leading-6 font-semibold"}>
              Navigate
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                className="small ms-0 mb-0 rounded-lg"
                defaultValue={dayjs()}
                value={dayjs(date)}
                onChange={handleDateChange}
                views={["day"]}
                slotProps={{
                  nextIconButton: { size: "small" },
                  previousIconButton: { size: "small" },
                  switchViewButton: { size: "small" },
                }}
                slots={{
                  switchViewIcon: (props) => {
                    return (
                      <NiChevronDownSmall
                        size={"small"}
                        {...props}
                        className={cn(props.className, "text-text-secondary")}
                      />
                    );
                  },
                  leftArrowIcon: (props) => {
                    return (
                      <NiChevronLeftSmall
                        size={"small"}
                        {...props}
                        className={cn(props.className, "text-text-secondary")}
                      />
                    );
                  },
                  rightArrowIcon: (props) => {
                    return (
                      <NiChevronRightSmall
                        size={"small"}
                        {...props}
                        className={cn(props.className, "text-text-secondary")}
                      />
                    );
                  },
                }}
              />
            </LocalizationProvider>
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
