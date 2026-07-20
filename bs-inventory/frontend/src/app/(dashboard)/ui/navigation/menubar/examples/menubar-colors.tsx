import { Box, Button, ButtonGroup } from "@mui/material";

import {
  Menubar,
  MenuItem,
  MenuPopup,
  MenuPortal,
  MenuPositioner,
  MenuRoot,
  MenuTrigger,
} from "@/components/base-ui/menubar";

export default function MenubarColors() {
  return (
    <Box className="flex flex-col gap-4">
      {/* Contained */}
      <Box className="flex flex-row gap-2">
        <Menubar render={<ButtonGroup variant="contained" color="primary" />}>
          <MenuRoot>
            <MenuTrigger render={<Button className="MuiButtonGroup-firstButton" />}>File</MenuTrigger>
            <MenuPortal>
              <MenuPositioner sideOffset={4} alignOffset={-2}>
                <MenuPopup>
                  <MenuItem>New</MenuItem>
                  <MenuItem>Open...</MenuItem>
                  <MenuItem>Save</MenuItem>
                </MenuPopup>
              </MenuPositioner>
            </MenuPortal>
          </MenuRoot>
          <MenuRoot>
            <MenuTrigger render={<Button className="MuiButtonGroup-lastButton" />}>Edit</MenuTrigger>
            <MenuPortal>
              <MenuPositioner sideOffset={4} alignOffset={-2}>
                <MenuPopup>
                  <MenuItem>Sub Item</MenuItem>
                </MenuPopup>
              </MenuPositioner>
            </MenuPortal>
          </MenuRoot>
        </Menubar>

        <Menubar render={<ButtonGroup variant="contained" color="secondary" size="medium" />}>
          <MenuRoot>
            <MenuTrigger render={<Button className="MuiButtonGroup-firstButton" />}>File</MenuTrigger>
            <MenuPortal>
              <MenuPositioner sideOffset={4} alignOffset={-2}>
                <MenuPopup>
                  <MenuItem>New</MenuItem>
                  <MenuItem>Open...</MenuItem>
                  <MenuItem>Save</MenuItem>
                </MenuPopup>
              </MenuPositioner>
            </MenuPortal>
          </MenuRoot>
          <MenuRoot>
            <MenuTrigger render={<Button className="MuiButtonGroup-lastButton" />}>Edit</MenuTrigger>
            <MenuPortal>
              <MenuPositioner sideOffset={4} alignOffset={-2}>
                <MenuPopup>
                  <MenuItem>Sub Item</MenuItem>
                </MenuPopup>
              </MenuPositioner>
            </MenuPortal>
          </MenuRoot>
        </Menubar>

        <Menubar render={<ButtonGroup variant="contained" color="accent-1" size="medium" />}>
          <MenuRoot>
            <MenuTrigger render={<Button className="MuiButtonGroup-firstButton" />}>File</MenuTrigger>
            <MenuPortal>
              <MenuPositioner sideOffset={4} alignOffset={-2}>
                <MenuPopup>
                  <MenuItem>New</MenuItem>
                  <MenuItem>Open...</MenuItem>
                  <MenuItem>Save</MenuItem>
                </MenuPopup>
              </MenuPositioner>
            </MenuPortal>
          </MenuRoot>
          <MenuRoot>
            <MenuTrigger render={<Button className="MuiButtonGroup-lastButton" />}>Edit</MenuTrigger>
            <MenuPortal>
              <MenuPositioner sideOffset={4} alignOffset={-2}>
                <MenuPopup>
                  <MenuItem>Sub Item</MenuItem>
                </MenuPopup>
              </MenuPositioner>
            </MenuPortal>
          </MenuRoot>
        </Menubar>

        <Menubar render={<ButtonGroup variant="contained" color="accent-2" size="medium" />}>
          <MenuRoot>
            <MenuTrigger render={<Button className="MuiButtonGroup-firstButton" />}>File</MenuTrigger>
            <MenuPortal>
              <MenuPositioner sideOffset={4} alignOffset={-2}>
                <MenuPopup>
                  <MenuItem>New</MenuItem>
                  <MenuItem>Open...</MenuItem>
                  <MenuItem>Save</MenuItem>
                </MenuPopup>
              </MenuPositioner>
            </MenuPortal>
          </MenuRoot>
          <MenuRoot>
            <MenuTrigger render={<Button className="MuiButtonGroup-lastButton" />}>Edit</MenuTrigger>
            <MenuPortal>
              <MenuPositioner sideOffset={4} alignOffset={-2}>
                <MenuPopup>
                  <MenuItem>Sub Item</MenuItem>
                </MenuPopup>
              </MenuPositioner>
            </MenuPortal>
          </MenuRoot>
        </Menubar>

        <Menubar render={<ButtonGroup variant="contained" color="accent-3" size="medium" />}>
          <MenuRoot>
            <MenuTrigger render={<Button className="MuiButtonGroup-firstButton" />}>File</MenuTrigger>
            <MenuPortal>
              <MenuPositioner sideOffset={4} alignOffset={-2}>
                <MenuPopup>
                  <MenuItem>New</MenuItem>
                  <MenuItem>Open...</MenuItem>
                  <MenuItem>Save</MenuItem>
                </MenuPopup>
              </MenuPositioner>
            </MenuPortal>
          </MenuRoot>
          <MenuRoot>
            <MenuTrigger render={<Button className="MuiButtonGroup-lastButton" />}>Edit</MenuTrigger>
            <MenuPortal>
              <MenuPositioner sideOffset={4} alignOffset={-2}>
                <MenuPopup>
                  <MenuItem>Sub Item</MenuItem>
                </MenuPopup>
              </MenuPositioner>
            </MenuPortal>
          </MenuRoot>
        </Menubar>

        <Menubar render={<ButtonGroup variant="contained" color="accent-4" size="medium" />}>
          <MenuRoot>
            <MenuTrigger render={<Button className="MuiButtonGroup-firstButton" />}>File</MenuTrigger>
            <MenuPortal>
              <MenuPositioner sideOffset={4} alignOffset={-2}>
                <MenuPopup>
                  <MenuItem>New</MenuItem>
                  <MenuItem>Open...</MenuItem>
                  <MenuItem>Save</MenuItem>
                </MenuPopup>
              </MenuPositioner>
            </MenuPortal>
          </MenuRoot>
          <MenuRoot>
            <MenuTrigger render={<Button className="MuiButtonGroup-lastButton" />}>Edit</MenuTrigger>
            <MenuPortal>
              <MenuPositioner sideOffset={4} alignOffset={-2}>
                <MenuPopup>
                  <MenuItem>Sub Item</MenuItem>
                </MenuPopup>
              </MenuPositioner>
            </MenuPortal>
          </MenuRoot>
        </Menubar>

        <Menubar render={<ButtonGroup variant="contained" color="accent-5" size="medium" />}>
          <MenuRoot>
            <MenuTrigger render={<Button className="MuiButtonGroup-firstButton" />}>File</MenuTrigger>
            <MenuPortal>
              <MenuPositioner sideOffset={4} alignOffset={-2}>
                <MenuPopup>
                  <MenuItem>New</MenuItem>
                  <MenuItem>Open...</MenuItem>
                  <MenuItem>Save</MenuItem>
                </MenuPopup>
              </MenuPositioner>
            </MenuPortal>
          </MenuRoot>
          <MenuRoot>
            <MenuTrigger render={<Button className="MuiButtonGroup-lastButton" />}>Edit</MenuTrigger>
            <MenuPortal>
              <MenuPositioner sideOffset={4} alignOffset={-2}>
                <MenuPopup>
                  <MenuItem>Sub Item</MenuItem>
                </MenuPopup>
              </MenuPositioner>
            </MenuPortal>
          </MenuRoot>
        </Menubar>

        <Menubar render={<ButtonGroup variant="contained" color="accent-6" size="medium" />}>
          <MenuRoot>
            <MenuTrigger render={<Button className="MuiButtonGroup-firstButton" />}>File</MenuTrigger>
            <MenuPortal>
              <MenuPositioner sideOffset={4} alignOffset={-2}>
                <MenuPopup>
                  <MenuItem>New</MenuItem>
                  <MenuItem>Open...</MenuItem>
                  <MenuItem>Save</MenuItem>
                </MenuPopup>
              </MenuPositioner>
            </MenuPortal>
          </MenuRoot>
          <MenuRoot>
            <MenuTrigger render={<Button className="MuiButtonGroup-lastButton" />}>Edit</MenuTrigger>
            <MenuPortal>
              <MenuPositioner sideOffset={4} alignOffset={-2}>
                <MenuPopup>
                  <MenuItem>Sub Item</MenuItem>
                </MenuPopup>
              </MenuPositioner>
            </MenuPortal>
          </MenuRoot>
        </Menubar>
      </Box>

      {/* Pastel */}
      <Box className="flex flex-row gap-2">
        <Menubar render={<ButtonGroup variant="pastel" color="primary" />}>
          <MenuRoot>
            <MenuTrigger render={<Button className="MuiButtonGroup-firstButton" />}>File</MenuTrigger>
            <MenuPortal>
              <MenuPositioner sideOffset={4} alignOffset={-2}>
                <MenuPopup>
                  <MenuItem>New</MenuItem>
                  <MenuItem>Open...</MenuItem>
                  <MenuItem>Save</MenuItem>
                </MenuPopup>
              </MenuPositioner>
            </MenuPortal>
          </MenuRoot>
          <MenuRoot>
            <MenuTrigger render={<Button className="MuiButtonGroup-lastButton" />}>Edit</MenuTrigger>
            <MenuPortal>
              <MenuPositioner sideOffset={4} alignOffset={-2}>
                <MenuPopup>
                  <MenuItem>Sub Item</MenuItem>
                </MenuPopup>
              </MenuPositioner>
            </MenuPortal>
          </MenuRoot>
        </Menubar>

        <Menubar render={<ButtonGroup variant="pastel" color="secondary" size="medium" />}>
          <MenuRoot>
            <MenuTrigger render={<Button className="MuiButtonGroup-firstButton" />}>File</MenuTrigger>
            <MenuPortal>
              <MenuPositioner sideOffset={4} alignOffset={-2}>
                <MenuPopup>
                  <MenuItem>New</MenuItem>
                  <MenuItem>Open...</MenuItem>
                  <MenuItem>Save</MenuItem>
                </MenuPopup>
              </MenuPositioner>
            </MenuPortal>
          </MenuRoot>
          <MenuRoot>
            <MenuTrigger render={<Button className="MuiButtonGroup-lastButton" />}>Edit</MenuTrigger>
            <MenuPortal>
              <MenuPositioner sideOffset={4} alignOffset={-2}>
                <MenuPopup>
                  <MenuItem>Sub Item</MenuItem>
                </MenuPopup>
              </MenuPositioner>
            </MenuPortal>
          </MenuRoot>
        </Menubar>

        <Menubar render={<ButtonGroup variant="pastel" color="accent-1" size="medium" />}>
          <MenuRoot>
            <MenuTrigger render={<Button className="MuiButtonGroup-firstButton" />}>File</MenuTrigger>
            <MenuPortal>
              <MenuPositioner sideOffset={4} alignOffset={-2}>
                <MenuPopup>
                  <MenuItem>New</MenuItem>
                  <MenuItem>Open...</MenuItem>
                  <MenuItem>Save</MenuItem>
                </MenuPopup>
              </MenuPositioner>
            </MenuPortal>
          </MenuRoot>
          <MenuRoot>
            <MenuTrigger render={<Button className="MuiButtonGroup-lastButton" />}>Edit</MenuTrigger>
            <MenuPortal>
              <MenuPositioner sideOffset={4} alignOffset={-2}>
                <MenuPopup>
                  <MenuItem>Sub Item</MenuItem>
                </MenuPopup>
              </MenuPositioner>
            </MenuPortal>
          </MenuRoot>
        </Menubar>

        <Menubar render={<ButtonGroup variant="pastel" color="accent-2" size="medium" />}>
          <MenuRoot>
            <MenuTrigger render={<Button className="MuiButtonGroup-firstButton" />}>File</MenuTrigger>
            <MenuPortal>
              <MenuPositioner sideOffset={4} alignOffset={-2}>
                <MenuPopup>
                  <MenuItem>New</MenuItem>
                  <MenuItem>Open...</MenuItem>
                  <MenuItem>Save</MenuItem>
                </MenuPopup>
              </MenuPositioner>
            </MenuPortal>
          </MenuRoot>
          <MenuRoot>
            <MenuTrigger render={<Button className="MuiButtonGroup-lastButton" />}>Edit</MenuTrigger>
            <MenuPortal>
              <MenuPositioner sideOffset={4} alignOffset={-2}>
                <MenuPopup>
                  <MenuItem>Sub Item</MenuItem>
                </MenuPopup>
              </MenuPositioner>
            </MenuPortal>
          </MenuRoot>
        </Menubar>

        <Menubar render={<ButtonGroup variant="pastel" color="accent-3" size="medium" />}>
          <MenuRoot>
            <MenuTrigger render={<Button className="MuiButtonGroup-firstButton" />}>File</MenuTrigger>
            <MenuPortal>
              <MenuPositioner sideOffset={4} alignOffset={-2}>
                <MenuPopup>
                  <MenuItem>New</MenuItem>
                  <MenuItem>Open...</MenuItem>
                  <MenuItem>Save</MenuItem>
                </MenuPopup>
              </MenuPositioner>
            </MenuPortal>
          </MenuRoot>
          <MenuRoot>
            <MenuTrigger render={<Button className="MuiButtonGroup-lastButton" />}>Edit</MenuTrigger>
            <MenuPortal>
              <MenuPositioner sideOffset={4} alignOffset={-2}>
                <MenuPopup>
                  <MenuItem>Sub Item</MenuItem>
                </MenuPopup>
              </MenuPositioner>
            </MenuPortal>
          </MenuRoot>
        </Menubar>

        <Menubar render={<ButtonGroup variant="pastel" color="accent-4" size="medium" />}>
          <MenuRoot>
            <MenuTrigger render={<Button className="MuiButtonGroup-firstButton" />}>File</MenuTrigger>
            <MenuPortal>
              <MenuPositioner sideOffset={4} alignOffset={-2}>
                <MenuPopup>
                  <MenuItem>New</MenuItem>
                  <MenuItem>Open...</MenuItem>
                  <MenuItem>Save</MenuItem>
                </MenuPopup>
              </MenuPositioner>
            </MenuPortal>
          </MenuRoot>
          <MenuRoot>
            <MenuTrigger render={<Button className="MuiButtonGroup-lastButton" />}>Edit</MenuTrigger>
            <MenuPortal>
              <MenuPositioner sideOffset={4} alignOffset={-2}>
                <MenuPopup>
                  <MenuItem>Sub Item</MenuItem>
                </MenuPopup>
              </MenuPositioner>
            </MenuPortal>
          </MenuRoot>
        </Menubar>

        <Menubar render={<ButtonGroup variant="pastel" color="accent-5" size="medium" />}>
          <MenuRoot>
            <MenuTrigger render={<Button className="MuiButtonGroup-firstButton" />}>File</MenuTrigger>
            <MenuPortal>
              <MenuPositioner sideOffset={4} alignOffset={-2}>
                <MenuPopup>
                  <MenuItem>New</MenuItem>
                  <MenuItem>Open...</MenuItem>
                  <MenuItem>Save</MenuItem>
                </MenuPopup>
              </MenuPositioner>
            </MenuPortal>
          </MenuRoot>
          <MenuRoot>
            <MenuTrigger render={<Button className="MuiButtonGroup-lastButton" />}>Edit</MenuTrigger>
            <MenuPortal>
              <MenuPositioner sideOffset={4} alignOffset={-2}>
                <MenuPopup>
                  <MenuItem>Sub Item</MenuItem>
                </MenuPopup>
              </MenuPositioner>
            </MenuPortal>
          </MenuRoot>
        </Menubar>

        <Menubar render={<ButtonGroup variant="pastel" color="accent-6" size="medium" />}>
          <MenuRoot>
            <MenuTrigger render={<Button className="MuiButtonGroup-firstButton" />}>File</MenuTrigger>
            <MenuPortal>
              <MenuPositioner sideOffset={4} alignOffset={-2}>
                <MenuPopup>
                  <MenuItem>New</MenuItem>
                  <MenuItem>Open...</MenuItem>
                  <MenuItem>Save</MenuItem>
                </MenuPopup>
              </MenuPositioner>
            </MenuPortal>
          </MenuRoot>
          <MenuRoot>
            <MenuTrigger render={<Button className="MuiButtonGroup-lastButton" />}>Edit</MenuTrigger>
            <MenuPortal>
              <MenuPositioner sideOffset={4} alignOffset={-2}>
                <MenuPopup>
                  <MenuItem>Sub Item</MenuItem>
                </MenuPopup>
              </MenuPositioner>
            </MenuPortal>
          </MenuRoot>
        </Menubar>
      </Box>

      {/* Text */}
      <Box className="flex flex-row gap-2">
        <Menubar render={<ButtonGroup variant="text" color="primary" />}>
          <MenuRoot>
            <MenuTrigger render={<Button className="MuiButtonGroup-firstButton" />}>File</MenuTrigger>
            <MenuPortal>
              <MenuPositioner sideOffset={4} alignOffset={-2}>
                <MenuPopup>
                  <MenuItem>New</MenuItem>
                  <MenuItem>Open...</MenuItem>
                  <MenuItem>Save</MenuItem>
                </MenuPopup>
              </MenuPositioner>
            </MenuPortal>
          </MenuRoot>
          <MenuRoot>
            <MenuTrigger render={<Button className="MuiButtonGroup-lastButton" />}>Edit</MenuTrigger>
            <MenuPortal>
              <MenuPositioner sideOffset={4} alignOffset={-2}>
                <MenuPopup>
                  <MenuItem>Sub Item</MenuItem>
                </MenuPopup>
              </MenuPositioner>
            </MenuPortal>
          </MenuRoot>
        </Menubar>

        <Menubar render={<ButtonGroup variant="text" color="secondary" size="medium" />}>
          <MenuRoot>
            <MenuTrigger render={<Button className="MuiButtonGroup-firstButton" />}>File</MenuTrigger>
            <MenuPortal>
              <MenuPositioner sideOffset={4} alignOffset={-2}>
                <MenuPopup>
                  <MenuItem>New</MenuItem>
                  <MenuItem>Open...</MenuItem>
                  <MenuItem>Save</MenuItem>
                </MenuPopup>
              </MenuPositioner>
            </MenuPortal>
          </MenuRoot>
          <MenuRoot>
            <MenuTrigger render={<Button className="MuiButtonGroup-lastButton" />}>Edit</MenuTrigger>
            <MenuPortal>
              <MenuPositioner sideOffset={4} alignOffset={-2}>
                <MenuPopup>
                  <MenuItem>Sub Item</MenuItem>
                </MenuPopup>
              </MenuPositioner>
            </MenuPortal>
          </MenuRoot>
        </Menubar>

        <Menubar render={<ButtonGroup variant="text" color="accent-1" size="medium" />}>
          <MenuRoot>
            <MenuTrigger render={<Button className="MuiButtonGroup-firstButton" />}>File</MenuTrigger>
            <MenuPortal>
              <MenuPositioner sideOffset={4} alignOffset={-2}>
                <MenuPopup>
                  <MenuItem>New</MenuItem>
                  <MenuItem>Open...</MenuItem>
                  <MenuItem>Save</MenuItem>
                </MenuPopup>
              </MenuPositioner>
            </MenuPortal>
          </MenuRoot>
          <MenuRoot>
            <MenuTrigger render={<Button className="MuiButtonGroup-lastButton" />}>Edit</MenuTrigger>
            <MenuPortal>
              <MenuPositioner sideOffset={4} alignOffset={-2}>
                <MenuPopup>
                  <MenuItem>Sub Item</MenuItem>
                </MenuPopup>
              </MenuPositioner>
            </MenuPortal>
          </MenuRoot>
        </Menubar>

        <Menubar render={<ButtonGroup variant="text" color="accent-2" size="medium" />}>
          <MenuRoot>
            <MenuTrigger render={<Button className="MuiButtonGroup-firstButton" />}>File</MenuTrigger>
            <MenuPortal>
              <MenuPositioner sideOffset={4} alignOffset={-2}>
                <MenuPopup>
                  <MenuItem>New</MenuItem>
                  <MenuItem>Open...</MenuItem>
                  <MenuItem>Save</MenuItem>
                </MenuPopup>
              </MenuPositioner>
            </MenuPortal>
          </MenuRoot>
          <MenuRoot>
            <MenuTrigger render={<Button className="MuiButtonGroup-lastButton" />}>Edit</MenuTrigger>
            <MenuPortal>
              <MenuPositioner sideOffset={4} alignOffset={-2}>
                <MenuPopup>
                  <MenuItem>Sub Item</MenuItem>
                </MenuPopup>
              </MenuPositioner>
            </MenuPortal>
          </MenuRoot>
        </Menubar>

        <Menubar render={<ButtonGroup variant="text" color="accent-3" size="medium" />}>
          <MenuRoot>
            <MenuTrigger render={<Button className="MuiButtonGroup-firstButton" />}>File</MenuTrigger>
            <MenuPortal>
              <MenuPositioner sideOffset={4} alignOffset={-2}>
                <MenuPopup>
                  <MenuItem>New</MenuItem>
                  <MenuItem>Open...</MenuItem>
                  <MenuItem>Save</MenuItem>
                </MenuPopup>
              </MenuPositioner>
            </MenuPortal>
          </MenuRoot>
          <MenuRoot>
            <MenuTrigger render={<Button className="MuiButtonGroup-lastButton" />}>Edit</MenuTrigger>
            <MenuPortal>
              <MenuPositioner sideOffset={4} alignOffset={-2}>
                <MenuPopup>
                  <MenuItem>Sub Item</MenuItem>
                </MenuPopup>
              </MenuPositioner>
            </MenuPortal>
          </MenuRoot>
        </Menubar>

        <Menubar render={<ButtonGroup variant="text" color="accent-4" size="medium" />}>
          <MenuRoot>
            <MenuTrigger render={<Button className="MuiButtonGroup-firstButton" />}>File</MenuTrigger>
            <MenuPortal>
              <MenuPositioner sideOffset={4} alignOffset={-2}>
                <MenuPopup>
                  <MenuItem>New</MenuItem>
                  <MenuItem>Open...</MenuItem>
                  <MenuItem>Save</MenuItem>
                </MenuPopup>
              </MenuPositioner>
            </MenuPortal>
          </MenuRoot>
          <MenuRoot>
            <MenuTrigger render={<Button className="MuiButtonGroup-lastButton" />}>Edit</MenuTrigger>
            <MenuPortal>
              <MenuPositioner sideOffset={4} alignOffset={-2}>
                <MenuPopup>
                  <MenuItem>Sub Item</MenuItem>
                </MenuPopup>
              </MenuPositioner>
            </MenuPortal>
          </MenuRoot>
        </Menubar>

        <Menubar render={<ButtonGroup variant="text" color="accent-5" size="medium" />}>
          <MenuRoot>
            <MenuTrigger render={<Button className="MuiButtonGroup-firstButton" />}>File</MenuTrigger>
            <MenuPortal>
              <MenuPositioner sideOffset={4} alignOffset={-2}>
                <MenuPopup>
                  <MenuItem>New</MenuItem>
                  <MenuItem>Open...</MenuItem>
                  <MenuItem>Save</MenuItem>
                </MenuPopup>
              </MenuPositioner>
            </MenuPortal>
          </MenuRoot>
          <MenuRoot>
            <MenuTrigger render={<Button className="MuiButtonGroup-lastButton" />}>Edit</MenuTrigger>
            <MenuPortal>
              <MenuPositioner sideOffset={4} alignOffset={-2}>
                <MenuPopup>
                  <MenuItem>Sub Item</MenuItem>
                </MenuPopup>
              </MenuPositioner>
            </MenuPortal>
          </MenuRoot>
        </Menubar>

        <Menubar render={<ButtonGroup variant="text" color="accent-6" size="medium" />}>
          <MenuRoot>
            <MenuTrigger render={<Button className="MuiButtonGroup-firstButton" />}>File</MenuTrigger>
            <MenuPortal>
              <MenuPositioner sideOffset={4} alignOffset={-2}>
                <MenuPopup>
                  <MenuItem>New</MenuItem>
                  <MenuItem>Open...</MenuItem>
                  <MenuItem>Save</MenuItem>
                </MenuPopup>
              </MenuPositioner>
            </MenuPortal>
          </MenuRoot>
          <MenuRoot>
            <MenuTrigger render={<Button className="MuiButtonGroup-lastButton" />}>Edit</MenuTrigger>
            <MenuPortal>
              <MenuPositioner sideOffset={4} alignOffset={-2}>
                <MenuPopup>
                  <MenuItem>Sub Item</MenuItem>
                </MenuPopup>
              </MenuPositioner>
            </MenuPortal>
          </MenuRoot>
        </Menubar>
      </Box>
    </Box>
  );
}
