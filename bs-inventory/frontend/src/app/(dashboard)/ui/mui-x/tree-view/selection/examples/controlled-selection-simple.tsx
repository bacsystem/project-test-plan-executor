import * as React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";

import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";
import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";

export default function ControlledSelectionSimple() {
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);

  const handleSelectedItemsChange = (event: React.SyntheticEvent<Element, Event> | null, itemIds: string[]) => {
    setSelectedItems(itemIds);
  };

  const handleSelectClick = () => {
    setSelectedItems((oldSelected) =>
      oldSelected.length === 0
        ? [
            "grid",
            "grid-community",
            "grid-pro",
            "grid-premium",
            "pickers",
            "pickers-community",
            "pickers-pro",
            "charts",
            "charts-community",
            "tree-view",
            "tree-view-community",
          ]
        : [],
    );
  };

  return (
    <Box className="flex flex-col gap-4">
      <Box>
        <Button variant="outlined" color="primary" onClick={handleSelectClick}>
          {selectedItems.length === 0 ? "Select all" : "Unselect all"}
        </Button>
      </Box>
      <Box className="min-w-72">
        <SimpleTreeView
          slots={{
            collapseIcon: () => {
              return <NiChevronDownSmall size={"small"}></NiChevronDownSmall>;
            },
            expandIcon: () => {
              return <NiChevronRightSmall size={"small"}></NiChevronRightSmall>;
            },
          }}
          selectedItems={selectedItems}
          onSelectedItemsChange={handleSelectedItemsChange}
          multiSelect
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
    </Box>
  );
}
