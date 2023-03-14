import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Box, IconButton } from "@mui/material";
import { ReactComponent as EditIcon } from "../../../assets/candidates/edit.svg";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { ReactComponent as BinIcon } from "../../../assets/candidates/bin.svg";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import {
  getReferences,
  addReferences,
} from "../../../api/candidate/candidate.class";
import ReferenceModal from "./Modal/reference";
import UpdateReference from "./Modal/reference/UpdateReference";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    width: "90px",
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "10px",
    background: "#00CFC5",
    color: "white",
  },
}));

export const CustomTable = ({ reference, setReference }) => {
  const [updation, setUpdation] = useState(false);

  const [updateReference, setUpdateReference] = useState(false);

  const [referenceData, setReferenceData] = useState([]);
  const [referenceDataEdit, setReferenceDataEdit] = useState([]);

  useEffect(() => {
    const tableData = async () => {
      try {
        const response = await getReferences();
        // console.log("!!!!!!!!!!", response?.data?.results?.data);
        setReferenceData(response?.data?.results?.data);
      } catch (e) {
        console.log(e);
      }
    };

    tableData();
  }, [updation]);

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
                {/* <TableCell align="center">Job Title</TableCell> */}
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {referenceData?.map((row, i) =>
                row?.full_name && row?.email ? (
                  <TableRow
                    key={i}
                    sx={{ "& td, & th": { border: 0 } }}
                    className={styles.contentBox}
                  >
                    <TableCell align="left">{row.full_name}</TableCell>
                    <TableCell align="center">
                      {row.reference_company_name}
                    </TableCell>
                    <TableCell align="center">
                      {" "}
                      <StyledBadge
                        badgeContent={row.response ? row.response : ""}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        className={styles.editicon}
                        onClick={() => {
                          setUpdateReference(true);
                          setReferenceDataEdit(row);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ) : (
                  <></>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <ReferenceModal
        openModal={reference}
        isAddition={setUpdation}
        setOpenModal={setReference}
      />
      <UpdateReference
        openModal={updateReference}
        isUpdation={setUpdation}
        setOpenModal={setUpdateReference}
        data={referenceDataEdit}
      />
    </Box>
  );
};
