import { SyntheticEvent, useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useSimpleTreeViewApiRef } from "@mui/x-tree-view";
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

export default function GetItemChildren() {
  const apiRef = useSimpleTreeViewApiRef();
  const [isSelectedItemLeaf, setIsSelectedItemLeaf] = useState<boolean | null>(null);

  const handleSelectedItemsChange = (_event: SyntheticEvent | null, itemId: string | null) => {
    if (itemId == null) {
      setIsSelectedItemLeaf(null);
    } else {
      const children = apiRef.current!.getItemOrderedChildrenIds(itemId);
      setIsSelectedItemLeaf(children.length === 0);
    }
  };

  return (
    <Box className="flex flex-col gap-4">
      <Typography>
        {isSelectedItemLeaf == null && "No item selected"}
        {isSelectedItemLeaf === true && "The selected item is a leaf"}
        {isSelectedItemLeaf === false && "The selected item is a node with children"}
      </Typography>
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
          apiRef={apiRef}
          onSelectedItemsChange={handleSelectedItemsChange}
        />
      </Box>
    </Box>
  );
}
