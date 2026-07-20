import { Button, ButtonGroup } from "@mui/material";

import {
  Menubar,
  MenuItem,
  MenuPopup,
  MenuPortal,
  MenuPositioner,
  MenuRoot,
  MenuSeparator,
  MenuSubmenuRoot,
  MenuSubmenuTrigger,
  MenuTrigger,
} from "@/components/base-ui/menubar";

export default function MenubarBasic() {
  return (
    <Menubar render={<ButtonGroup variant="pastel" size="medium" color="grey" />}>
      <MenuRoot>
        <MenuTrigger render={<Button className="MuiButtonGroup-firstButton" />}>File</MenuTrigger>
        <MenuPortal>
          <MenuPositioner sideOffset={4} alignOffset={-2}>
            <MenuPopup>
              <MenuItem>New</MenuItem>
              <MenuItem>Open...</MenuItem>
              <MenuItem>Save</MenuItem>
              <MenuItem>Save as...</MenuItem>
              <MenuSeparator />
              <MenuSubmenuRoot>
                <MenuSubmenuTrigger>Share</MenuSubmenuTrigger>
                <MenuPortal>
                  <MenuPositioner sideOffset={4} alignOffset={-2}>
                    <MenuPopup>
                      <MenuItem>Email link</MenuItem>
                      <MenuItem>Copy link</MenuItem>
                    </MenuPopup>
                  </MenuPositioner>
                </MenuPortal>
              </MenuSubmenuRoot>
              <MenuSeparator />
              <MenuItem>Close</MenuItem>
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </MenuRoot>

      <MenuRoot>
        <MenuTrigger render={<Button className="MuiButtonGroup-middleButton" />}>Edit</MenuTrigger>
        <MenuPortal>
          <MenuPositioner sideOffset={4} alignOffset={-2}>
            <MenuPopup>
              <MenuItem>Undo</MenuItem>
              <MenuItem>Redo</MenuItem>
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </MenuRoot>

      <MenuRoot>
        <MenuTrigger render={<Button className="MuiButtonGroup-lastButton" />}>Help</MenuTrigger>
        <MenuPortal>
          <MenuPositioner sideOffset={4}>
            <MenuPopup>
              <MenuItem>Documentation</MenuItem>
              <MenuItem>Release notes</MenuItem>
              <MenuSeparator />
              <MenuItem>About</MenuItem>
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </MenuRoot>
    </Menubar>
  );
}
