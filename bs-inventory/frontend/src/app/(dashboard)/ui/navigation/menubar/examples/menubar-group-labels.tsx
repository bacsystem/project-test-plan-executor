import { Button, ButtonGroup } from "@mui/material";

import {
  Menubar,
  MenuGroup,
  MenuGroupLabel,
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
import NiDocumentChart from "@/icons/nexture/ni-document-chart";
import NiEyeClose from "@/icons/nexture/ni-eye-close";
import NiEyeInactive from "@/icons/nexture/ni-eye-inactive";
import NiEyeOpen from "@/icons/nexture/ni-eye-open";
import NiInfoSquare from "@/icons/nexture/ni-info-square";
import NiKnobs from "@/icons/nexture/ni-knobs";
import NiPaintRoller from "@/icons/nexture/ni-paint-roller";
import NiPower from "@/icons/nexture/ni-power";
import NiPulse from "@/icons/nexture/ni-pulse";
import NiSettings from "@/icons/nexture/ni-settings";
import NiTimeline from "@/icons/nexture/ni-timeline";

export default function MenubarGroupLabels() {
  return (
    <Menubar render={<ButtonGroup size="medium" variant="pastel" color="grey" />}>
      <MenuRoot>
        <MenuTrigger render={<Button />}>File</MenuTrigger>
        <MenuPortal>
          <MenuPositioner sideOffset={4} alignOffset={-2}>
            <MenuPopup>
              <MenuGroup>
                <MenuGroupLabel>General</MenuGroupLabel>
                <MenuItem icon={<NiInfoSquare />}>About</MenuItem>
                <MenuItem icon={<NiSettings />}>Settings</MenuItem>
              </MenuGroup>
              <MenuSeparator />
              <MenuSubmenuRoot>
                <MenuSubmenuTrigger icon={<NiPaintRoller />}>Services</MenuSubmenuTrigger>
                <MenuPortal>
                  <MenuPositioner alignOffset={-2} sideOffset={4}>
                    <MenuPopup>
                      <MenuGroup>
                        <MenuGroupLabel>Development</MenuGroupLabel>
                        <MenuItem icon={<NiPulse />}>Activity Monitor</MenuItem>
                        <MenuItem icon={<NiTimeline />}>System Trace</MenuItem>
                        <MenuItem icon={<NiDocumentChart />}>File Activity</MenuItem>
                      </MenuGroup>
                      <MenuSeparator />
                      <MenuGroup>
                        <MenuGroupLabel>Shortcuts</MenuGroupLabel>
                        <MenuItem icon={<NiPower />}>Toggle Gate</MenuItem>
                        <MenuItem icon={<NiKnobs />}>Services Settings...</MenuItem>
                      </MenuGroup>
                    </MenuPopup>
                  </MenuPositioner>
                </MenuPortal>
              </MenuSubmenuRoot>
              <MenuSeparator />
              <MenuGroup>
                <MenuGroupLabel>Window</MenuGroupLabel>
                <MenuItem icon={<NiEyeClose />}>Hide App</MenuItem>
                <MenuItem icon={<NiEyeInactive />}>Hide Others</MenuItem>
                <MenuItem icon={<NiEyeOpen />}>Show All</MenuItem>
              </MenuGroup>
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </MenuRoot>
    </Menubar>
  );
}
