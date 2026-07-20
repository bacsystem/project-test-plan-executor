import { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
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

export default function GetItemTree() {
  const apiRef = useSimpleTreeViewApiRef();

  const [items, setItems] = useState(MUI_X_PRODUCTS);
  const [itemOnTop, setItemOnTop] = useState(items[0].label);

  const handleInvertItems = () => {
    setItems((prevItems) => [...prevItems].reverse());
  };

  const handleUpdateItemOnTop = () => {
    setItemOnTop(apiRef.current!.getItemTree()[0].label);
  };

  return (
    <Box className="flex flex-col gap-4">
      <Box className="flex flex-row gap-2">
        <Button variant="outlined" color="primary" onClick={handleInvertItems}>
          Invert first tree
        </Button>
        <Button variant="outlined" color="primary" onClick={handleUpdateItemOnTop}>
          Update item on top
        </Button>
      </Box>
      <Typography>Item on top: {itemOnTop}</Typography>
      <Box className="min-w-72">
        <RichTreeView
          apiRef={apiRef}
          items={items}
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
    </Box>
  );
}
