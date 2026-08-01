import * as React from "react";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { ListSubheaderProps } from "@mui/material/ListSubheader";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { RadiobuttonSmallChecked, RadiobuttonSmallEmptyOutlined } from "@/icons/form/mui-radiobutton";
import NiCheck from "@/icons/nexture/ni-check";
import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";
import { Menu } from "@base-ui/react/menu";
import { Menubar as BaseMenubar } from "@base-ui/react/menubar";

export function Menubar(props: React.ComponentProps<typeof BaseMenubar>) {
  return <BaseMenubar {...props} />;
}

export function MenuRoot(props: React.ComponentProps<typeof Menu.Root>) {
  return <Menu.Root {...props} />;
}

export function MenuTrigger(props: React.ComponentProps<typeof Menu.Trigger>) {
  return <Menu.Trigger {...props} />;
}

export function MenuPortal(props: React.ComponentProps<typeof Menu.Portal>) {
  return <Menu.Portal {...props} />;
}

export function MenuPositioner(props: React.ComponentProps<typeof Menu.Positioner>) {
  return <Menu.Positioner {...props} />;
}

export function MenuPopup(props: React.ComponentProps<typeof Menu.Popup>) {
  return (
    <Menu.Popup
      render={(renderProps) => (
        <Paper className="MuiMenu-paper min-w-40" elevation={8}>
          <List component="div" disablePadding {...renderProps}>
            {props.children}
          </List>
        </Paper>
      )}
      {...props}
    />
  );
}

interface MenuItemExtendedProps {
  icon?: React.ReactNode;
  secondary?: React.ReactNode;
  hint?: React.ReactNode;
}

export function MenuItem(props: React.ComponentProps<typeof Menu.Item> & MenuItemExtendedProps) {
  const { icon, hint, children, secondary, ...other } = props;
  return (
    <Menu.Item render={<ListItemButton />} {...other}>
      {icon && <ListItemIcon className="min-w-[unset]">{icon}</ListItemIcon>}
      <ListItemText secondary={secondary}>{children}</ListItemText>
      {hint && <Typography className="text-text-secondary ms-2 shrink-0">{hint}</Typography>}
    </Menu.Item>
  );
}

export function MenuSubmenuRoot(props: React.ComponentProps<typeof Menu.SubmenuRoot>) {
  return <Menu.SubmenuRoot {...props} />;
}

export function MenuSubmenuTrigger(
  props: React.ComponentProps<typeof Menu.SubmenuTrigger> & Pick<MenuItemExtendedProps, "icon" | "hint">,
) {
  const { icon, hint, children, ...other } = props;
  return (
    <Menu.SubmenuTrigger render={<ListItemButton />} {...other}>
      {icon && <ListItemIcon className="min-w-5">{icon}</ListItemIcon>}
      <ListItemText>{children}</ListItemText>
      {hint && <Typography className="text-text-secondary ms-2 shrink-0">{hint}</Typography>}
      <NiChevronRightSmall size="small" className="-me-1" />
    </Menu.SubmenuTrigger>
  );
}

export function MenuSeparator(props: React.ComponentProps<typeof Menu.Separator>) {
  return <Menu.Separator render={<Divider />} {...props} />;
}

export function MenuCheckboxItem(
  props: React.ComponentProps<typeof Menu.CheckboxItem> & Pick<MenuItemExtendedProps, "hint">,
) {
  const { hint, children, ...other } = props;
  return (
    <Menu.CheckboxItem render={<ListItemButton />} {...other}>
      <ListItemIcon className="min-w-5">
        <Menu.CheckboxItemIndicator render={<NiCheck size="medium" />} />
      </ListItemIcon>
      <ListItemText>{children}</ListItemText>
      {hint && <Typography className="text-text-secondary ms-2 shrink-0">{hint}</Typography>}
    </Menu.CheckboxItem>
  );
}

export function MenuRadioGroup(props: React.ComponentProps<typeof Menu.RadioGroup>) {
  return <Menu.RadioGroup {...props} />;
}

export function MenuRadioItem(
  props: React.ComponentProps<typeof Menu.RadioItem> & Pick<MenuItemExtendedProps, "hint">,
) {
  const { hint, children, ...other } = props;
  return (
    <Menu.RadioItem render={<ListItemButton />} {...other}>
      <ListItemIcon className="relative min-w-5">
        <RadiobuttonSmallEmptyOutlined className="text-grey-200" />
        <Menu.RadioItemIndicator
          render={<RadiobuttonSmallChecked className="ltr:left:0 text-primary absolute rtl:right-0" />}
        />
      </ListItemIcon>
      <ListItemText>{children}</ListItemText>
      {hint && <Typography className="text-text-secondary ms-2 shrink-0">{hint}</Typography>}
    </Menu.RadioItem>
  );
}

export function MenuGroup(props: React.ComponentProps<typeof Menu.Group>) {
  return <Menu.Group render={<Box className="relative" />} {...props} />;
}

export function MenuGroupLabel(props: React.ComponentProps<typeof Menu.GroupLabel>) {
  const subheaderProps: ListSubheaderProps = { component: "div" };
  return (
    <Menu.GroupLabel
      render={
        <Typography variant="body2" className="text-text-disabled-dark px-4 leading-6 font-bold" {...subheaderProps} />
      }
      {...props}
    />
  );
}
