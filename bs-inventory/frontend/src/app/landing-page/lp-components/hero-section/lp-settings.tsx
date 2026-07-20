import { Card, CardContent, MenuList } from "@mui/material";

import UserLanguageSwitch from "@/components/layout/user/user-language-switch";
import UserModeSwitch from "@/components/layout/user/user-mode-switch";
import UserThemeSwitch from "@/components/layout/user/user-theme-switch";

export default function LPSettings() {
  return (
    <Card className="w-80">
      <CardContent className="p-0!">
        <MenuList className="p-0">
          <UserModeSwitch />
          <UserThemeSwitch />
          <UserLanguageSwitch />
        </MenuList>
      </CardContent>
    </Card>
  );
}
