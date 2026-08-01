import { Button, ButtonGroup } from "@mui/material";

import {
  Menubar,
  MenuItem,
  MenuPopup,
  MenuPortal,
  MenuPositioner,
  MenuRoot,
  MenuSeparator,
  MenuTrigger,
} from "@/components/base-ui/menubar";

export default function MenubarShortcutHints() {
  return (
    <Menubar render={<ButtonGroup size="medium" variant="pastel" color="grey" />}>
      <MenuRoot>
        <MenuTrigger render={<Button className="MuiButtonGroup-firstButton" />}>File</MenuTrigger>
        <MenuPortal>
          <MenuPositioner sideOffset={4} alignOffset={-2}>
            <MenuPopup>
              <MenuItem hint="⌘N">New</MenuItem>
              <MenuItem hint="⌘O">Open...</MenuItem>
              <MenuItem hint="⌘S">Save</MenuItem>
              <MenuItem hint="⇧⌘S">Save As...</MenuItem>
              <MenuSeparator />
              <MenuItem hint="⌘P">Print...</MenuItem>
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </MenuRoot>

      <MenuRoot>
        <MenuTrigger render={<Button className="MuiButtonGroup-middleButton" />}>Edit</MenuTrigger>
        <MenuPortal>
          <MenuPositioner sideOffset={4} alignOffset={-2}>
            <MenuPopup>
              <MenuItem hint="⌘Z">Undo</MenuItem>
              <MenuItem hint="⇧⌘Z">Redo</MenuItem>
              <MenuSeparator />
              <MenuItem hint="⌘X">Cut</MenuItem>
              <MenuItem hint="⌘C">Copy</MenuItem>
              <MenuItem hint="⌘V">Paste</MenuItem>
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </MenuRoot>

      <MenuRoot>
        <MenuTrigger render={<Button className="MuiButtonGroup-lastButton" />}>Help</MenuTrigger>
        <MenuPortal>
          <MenuPositioner sideOffset={4} alignOffset={-2}>
            <MenuPopup>
              <MenuItem hint="⇧⌘D">Documentation</MenuItem>
              <MenuItem hint="⇧⌘R">Release notes</MenuItem>
              <MenuSeparator />
              <MenuItem hint="⇧⌘A">About</MenuItem>
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </MenuRoot>
    </Menubar>
  );
}
