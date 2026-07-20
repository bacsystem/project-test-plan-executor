import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useSimpleTreeViewApiRef } from "@mui/x-tree-view";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";

import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";
import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";

export default function SetExpansionSimple() {
  const apiRef = useSimpleTreeViewApiRef();

  const handleExpandClick = (event: React.MouseEvent) => {
    apiRef.current!.setItemExpansion({
      event,
      itemId: "grid",
      shouldBeExpanded: true,
    });
  };

  const handleCollapseClick = (event: React.MouseEvent) => {
    apiRef.current!.setItemExpansion({
      event,
      itemId: "grid",
      shouldBeExpanded: false,
    });
  };

  return (
    <Box className="flex flex-col gap-4">
      <Box className="flex flex-row gap-2">
        <Button variant="outlined" color="primary" onClick={handleExpandClick}>
          Expand Data Grid
        </Button>
        <Button variant="outlined" color="primary" onClick={handleCollapseClick}>
          Collapse Data Grid
        </Button>
      </Box>
      <Box className="min-w-72">
        <SimpleTreeView
          apiRef={apiRef}
          slots={{
            collapseIcon: () => {
              return <NiChevronDownSmall size={"small"}></NiChevronDownSmall>;
            },
            expandIcon: () => {
              return <NiChevronRightSmall size={"small"}></NiChevronRightSmall>;
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
    </Box>
  );
}
