import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { Table, Button } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import styles from "./styles.module.scss";
import { getFormRequest } from "../../../api/candidate/candidate.class";
import { Link, useNavigate } from "react-router-dom";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";

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
  const [formData, setFormData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const tableData = async () => {
      try {
        const response = await getFormRequest();
        // console.log(response?.data?.results?.data);
        setFormData(response?.data?.results?.data);
      } catch (e) {
        console.log(e);
      }
    };

    tableData();
  }, []);
  return (
    <>
      <Box className={styles.parent}>
        <Typography variant="h4">Request Forms</Typography>
        <Box className={styles.customBox}>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow
                  sx={{ "& td, & th": { border: 0 } }}
                  className={styles.headingBox}
                >
                  <TableCell align="left">Form Title</TableCell>
                  <TableCell align="center">Category Name</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {formData?.map((row, i) =>
                  row?.response !== "completed" && row?.form_builder ? (
                    <TableRow
                      key={i}
                      sx={{ "& td, & th": { border: 0 } }}
                      className={styles.contentBox}
                    >
                      <TableCell align="left">
                        {row?.form_builder?.name}
                      </TableCell>
                      <TableCell align="center">
                        {row?.form_builder?.form_builder_category?.name}
                      </TableCell>
                      <TableCell align="center">
                        {" "}
                        <StyledBadge
                          badgeContent={row?.response ? row?.response : ""}
                        />
                      </TableCell>
                      <TableCell align="center" className={styles.link}>
                        {row?.response !== "completed" ? (
                          <Button
                            variant="contained"
                            style={{
                              backgroundColor: "#00CFC5",
                              color: "#FFFFFF",
                              border: "none",
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              navigate(`/dashboard/form/view/${row?.uuid}`, {
                                state: {
                                  data: row?.form_builder?.form_builder_json,
                                  uuid: row?.form_builder?.uuid,
                                  type: "candidate",
                                  row: row,
                                },
                              })
                            }
                          >
                            Accept
                          </Button>
                        ) : (
                          <></>
                        )}
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
      </Box>
    </>
  );
};

export default Index;
