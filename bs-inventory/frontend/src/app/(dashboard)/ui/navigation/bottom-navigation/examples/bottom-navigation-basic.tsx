"use client";
import * as React from "react";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import NiArrowCircleLeft from "@/icons/nexture/ni-arrow-circle-left";
import NiHeart from "@/icons/nexture/ni-heart";
import NiPin from "@/icons/nexture/ni-pin";

export default function BottomNavigationBasic() {
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      showLabels
      value={value}
      className="max-w-80"
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    >
      <BottomNavigationAction label="Recents" icon={<NiArrowCircleLeft />} />
      <BottomNavigationAction label="Favorites" icon={<NiHeart />} />
      <BottomNavigationAction label="Nearby" icon={<NiPin />} />
    </BottomNavigation>
  );
}
