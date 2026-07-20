import { SyntheticEvent, useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { TreeViewDefaultItemModelProperties } from "@mui/x-tree-view";
import { TreeViewItemId } from "@mui/x-tree-view/models";
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

const getAllItemsWithChildrenItemIds = () => {
  const itemIds: TreeViewItemId[] = [];
  const registerItemId = (item: TreeViewDefaultItemModelProperties) => {
    if (item.children?.length) {
      itemIds.push(item.id);
      item.children.forEach(registerItemId);
    }
  };

  MUI_X_PRODUCTS.forEach(registerItemId);

  return itemIds;
};

export default function ControlledExpansionRich() {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const handleExpandedItemsChange = (_event: SyntheticEvent<Element, Event> | null, itemIds: string[]) => {
    setExpandedItems(itemIds);
  };

  const handleExpandClick = () => {
    setExpandedItems((oldExpanded) => (oldExpanded.length === 0 ? getAllItemsWithChildrenItemIds() : []));
  };

  return (
    <Box className="flex flex-col gap-4">
      <Box>
        <Button variant="outlined" color="primary" onClick={handleExpandClick}>
          {expandedItems.length === 0 ? "Expand all" : "Collapse all"}
        </Button>
      </Box>
      <Box className="min-w-72">
        <RichTreeView
          items={MUI_X_PRODUCTS}
          expandedItems={expandedItems}
          onExpandedItemsChange={handleExpandedItemsChange}
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
