import { SyntheticEvent } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useRichTreeViewApiRef } from "@mui/x-tree-view";
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

export default function FocusScrollRich() {
  const apiRef = useRichTreeViewApiRef();
  const handleScrollToChartsCommunity = (event: SyntheticEvent) => {
    apiRef.current!.focusItem(event, "charts-community");
    apiRef.current!.getItemDOMElement("charts-community")?.scrollIntoView({ block: "nearest" });
  };

  return (
    <Box className="flex flex-col gap-4">
      <Box>
        <Button variant="outlined" color="primary" onClick={handleScrollToChartsCommunity}>
          Focus and scroll to charts community item
        </Button>
      </Box>
      <Box className="h-60 min-w-72 overflow-y-scroll">
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
          apiRef={apiRef}
          defaultExpandedItems={["grid", "pickers", "charts", "tree-view"]}
        />
      </Box>
    </Box>
  );
}
