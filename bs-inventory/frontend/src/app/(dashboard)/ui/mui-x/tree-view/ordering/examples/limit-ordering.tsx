import Box from "@mui/material/Box";
import { useSimpleTreeViewApiRef } from "@mui/x-tree-view";
import { TreeViewDefaultItemModelProperties } from "@mui/x-tree-view";
import { RichTreeViewPro } from "@mui/x-tree-view-pro/RichTreeViewPro";

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

export default function LimitOrdering() {
  const apiRef = useSimpleTreeViewApiRef();

  return (
    <Box className="min-w-72">
      <RichTreeViewPro
        items={MUI_X_PRODUCTS}
        itemsReordering
        defaultExpandedItems={["grid", "pickers"]}
        apiRef={apiRef}
        isItemReorderable={(itemId) => apiRef.current!.getItemOrderedChildrenIds(itemId).length === 0}
        slots={{
          collapseIcon: () => {
            return <NiChevronDownSmall size={"small"}></NiChevronDownSmall>;
          },
          expandIcon: () => {
            return <NiChevronRightSmall size={"small"}></NiChevronRightSmall>;
          },
        }}
      />
    </Box>
  );
}
