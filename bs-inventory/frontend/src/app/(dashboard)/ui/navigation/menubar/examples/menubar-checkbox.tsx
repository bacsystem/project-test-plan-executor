import { useState } from "react";

import { Button, ButtonGroup } from "@mui/material";

import {
  Menubar,
  MenuCheckboxItem,
  MenuItem,
  MenuPopup,
  MenuPortal,
  MenuPositioner,
  MenuRoot,
  MenuSeparator,
  MenuTrigger,
} from "@/components/base-ui/menubar";

export default function MenubarCheckbox() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [showToolbar, setShowToolbar] = useState(true);
  const [showStatusBar, setShowStatusBar] = useState(false);
  const [googleTasks, setGoogleTasks] = useState(true);
  const [mail, setMail] = useState(false);
  const [messages, setMessages] = useState(false);

  return (
    <Menubar render={<ButtonGroup size="medium" variant="pastel" color="grey" />}>
      <MenuRoot>
        <MenuTrigger render={<Button className="MuiButtonGroup-firstButton" />}>View</MenuTrigger>
        <MenuPortal>
          <MenuPositioner sideOffset={4} alignOffset={-2}>
            <MenuPopup>
              <MenuCheckboxItem checked={showSidebar} onCheckedChange={setShowSidebar}>
                Show Sidebar
              </MenuCheckboxItem>
              <MenuCheckboxItem checked={showToolbar} onCheckedChange={setShowToolbar}>
                Show Toolbar
              </MenuCheckboxItem>
              <MenuCheckboxItem checked={showStatusBar} onCheckedChange={setShowStatusBar}>
                Show Status Bar
              </MenuCheckboxItem>
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </MenuRoot>

      <MenuRoot>
        <MenuTrigger render={<Button className="MuiButtonGroup-lastButton" />}>Window</MenuTrigger>
        <MenuPortal>
          <MenuPositioner sideOffset={4} alignOffset={-2}>
            <MenuPopup>
              <MenuItem hint="⌘M">Minimize</MenuItem>
              <MenuItem>Zoom</MenuItem>
              <MenuItem hint="⌃⌥F">Fill</MenuItem>
              <MenuItem hint="⌃⌥C">Center</MenuItem>
              <MenuSeparator />
              <MenuItem>Bring All to Front</MenuItem>
              <MenuSeparator />
              <MenuCheckboxItem checked={googleTasks} onCheckedChange={setGoogleTasks}>
                Google Tasks - Tasks
              </MenuCheckboxItem>
              <MenuCheckboxItem checked={mail} onCheckedChange={setMail}>
                Mail
              </MenuCheckboxItem>
              <MenuCheckboxItem checked={messages} onCheckedChange={setMessages}>
                Messages
              </MenuCheckboxItem>
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </MenuRoot>
    </Menubar>
  );
}
