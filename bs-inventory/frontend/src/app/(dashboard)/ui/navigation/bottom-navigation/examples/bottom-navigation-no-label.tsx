"use client";
import * as React from "react";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import NiArrowCircleLeft from "@/icons/nexture/ni-arrow-circle-left";
import NiHeart from "@/icons/nexture/ni-heart";
import NiPin from "@/icons/nexture/ni-pin";

export default function BottomNavigationNoLabel() {
  const [value, setValue] = React.useState("recents");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation className="max-w-80" value={value} onChange={handleChange}>
      <BottomNavigationAction label="Recents" value="recents" icon={<NiArrowCircleLeft />} />
      <BottomNavigationAction label="Favorites" value="favorites" icon={<NiHeart />} />
      <BottomNavigationAction label="Nearby" value="nearby" icon={<NiPin />} />
    </BottomNavigation>
  );
}
