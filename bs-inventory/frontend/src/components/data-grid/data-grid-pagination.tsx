import { PaginationItem, TablePagination, TablePaginationProps } from "@mui/material";
import MuiPagination from "@mui/material/Pagination";
import {
  gridPageCountSelector,
  gridPaginationModelSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";

import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";
import NiChevronLeftSmall from "@/icons/nexture/ni-chevron-left-small";
import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";
import { cn } from "@/lib/utils";

function Pagination({
  page,
  onPageChange,
  className,
}: Pick<TablePaginationProps, "page" | "onPageChange" | "className">) {
  const apiRef = useGridApiContext();
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <MuiPagination
      variant="text"
      size="small"
      className={className}
      count={pageCount as number}
      page={page + 1}
      onChange={(event, newPage) => {
        onPageChange(event as never, newPage - 1);
      }}
      renderItem={(item) => (
        <PaginationItem
          slots={{
            previous: () => {
              return <NiChevronLeftSmall size="small" />;
            },
            next: () => {
              return <NiChevronRightSmall size="small" />;
            },
          }}
          {...item}
        />
      )}
    />
  );
}

export default function DataGridPagination(props: any) {
  return (
    <TablePagination
      {...props}
      component="div"
      ActionsComponent={Pagination}
      slotProps={{
        displayedRows: { className: "hidden!" },
        spacer: { className: "flex-none" },
        toolbar: { className: "px-0 flex justify-end" },
        selectLabel: {
          className: "hidden!",
        },
        select: {
          IconComponent: () => {
            return (
              <NiChevronDownSmall size="medium" className="pointer-events-none absolute inset-e-1"></NiChevronDownSmall>
            );
          },
          className: "hidden!",
        },
      }}
    />
  );
}

function PaginationFullPage({
  page,
  onPageChange,
  className,
}: Pick<TablePaginationProps, "page" | "onPageChange" | "className">) {
  const apiRef = useGridApiContext();
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <MuiPagination
      variant="text"
      size="medium"
      className={className}
      count={pageCount as number}
      page={page + 1}
      onChange={(event, newPage) => {
        onPageChange(event as never, newPage - 1);
      }}
      renderItem={(item) => (
        <PaginationItem
          className="outline-grey-50 outline"
          slots={{
            previous: () => {
              return <NiChevronLeftSmall size="small" />;
            },
            next: () => {
              return <NiChevronRightSmall size="small" />;
            },
          }}
          {...item}
        />
      )}
    />
  );
}

export function DataGridPaginationFullPage(props: any) {
  const apiRef = useGridApiContext();
  const paginationModel = useGridSelector(apiRef, gridPaginationModelSelector);
  return (
    <TablePagination
      {...props}
      component="div"
      ActionsComponent={(props) => {
        return <PaginationFullPage {...props} className={cn("surface-standard")} />;
      }}
      rowsPerPage={paginationModel.pageSize}
      labelRowsPerPage="Rows"
      rowsPerPageOptions={[10, 20, 50, 100]}
      page={paginationModel.page}
      labelDisplayedRows={({ from, to, count }) => `${from}-${to} of ${count === -1 ? `more than ${to}` : count}`}
      onRowsPerPageChange={(event) => {
        const newSize = parseInt(event.target.value, 10);
        apiRef.current.setPageSize(newSize);
      }}
      slotProps={{
        spacer: { className: "flex-none" },
        toolbar: { className: "px-0 flex" },
        select: {
          IconComponent: () => {
            return (
              <NiChevronDownSmall size="medium" className="pointer-events-none absolute inset-e-1"></NiChevronDownSmall>
            );
          },
        },
      }}
    />
  );
}
