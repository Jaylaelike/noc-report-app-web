"use client";
import * as React from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";

import { CSVLink } from "react-csv";
import Datepicker from "react-tailwindcss-datepicker";
import { Download } from "lucide-react";
import { DatetimeFsp } from "drizzle-orm/mysql-core/columns/datetime";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number,
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof  Data;
  label: string;
  numeric: boolean;
}


// this data
//[
// {
//     id: 1,
//     Site: "กรุงเทพ",
//     FacilityProvider: "ส.ส.ท. (ไทยพีบีเอส)",
//     EngineeringCenter: "กรุงเทพ",
//     PostingDate: "2024-08-22T07:15:29.000Z",
//     DowntimeStart: "2024-08-22T07:15:29.000Z",
//     DowntimeEnd: "2024-08-22T07:15:29.000Z",
//     DowntimeTotal: "00:00:23",
//     Detail: "เครื่องส่งโทรทัศน์ภาคพื้นดินในระบบดิจิตอล ชุด Main และ Backup ของสถานีกรุงเทพฯ (ใบหยก2) เกิด Alarm เจ้าหน้าที่ประจำสถานีฯ ทำการ Reset Alarm ที่หน้าเครื่องส่งฯ ชุด Main และ Backup จึงสามารถออกอากาศได้ปกติ",
//     JobTickets: "NOC-NOC -201124001",
//     Reporter: "นาย อมร ศรีแก้ว",
//     Approver: "นาย สุทัย วินิจชัย",
//     Remark: "",
//     createdAt: "2024-08-22T07:17:25.000Z",
//     updatedAt: "2024-08-22T14:15:39.000Z"
//     }
//]
interface Data {
    id: number;
    Site: string;
    FacilityProvider: string;
    EngineeringCenter: string;
    PostingDate: DatetimeFsp;
    DowntimeStart: DatetimeFsp;
    DowntimeEnd: DatetimeFsp;
    DowntimeTotal: string;
    Detail: string;
    JobTickets: string;
    Reporter: string;
    Approver: string;
    Remark: string;

}



const headCells: readonly HeadCell[] = [
  {
    id: "Site",
    numeric: false,
    disablePadding: true,
    label: "Site",
  },
  {
    id: "FacilityProvider",
    numeric: true,
    disablePadding: false,
    label: "Facility Provider",
  },
  {
    id: "EngineeringCenter",
    numeric: true,
    disablePadding: false,
    label: "Engineering Center",
  },
  {
    id: "PostingDate",
    numeric: true,
    disablePadding: false,
    label: "Posting Date",
  },
  {
    id: "DowntimeStart",
    numeric: true,
    disablePadding: false,
    label: "Downtime Start",
  },
  {
    id: "DowntimeEnd",
    numeric: true,
    disablePadding: false,
    label: "Downtime End",
  },
  {
    id: "DowntimeTotal",
    numeric: true,
    disablePadding: false,
    label: "Downtime Total",
  },
  { id: "Detail", numeric: true, disablePadding: false, label: "Detail" },
  {
    id: "JobTickets",
    numeric: true,
    disablePadding: false,
    label: "Job Tickets",
  },
  { id: "Reporter", numeric: true, disablePadding: false, label: "Reporter" },
  { id: "Approver", numeric: true, disablePadding: false, label: "Approver" },
  { id: "Remark", numeric: true, disablePadding: false, label: "Remark" },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
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

interface EnhancedTableToolbarProps {
  numSelected: number;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity,
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          ข้อมูลทั้งหมด
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

interface PropsType {
  params: {
    data: any;
  };
}
export default function DataTableAll({ data }: PropsType) {
  const [order, setOrder] = React.useState<Order>("desc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("id");
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const formattedDate = new Date().toISOString().slice(0, 10);

  const rows: Data[] = data?.data?.data || [];

  console.log(rows);
  


  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage],
  );

  return (
   
    <Box md={{ width: "100%" }}>
      <div className="p-4">
        <button className="btn btn-accent justify-self-end">
          <Download />
          <CSVLink data={""} filename={`downtime_${formattedDate}.csv`}>
            ส่งออกข้อมูล Excel
          </CSVLink>
        </button>
      </div>

      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                    style={{
                        wordBreak: "break-all",
                        wordWrap: "break-word",
                        height: "auto",
                        textWrap: "wrap",
                        scrollPadding: "auto",
                      }}
                    
                   
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.Site}
                    </TableCell >
                    <TableCell align="right">{row.FacilityProvider}</TableCell>
                    <TableCell align="right">{row.EngineeringCenter}</TableCell>
                    <TableCell align="right">{row.PostingDate}</TableCell>
                    <TableCell align="right">{row.DowntimeStart}</TableCell>
                    <TableCell align="right">{row.DowntimeEnd}</TableCell>
                    <TableCell align="right">{row.DowntimeTotal}</TableCell>    
                    <TableCell align="right"
                    
                    >{row.Detail}</TableCell>
                    <TableCell align="right">{row.JobTickets}</TableCell>
                    <TableCell align="right">{row.Reporter}</TableCell>
                    <TableCell align="right">{row.Approver}</TableCell>
                    <TableCell align="right">{row.Remark}</TableCell>


                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                    wordWrap: "break-word",
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50,100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  
  );
}
