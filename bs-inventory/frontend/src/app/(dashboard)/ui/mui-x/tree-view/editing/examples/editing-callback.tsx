import { useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { TreeItem } from "@mui/x-tree-view";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";

import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";
import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";

type ExtendedTreeItemProps = {
  editable?: boolean;
  id: string;
  label: string;
  children?: ExtendedTreeItemProps[];
};

const MUI_X_PRODUCTS: ExtendedTreeItemProps[] = [
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

export default function EditingCallback() {
  const [lastEditedItem, setLastEditedItem] = useState<{
    itemId: string;
    label: string;
  } | null>(null);

  return (
    <Box className="flex flex-col gap-4">
      {lastEditedItem ? (
        <Typography>
          The label of item with id <em>{lastEditedItem!.itemId}</em> has been edited to{" "}
          <em>{lastEditedItem!.label}</em>
        </Typography>
      ) : (
        <Typography>No item has been edited yet</Typography>
      )}
      <Box className="min-w-72">
        <RichTreeView
          items={MUI_X_PRODUCTS}
          isItemEditable
          defaultExpandedItems={["grid", "pickers"]}
          onItemLabelChange={(itemId, label) => setLastEditedItem({ itemId, label })}
          slots={{
            collapseIcon: () => {
              return <NiChevronDownSmall size={"small"}></NiChevronDownSmall>;
            },
            expandIcon: () => {
              return <NiChevronRightSmall size={"small"}></NiChevronRightSmall>;
            },
            item: TreeItem,
          }}
        />
      </Box>
    </Box>
  );
}
