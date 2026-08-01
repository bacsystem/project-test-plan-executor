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
import NiArrowCircleLeft from "@/icons/nexture/ni-arrow-circle-left";
import NiArrowCircleRight from "@/icons/nexture/ni-arrow-circle-right";
import NiFloppyDisk from "@/icons/nexture/ni-floppy-disk";
import NiFolder from "@/icons/nexture/ni-folder";
import NiPlusSquare from "@/icons/nexture/ni-plus-square";
import NiPrinter from "@/icons/nexture/ni-printer";

export default function MenubarIcon() {
  return (
    <Menubar render={<ButtonGroup size="medium" variant="pastel" color="grey" />}>
      <MenuRoot>
        <MenuTrigger render={<Button className="MuiButtonGroup-firstButton" />}>File</MenuTrigger>
        <MenuPortal>
          <MenuPositioner sideOffset={4} alignOffset={-2}>
            <MenuPopup>
              <MenuItem icon={<NiPlusSquare />}>New</MenuItem>
              <MenuItem icon={<NiFolder />}>Open...</MenuItem>
              <MenuItem icon={<NiFloppyDisk />}>Save</MenuItem>
              <MenuSeparator />
              <MenuItem icon={<NiPrinter />}>Print...</MenuItem>
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </MenuRoot>

      <MenuRoot>
        <MenuTrigger render={<Button className="MuiButtonGroup-lastButton" />}>Edit</MenuTrigger>
        <MenuPortal>
          <MenuPositioner sideOffset={4} alignOffset={-2}>
            <MenuPopup>
              <MenuItem icon={<NiArrowCircleLeft />}>Undo</MenuItem>
              <MenuItem icon={<NiArrowCircleRight />}>Redo</MenuItem>
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </MenuRoot>
    </Menubar>
  );
}
