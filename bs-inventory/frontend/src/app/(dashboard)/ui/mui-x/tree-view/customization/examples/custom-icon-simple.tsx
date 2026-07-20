import * as React from "react";

import Box from "@mui/material/Box";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";

import NiBookmarkSingle from "@/icons/nexture/ni-bookmark-single";
import NiMinus from "@/icons/nexture/ni-minus";
import NiPlus from "@/icons/nexture/ni-plus";

export default function CustomIconSimple() {
  return (
    <Box className="min-w-72">
      <SimpleTreeView
        defaultExpandedItems={["grid"]}
        slots={{
          expandIcon: NiPlus,
          collapseIcon: NiMinus,
          endIcon: (props) => {
            return <NiBookmarkSingle {...props} className="text-text-secondary" />;
          },
        }}
      >
        <TreeItem itemId="grid" label="Data Grid">
          <TreeItem itemId="grid-community" label="@mui/x-data-grid" />
          <TreeItem itemId="grid-pro" label="@mui/x-data-grid-pro" />
          <TreeItem itemId="grid-premium" label="@mui/x-data-grid-premium" />
        </TreeItem>
        <TreeItem itemId="pickers" label="Date and Time Pickers">
          <TreeItem itemId="pickers-community" label="@mui/x-date-pickers" />
          <TreeItem itemId="pickers-pro" label="@mui/x-date-pickers-pro" />
        </TreeItem>
        <TreeItem itemId="charts" label="Charts">
          <TreeItem itemId="charts-community" label="@mui/x-charts" />
        </TreeItem>
        <TreeItem itemId="tree-view" label="Tree View">
          <TreeItem itemId="tree-view-community" label="@mui/x-tree-view" />
        </TreeItem>
      </SimpleTreeView>
    </Box>
  );
}
