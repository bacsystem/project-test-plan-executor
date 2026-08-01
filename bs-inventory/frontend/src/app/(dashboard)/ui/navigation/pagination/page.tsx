"use client";

import Link from "next/link";
import React, { useState } from "react";

import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Pagination,
  PaginationItem,
  TablePagination,
  Typography,
} from "@mui/material";
import { Grid } from "@mui/material";

import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";
import NiChevronLeftSmall from "@/icons/nexture/ni-chevron-left-small";
import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";
import NiEndLeftSmall from "@/icons/nexture/ni-end-left-small";
import NiEndRightSmall from "@/icons/nexture/ni-end-right-small";

export default function Page() {
  const [page, setPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const [pageTable, setPageTable] = useState(2);
  const [rowsPerPageTable, setRowsPerPageTable] = React.useState(10);

  const handleChangePageTable = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPageTable(newPage);
  };

  const handleChangeRowsPerPageTable = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPageTable(parseInt(event.target.value, 10));
    setPageTable(0);
  };

  return (
    <Grid container spacing={5}>
      <Grid size={12} className="mb-2">
        <Typography variant="h1" component="h1" className="mb-0">
          Pagination
        </Typography>
        <Breadcrumbs>
          <Link color="inherit" href="/dashboards/default">
            Home
          </Link>
          <Link color="inherit" href="/ui">
            UI Elements
          </Link>
          <Link color="inherit" href="/ui/navigation">
            Navigation
          </Link>
          <Typography variant="body2">Pagination</Typography>
        </Breadcrumbs>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Basic
            </Typography>
            <Box className="flex flex-col gap-4">
              <Pagination
                size="small"
                count={10}
                renderItem={(item) => (
                  <PaginationItem slots={{ previous: NiChevronLeftSmall, next: NiChevronRightSmall }} {...item} />
                )}
              />
              <Pagination
                size="small"
                count={10}
                renderItem={(item) => (
                  <PaginationItem slots={{ previous: NiChevronLeftSmall, next: NiChevronRightSmall }} {...item} />
                )}
                color="primary"
              />
              <Pagination
                size="small"
                count={10}
                renderItem={(item) => (
                  <PaginationItem slots={{ previous: NiChevronLeftSmall, next: NiChevronRightSmall }} {...item} />
                )}
                color="secondary"
              />
              <Pagination
                size="small"
                color="primary"
                count={10}
                renderItem={(item) => (
                  <PaginationItem slots={{ previous: NiChevronLeftSmall, next: NiChevronRightSmall }} {...item} />
                )}
                disabled
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Outlined
            </Typography>
            <Box className="flex flex-col gap-4">
              <Pagination
                variant="outlined"
                size="small"
                count={10}
                renderItem={(item) => (
                  <PaginationItem slots={{ previous: NiChevronLeftSmall, next: NiChevronRightSmall }} {...item} />
                )}
              />
              <Pagination
                variant="outlined"
                size="small"
                count={10}
                renderItem={(item) => (
                  <PaginationItem slots={{ previous: NiChevronLeftSmall, next: NiChevronRightSmall }} {...item} />
                )}
                color="primary"
              />
              <Pagination
                variant="outlined"
                size="small"
                count={10}
                renderItem={(item) => (
                  <PaginationItem slots={{ previous: NiChevronLeftSmall, next: NiChevronRightSmall }} {...item} />
                )}
                color="secondary"
              />
              <Pagination
                variant="outlined"
                color="primary"
                size="small"
                count={10}
                renderItem={(item) => (
                  <PaginationItem slots={{ previous: NiChevronLeftSmall, next: NiChevronRightSmall }} {...item} />
                )}
                disabled
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Rounded
            </Typography>
            <Box className="flex flex-col gap-4">
              <Pagination
                shape="rounded"
                size="small"
                count={10}
                renderItem={(item) => (
                  <PaginationItem slots={{ previous: NiChevronLeftSmall, next: NiChevronRightSmall }} {...item} />
                )}
                color="primary"
              />
              <Pagination
                shape="rounded"
                variant="outlined"
                size="small"
                count={10}
                renderItem={(item) => (
                  <PaginationItem slots={{ previous: NiChevronLeftSmall, next: NiChevronRightSmall }} {...item} />
                )}
                color="primary"
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Sizes
            </Typography>
            <Box className="flex flex-col gap-4">
              <Pagination
                size="small"
                count={10}
                renderItem={(item) => (
                  <PaginationItem slots={{ previous: NiChevronLeftSmall, next: NiChevronRightSmall }} {...item} />
                )}
                color="primary"
              />
              <Pagination
                size="medium"
                count={10}
                renderItem={(item) => (
                  <PaginationItem slots={{ previous: NiChevronLeftSmall, next: NiChevronRightSmall }} {...item} />
                )}
                color="primary"
              />
              <Pagination
                size="large"
                count={10}
                renderItem={(item) => (
                  <PaginationItem slots={{ previous: NiChevronLeftSmall, next: NiChevronRightSmall }} {...item} />
                )}
                color="primary"
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Buttons
            </Typography>
            <Box className="flex flex-col gap-4">
              <Pagination
                showFirstButton
                showLastButton
                size="small"
                count={10}
                renderItem={(item) => (
                  <PaginationItem
                    slots={{
                      previous: NiChevronLeftSmall,
                      next: NiChevronRightSmall,
                      first: NiEndLeftSmall,
                      last: NiEndRightSmall,
                    }}
                    {...item}
                  />
                )}
                color="primary"
              />

              <Pagination
                hidePrevButton
                hideNextButton
                size="small"
                count={10}
                renderItem={(item) => (
                  <PaginationItem
                    slots={{
                      previous: NiChevronLeftSmall,
                      next: NiChevronRightSmall,
                      first: NiEndLeftSmall,
                      last: NiEndRightSmall,
                    }}
                    {...item}
                  />
                )}
                color="primary"
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Ranges
            </Typography>
            <Box className="flex flex-col gap-4">
              <Pagination
                size="small"
                count={11}
                defaultPage={6}
                siblingCount={0}
                renderItem={(item) => (
                  <PaginationItem slots={{ previous: NiChevronLeftSmall, next: NiChevronRightSmall }} {...item} />
                )}
                color="primary"
              />
              <Pagination
                size="small"
                count={11}
                defaultPage={6}
                renderItem={(item) => (
                  <PaginationItem slots={{ previous: NiChevronLeftSmall, next: NiChevronRightSmall }} {...item} />
                )}
                color="primary"
              />
              <Pagination
                size="small"
                count={11}
                defaultPage={6}
                siblingCount={0}
                boundaryCount={2}
                renderItem={(item) => (
                  <PaginationItem slots={{ previous: NiChevronLeftSmall, next: NiChevronRightSmall }} {...item} />
                )}
                color="primary"
              />
              <Pagination
                size="small"
                count={11}
                defaultPage={6}
                boundaryCount={2}
                renderItem={(item) => (
                  <PaginationItem slots={{ previous: NiChevronLeftSmall, next: NiChevronRightSmall }} {...item} />
                )}
                color="primary"
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Controlled
            </Typography>
            <Box className="flex flex-col gap-4">
              <Typography>Page: {page}</Typography>
              <Pagination
                size="small"
                count={10}
                page={page}
                onChange={handleChange}
                renderItem={(item) => (
                  <PaginationItem slots={{ previous: NiChevronLeftSmall, next: NiChevronRightSmall }} {...item} />
                )}
                color="primary"
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Table Pagination
            </Typography>
            <Box className="flex flex-col gap-4">
              <TablePagination
                slotProps={{
                  spacer: { className: "flex-none" },
                  toolbar: { className: "px-0" },
                  select: {
                    IconComponent: () => {
                      return (
                        <NiChevronDownSmall
                          size="medium"
                          className="pointer-events-none absolute inset-e-1"
                        ></NiChevronDownSmall>
                      );
                    },
                  },
                }}
                slots={{
                  actions: {
                    nextButton: () => {
                      return (
                        <Button
                          className="icon-only hover:bg-primary/10 hover:text-primary"
                          size="medium"
                          color="text-primary"
                          variant="text"
                          startIcon={<NiChevronRightSmall size={"medium"} />}
                        />
                      );
                    },
                    previousButton: () => {
                      return (
                        <Button
                          className="icon-only hover:bg-primary/10 hover:text-primary"
                          size="medium"
                          color="text-primary"
                          variant="text"
                          startIcon={<NiChevronLeftSmall size={"medium"} />}
                        />
                      );
                    },
                  },
                }}
                component="div"
                count={100}
                page={pageTable}
                onPageChange={handleChangePageTable}
                rowsPerPage={rowsPerPageTable}
                onRowsPerPageChange={handleChangeRowsPerPageTable}
                className="center"
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
