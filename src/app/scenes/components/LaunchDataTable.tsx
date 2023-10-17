"use client";
import * as React from "react";
import type { Launch } from "@/app/data/types";
import type { Order } from "../utils/dataTableUtils";
import { getComparator, stableSort } from "../utils/dataTableUtils";
import { DetailedLaunchData } from "./DetailedLaunchModal";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";

interface HeadCell {
  id: keyof Launch;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "mission_name",
    numeric: false,
    label: "Mission Name",
  },
  {
    id: "rocket_name",
    numeric: true,
    label: "Rocket",
  },
  {
    id: "launch_date_utc",
    numeric: true,
    label: "Date",
  },
];

interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Launch
  ) => void;
  order: Order;
  orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof Launch) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface LaunchDataTableProps {
  launches: Launch[];
}

export const LaunchDataTable = ({ launches = [] }: LaunchDataTableProps) => {
  const [open, setOpen] = React.useState(false);
  const [metadata, setMetadata] = React.useState({});
  const [order, setOrder] = React.useState<Order>("desc");
  const [orderBy, setOrderBy] = React.useState<keyof Launch>("launch_date_utc");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Launch
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleClick = (metadata: Partial<Launch>) => {
    setOpen(true);
    setMetadata(metadata);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - launches!.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(launches, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, launches]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {visibleRows.map((row, _index) => {
                return (
                  <TableRow
                    hover
                    onClick={() =>
                      handleClick({
                        mission_name: row.mission_name,
                        details: row.details,
                        launchpad: row.launchpad,
                        rocket_name: row.rocket_name,
                        rocket_id: row.rocket_id,
                        launch_date_utc: row.launch_date_utc,
                      })
                    }
                    tabIndex={-1}
                    key={row.mission_name}
                  >
                    <TableCell>{row.mission_name}</TableCell>
                    <TableCell align="right">{row.rocket_name}</TableCell>
                    <TableCell align="right">
                      {new Date(row.launch_date_utc).toUTCString()}
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={launches!.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <DetailedLaunchData open={open} setOpen={setOpen} metadata={metadata} />
    </Box>
  );
};
