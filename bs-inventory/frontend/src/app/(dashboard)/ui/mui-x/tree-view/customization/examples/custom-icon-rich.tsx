import Box from "@mui/material/Box";
import { TreeViewDefaultItemModelProperties } from "@mui/x-tree-view";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";

import NiBookmarkSingle from "@/icons/nexture/ni-bookmark-single";
import NiMinus from "@/icons/nexture/ni-minus";
import NiPlus from "@/icons/nexture/ni-plus";

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

export default function CustomIconRich() {
  return (
    <Box className="min-w-72">
      <RichTreeView
        defaultExpandedItems={["grid"]}
        slots={{
          expandIcon: NiPlus,
          collapseIcon: NiMinus,
          endIcon: (props) => {
            return <NiBookmarkSingle {...props} className="text-text-secondary" />;
          },
        }}
        items={MUI_X_PRODUCTS}
      />
    </Box>
  );
}
