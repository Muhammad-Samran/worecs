import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { AiOutlineSetting } from "react-icons/ai";
import styles from "./styles.module.scss";
import { Box } from "@mui/system";
import { TablePagination } from "@mui/material";

export default function BasicTable({ activities }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <Box className={styles.customBox}>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow
              sx={{ "& td, & th": { border: 0 } }}
              className={styles.headingBox}
            >
              <TableCell align="center">Activity</TableCell>
              <TableCell align="center">Time</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">IP Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activities
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((row, i) => (
                <TableRow
                  key={i}
                  sx={{ "& td, & th": { border: 0 } }}
                  className={styles.contentBox}
                >
                  <TableCell align="center">{row?.page_title}</TableCell>
                  <TableCell align="center">{row?.time}</TableCell>
                  <TableCell align="center">{row?.created_at}</TableCell>
                  <TableCell align="center">{row?.ip}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {activities?.length > 5 && (
        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={activities?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Box>
  );
}
