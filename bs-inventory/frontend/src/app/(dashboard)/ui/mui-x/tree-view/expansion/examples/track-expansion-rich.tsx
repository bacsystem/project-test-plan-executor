import { SyntheticEvent, useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { TreeViewDefaultItemModelProperties } from "@mui/x-tree-view";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";

import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";
import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";

const MUI_X_PRODUCTS: TreeViewDefaultItemModelProperties[] = [
  {
    id: "grid",
    label: "Data Grid",
    children: [
      { id: "grid-community", label: "@mui/x-data-grid" },
      { id: "grid-pro", label: "@mui/x-data-grid-pro" },
      { id: "grid-premium", label: "@mui/x-data-grid-premium" },
    ],
  },
  {
    id: "pickers",
    label: "Date and Time Pickers",
    children: [
      { id: "pickers-community", label: "@mui/x-date-pickers" },
      { id: "pickers-pro", label: "@mui/x-date-pickers-pro" },
    ],
  },
  {
    id: "charts",
    label: "Charts",
    children: [{ id: "charts-community", label: "@mui/x-charts" }],
  },
  {
    id: "tree-view",
    label: "Tree View",
    children: [{ id: "tree-view-community", label: "@mui/x-tree-view" }],
  },
];

export default function TrackItemExpansionRich() {
  const [action, setAction] = useState<{
    itemId: string;
    isExpanded: boolean;
  } | null>(null);

  const handleItemExpansionToggle = (
    _event: SyntheticEvent<Element, Event> | null,
    itemId: string,
    isExpanded: boolean,
  ) => {
    setAction({ itemId, isExpanded });
  };

  return (
    <Box className="flex flex-col gap-4">
      {action == null ? (
        <Typography>No action recorded</Typography>
      ) : (
        <Typography>
          Last action: {action.isExpanded ? "expand" : "collapse"} {action.itemId}
        </Typography>
      )}
      <Box className="min-w-72">
        <RichTreeView
          slots={{
            collapseIcon: () => {
              return <NiChevronDownSmall size={"small"}></NiChevronDownSmall>;
            },
            expandIcon: () => {
              return <NiChevronRightSmall size={"small"}></NiChevronRightSmall>;
            },
          }}
          items={MUI_X_PRODUCTS}
          onItemExpansionToggle={handleItemExpansionToggle}
        />
      </Box>
    </Box>
  );
}
