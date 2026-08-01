import { Button, ButtonGroup } from "@mui/material";

import {
  Menubar,
  MenuPopup,
  MenuPortal,
  MenuPositioner,
  MenuRadioGroup,
  MenuRadioItem,
  MenuRoot,
  MenuSeparator,
  MenuSubmenuRoot,
  MenuSubmenuTrigger,
  MenuTrigger,
} from "@/components/base-ui/menubar";
import { useLayoutContext } from "@/components/layout/layout-context";
import { useThemeContext } from "@/theme/theme-provider";

export default function MenubarRadioGroup() {
  const { leftMenuType, setLeftMenuType } = useLayoutContext();
  const { mode, setMode } = useThemeContext();
  return (
    <Menubar render={<ButtonGroup size="medium" variant="pastel" color="grey" />}>
      <MenuRoot>
        <MenuTrigger render={<Button />}>Appearance</MenuTrigger>
        <MenuPortal>
          <MenuPositioner sideOffset={4} alignOffset={-2}>
            <MenuPopup>
              <MenuSubmenuRoot>
                <MenuSubmenuTrigger>Theme</MenuSubmenuTrigger>
                <MenuPortal>
                  <MenuPositioner sideOffset={4} alignOffset={-2}>
                    <MenuPopup>
                      <MenuRadioGroup value={mode} onValueChange={setMode}>
                        <MenuRadioItem value="light">Light</MenuRadioItem>
                        <MenuRadioItem value="dark">Dark</MenuRadioItem>
                        <MenuRadioItem value="system">System</MenuRadioItem>
                      </MenuRadioGroup>
                    </MenuPopup>
                  </MenuPositioner>
                </MenuPortal>
              </MenuSubmenuRoot>
              <MenuSeparator />
              <MenuRadioGroup value={leftMenuType} onValueChange={setLeftMenuType}>
                <MenuRadioItem value="minimal">Minimal</MenuRadioItem>
                <MenuRadioItem value="comfort">Comfort</MenuRadioItem>
              </MenuRadioGroup>
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </MenuRoot>
    </Menubar>
  );
}
