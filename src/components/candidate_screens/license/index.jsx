import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import styles from "./styles.module.scss";
import {
  getLicense,
  getLicenseShow,
} from "../../../api/candidate/candidate.class";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import UpdateLicense from "../profile/Modal/licenses/UpdateLicense";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    width: "90px",
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "10px",
    background: "#00CFC5",
    color: "white",
  },
}));

const LicenseCandidate = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [updation, setUpdation] = useState(false);
  const [userDetailData, setUserDetailData] = useState([]);
  const [dataRow, setDataRow] = useState();

  useEffect(() => {
    const API = async () => {
      try {
        const respone = await getLicenseShow();
        setUserDetailData(respone?.data?.results);
      } catch (error) {
        console.log(error);
      }
    };
    API();
  }, [updation]);

  useEffect(() => {
    const API = async () => {
      try {
        const response = await getLicense().then(function (res) {
          return res.data.results;
        });
        // console.log("response", response.data);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    API();
  }, [updation]);

  return (
    <>
      <Box className={styles.parent}>
        <Typography variant="h4">Certificates and Licenses</Typography>
        <Box className={styles.customBox}>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow
                  sx={{ "& td, & th": { border: 0 } }}
                  className={styles.headingBox}
                >
                  <TableCell align="left">Industry License</TableCell>
                  <TableCell align="center">Recruiter Industry</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.map((row, i) => (
                  <TableRow
                    key={i}
                    sx={{ "& td, & th": { border: 0 } }}
                    className={styles.contentBox}
                  >
                    <TableCell align="left">
                      {row?.industry_certification_license?.name}
                    </TableCell>
                    <TableCell align="center">
                      {row?.recruiter_industry?.name}
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
                        <Button
                          disabled={true}
                          variant="contained"
                          style={{
                            backgroundColor: "#00CFC5",
                            color: "#FFFFFF",
                            border: "none",
                          }}
                          onClick={() => {
                            setShow(true);
                            setDataRow(row);
                          }}
                        >
                          Accepted
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          style={{
                            backgroundColor: "#00CFC5",
                            color: "#FFFFFF",
                            border: "none",
                          }}
                          onClick={() => {
                            setShow(true);
                            setDataRow(row);
                          }}
                        >
                          Accept
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        {dataRow && (
          <UpdateLicense
            openModal={show}
            setOpenModal={setShow}
            // data={userDetailData}
            type={"request"}
            data={dataRow}
            setUpdation={setUpdation}
          />
        )}
      </Box>
    </>
  );
};

export default LicenseCandidate;
