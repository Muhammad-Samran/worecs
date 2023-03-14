import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import styles from "./styles.module.scss";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";

import {
  getInterviews,
  requestInterviewStatus,
} from "../../../api/candidate/candidate.class";
import { Link } from "react-router-dom";
import moment from "moment";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    width: "90px",
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "10px",
    background: "#00CFC5",
    color: "white",
  },
}));

const Index = () => {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const tableData = async () => {
      try {
        const response = await getInterviews();
        // console.log("####", response);
        setData(response?.data?.results?.data);
      } catch (e) {
        console.log(e);
      }
    };

    tableData();
  }, [update]);

  const handleStatus = async (status, uuid) => {
    try {
      const response = await requestInterviewStatus({
        uuid: uuid,
        response: status,
      });
      if (response?.data?.success) setUpdate((old) => old + 1);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Box className={styles.parent}>
        <Typography variant="h4">Interviews</Typography>
        <Box className={styles.customBox}>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow
                  sx={{ "& td, & th": { border: 0 } }}
                  className={styles.headingBox}
                >
                  <TableCell align="left">Title</TableCell>
                  <TableCell align="center">Time</TableCell>
                  <TableCell align="center">Date</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Location</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data &&
                  data?.map(
                    (row, i) =>
                      moment(Date.now()).format("YYYY-MM-DD") >
                        moment(row?.date).format("YYYY-MM-DD") ===
                        false && (
                        <TableRow
                          key={i}
                          sx={{ "& td, & th": { border: 0 } }}
                          className={styles.contentBox}
                        >
                          <TableCell align="left">{row?.title}</TableCell>
                          <TableCell align="center">
                            {`${row?.start_time}`}
                          </TableCell>
                          <TableCell align="center">{row?.date}</TableCell>
                          <TableCell align="center">
                            <StyledBadge
                              badgeContent={row?.response ? row?.response : ""}
                            />
                          </TableCell>
                          <TableCell align="center" className={styles.link}>
                            {row?.type === "online" && row?.zoom_link ? (
                              <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={row?.zoom_link}
                                style={{
                                  color: "#00CFC5",
                                  fontFamily: "poppins-semi-bold",
                                  fontStyle: "normal",
                                  fontSize: "12px",
                                  lineHeight: "24px",
                                }}
                              >
                                Click to join meeting
                              </a>
                            ) : (
                              row?.address
                            )}
                          </TableCell>
                          {row?.response !== "accepted" && (
                            <TableCell align="center">
                              <Box className={styles.button}>
                                <Box className={`button-primary`}>
                                  <Button
                                    onClick={() =>
                                      handleStatus("accepted", row?.uuid)
                                    }
                                  >
                                    Accept
                                  </Button>
                                </Box>
                                <Box className={`button-primary`}>
                                  <Button
                                    onClick={() =>
                                      handleStatus("declined", row?.uuid)
                                    }
                                  >
                                    Decline
                                  </Button>
                                </Box>
                              </Box>
                            </TableCell>
                          )}
                        </TableRow>
                      )
                  )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
};

export default Index;
