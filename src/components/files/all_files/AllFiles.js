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
import { ReactComponent as Edit } from "../../../assets/candidates/edit.svg";
import { ReactComponent as Dustin } from "../../../assets/workspace/dustbin.svg";
import { ReactComponent as Eye } from "../../../assets/candidates/eye.svg";

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

const AllFiles = ({ titles, rows, interview }) => {
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
                
                  <TableCell align="center">
                  Name
                  </TableCell>
                  <TableCell align="center">
                  Categories
                  </TableCell>
                  <TableCell align="center">
                  status
                  </TableCell>
                  <TableCell align="center">
                  Action
                  </TableCell>
                
              </TableRow>
            </TableHead>
            <TableBody>
                <TableRow
                
                  sx={{ "& td, & th": { border: 0 } }}
                  className={styles.contentBox}
                >
                
                    <TableCell align="center">ABCD</TableCell>
                
                    <TableCell align="center">ABCD</TableCell>
            
                    <TableCell align="center">ABCD</TableCell>
                    <TableCell align="center">ABCD</TableCell>
            
                    <TableCell align="center"></TableCell>

      
                    <TableCell align="center">
                      <Box className={styles.actionsBox}>
                        <Edit />
                        <Dustin />
                        <Eye />
                      </Box>
                    </TableCell>
                </TableRow>
          
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default AllFiles;
