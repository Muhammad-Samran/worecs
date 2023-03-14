import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import { Box, Button, IconButton } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import {
  getReferences,
  addReferences,
} from "../../api/candidate/candidate.class";
import { ReactComponent as EditIcon } from "../../assets/candidates/edit.svg";
import { useState } from "react";
import UpdateReference from "../candidate_screens/profile/Modal/reference/UpdateReference";
import ReferenceModal from "../candidate_screens/profile/Modal/reference";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    width: "90px",
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "10px",
    background: "#00CFC5",
    color: "white",
  },
}));

export const CustomTable = ({ data, reference, setReference, setUpdation }) => {
  const [show, setShow] = useState(false);

  const [updateReference, setUpdateReference] = useState(false);
  const [referenceData, setReferenceData] = useState([]);
  const [referenceDataEdit, setReferenceDataEdit] = useState([]);

  return (
    <Box className={styles.parent}>
      <Box className={styles.customBox}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow
                sx={{ "& td, & th": { border: 0 } }}
                className={styles.headingBox}
              >
                <TableCell align="left">Name</TableCell>
                <TableCell align="center">Organization</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data ? (
                data?.map((row, i) => (
                  <TableRow
                    key={i}
                    sx={{ "& td, & th": { border: 0 } }}
                    className={styles.contentBox}
                  >
                    <TableCell align="left">
                      {row?.recruiter?.name
                        ? row?.recruiter?.name
                        : row?.full_name}
                    </TableCell>
                    <TableCell align="center">
                      {row?.recruiter?.company_name
                        ? row?.recruiter?.company_name
                        : row?.reference_company_name}
                    </TableCell>
                    <TableCell align="center">
                      <StyledBadge
                        badgeContent={
                          row?.candidate_response ? row?.candidate_response : ""
                        }
                      />
                    </TableCell>
                    <TableCell align="center">
                      {row?.candidate_response === "completed" ? (
                        <>
                          {" "}
                          <IconButton
                            className={styles.editicon}
                            onClick={() => {
                              setShow(true);
                              setReferenceDataEdit(row);
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="contained"
                            style={{
                              backgroundColor: "#00CFC5",
                              color: "#FFFFFF",
                              border: "none",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              setShow(true);
                              setReferenceDataEdit([]);
                              setReferenceData(row);
                            }}
                          >
                            Accept Request
                          </Button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <></>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <UpdateReference
        data={
          referenceDataEdit?.candidate_response === "completed"
            ? referenceDataEdit
            : referenceData
        }
        openModal={show}
        isUpdation={setUpdation}
        setOpenModal={setShow}
      />
      <ReferenceModal
        openModal={reference}
        isAddition={setUpdation}
        setOpenModal={setReference}
      />
    </Box>
  );
};
