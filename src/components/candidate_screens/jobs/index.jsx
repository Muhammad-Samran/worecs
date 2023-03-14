import React from "react";
import { Box, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CustomModal from "./custom-modal";
import ApplicationForm from "./application-form";
import styles from "./styles.module.scss";

function createData(
  jobTitle,
  organization,
  recruiter,
  status,
  application,
  letter
) {
  return { jobTitle, organization, recruiter, status, application, letter };
}

const rows = [
  createData(
    "Graphic Designer",
    "VRTECHSOL",
    "Josh.K",
    "Pending",
    "Sent",
    "Completed"
  ),
  createData(
    "Graphic Designer",
    "VRTECHSOL",
    "Josh.K",
    "Pending",
    "Sent",
    "Completed"
  ),
  createData(
    "Graphic Designer",
    "VRTECHSOL",
    "Josh.K",
    "Pending",
    "Sent",
    "Completed"
  ),
  createData(
    "Graphic Designer",
    "VRTECHSOL",
    "Josh.K",
    "Pending",
    "Sent",
    "Completed"
  ),
  createData(
    "Graphic Designer",
    "VRTECHSOL",
    "Josh.K",
    "Pending",
    "Sent",
    "Completed"
  ),
];

const Index = () => {
  return (
    <>
      <Box className={styles.parent}>
        <Typography variant="h4">Jobs</Typography>
        <Box className={styles.customBox}>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow
                  sx={{ "& td, & th": { border: 0 } }}
                  className={styles.headingBox}
                >
                  <TableCell align="left">Job</TableCell>
                  <TableCell align="center">Organization Name</TableCell>
                  <TableCell align="center">Recruiter Name</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Application form</TableCell>
                  <TableCell align="center">Letter Of Offer</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, i) => (
                  <TableRow
                    key={i}
                    sx={{ "& td, & th": { border: 0 } }}
                    className={styles.contentBox}
                  >
                    <TableCell align="left">{row.jobTitle}</TableCell>
                    <TableCell align="center">{row.organization}</TableCell>
                    <TableCell align="center">{row.recruiter}</TableCell>
                    <TableCell align="center">{row.status}</TableCell>
                    <TableCell align="center">{row.application}</TableCell>
                    <TableCell align="center">{row.letter}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
      {/* <ApplicationForm /> */}
      {/* <CustomModal /> */}
    </>
  );
};

export default Index;
