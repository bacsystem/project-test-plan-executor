import Box from "@mui/material/Box";
import { TreeItem } from "@mui/x-tree-view";
import { useSimpleTreeViewApiRef } from "@mui/x-tree-view";
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

export default function EditingLeavesOnly() {
  const apiRef = useSimpleTreeViewApiRef();
  return (
    <Box className="min-w-72">
      <RichTreeView
        apiRef={apiRef}
        items={MUI_X_PRODUCTS}
        defaultExpandedItems={["grid", "pickers"]}
        isItemEditable={(item) => apiRef.current!.getItemOrderedChildrenIds(item.id).length === 0}
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
  );
}
