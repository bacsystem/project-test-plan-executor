import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";

import NiDuplicate from "@/icons/nexture/ni-duplicate";
import NiFloppyDisk from "@/icons/nexture/ni-floppy-disk";
import NiPlus from "@/icons/nexture/ni-plus";
import NiPrinter from "@/icons/nexture/ni-printer";
import NiShare from "@/icons/nexture/ni-share";

const actions = [
  { icon: <NiDuplicate />, name: "Copy" },
  { icon: <NiFloppyDisk />, name: "Save" },
  { icon: <NiPrinter />, name: "Print" },
  { icon: <NiShare />, name: "Share" },
];

export default function SpeedDialBasic() {
  return (
    <Box className="h-60 grow translate-z-0 transform">
      <SpeedDial className="absolute" direction="down" ariaLabel="SpeedDial" icon={<NiPlus size="large" />}>
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            slotProps={{ tooltip: { placement: "right", title: action.name } }}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
