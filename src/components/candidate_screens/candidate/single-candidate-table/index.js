import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import styles from "./styles.module.scss";
import { ReactComponent as Edit } from "../../../../assets/candidates/edit.svg";
import { ReactComponent as Download } from "../../../../assets/candidates/download.svg";
import { ReactComponent as Eye } from "../../../../assets/candidates/eye.svg";
import { AiOutlinePlus } from "react-icons/ai";

// function createData(id, name, status, reff, lof, app) {
//   return { id, name, status, reff, lof };
// }

// const rows = [
//   createData(
//     "Jack Effron",
//     "+6123456781",
//     "jackeffron@gmail.com",
//     "Application Form",
//     `Not Responded Yet`
//   ),
//   createData(
//     "Jack Effron",
//     "+6123456781",
//     "jackeffron@gmail.com",
//     "Application Form",
//     `Not Responded Yet`
//   ),
//   createData(
//     "Jack Effron",
//     "+6123456781",
//     "jackeffron@gmail.com",
//     "Application Form",
//     `Not Responded Yet`
//   ),
//   createData(
//     "Jack Effron",
//     "+6123456781",
//     "jackeffron@gmail.com",
//     "Application Form",
//     `Not Responded Yet`
//   ),
// ];

const CandidateTable = ({ titles, rows, interview }) => {
  return (
    <Box className={styles.candidateTable}>
      <Box className={styles.customBox}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow
                sx={{ "& td, & th": { border: 0 } }}
                className={styles.headingBox}
              >
                {titles.map((e, i) => (
                  <TableCell align="center" key={i}>
                    {e}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, i) => (
                <TableRow
                  key={i}
                  sx={{ "& td, & th": { border: 0 } }}
                  className={styles.contentBox}
                >
                  <TableCell align="center">
                    <Box>{row.id}</Box>
                  </TableCell>
                  {row?.name && (
                    <TableCell align="center">{row?.name}</TableCell>
                  )}
                  {row?.status && (
                    <TableCell align="center">{row?.status}</TableCell>
                  )}
                  {row?.reff && (
                    <TableCell align="center">{row?.reff}</TableCell>
                  )}
                  {row?.lof && <TableCell align="center">{row?.lof}</TableCell>}

                  {!interview && (
                    <TableCell align="center">
                      <Box className={styles.actionsBox}>
                        <Edit />
                        <Eye />
                        <Download />
                      </Box>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {!interview && (
        <Box className={styles.addTabel}>
          <AiOutlinePlus />
          Add More
        </Box>
      )}
    </Box>
  );
};

export default CandidateTable;
