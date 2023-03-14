import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
} from "@mui/material";
import styles from "./styles.module.scss";
import { ReactComponent as Edit } from "../../../assets/candidates/edit.svg";
import { ReactComponent as Dustin } from "../../../assets/workspace/dustbin.svg";
import { ReactComponent as Eye } from "../../../assets/candidates/eye.svg";
import { ReactComponent as Archive } from "../../../assets/candidates/archive.svg";
import { Link, useNavigate } from "react-router-dom";
import DeleteForm from "../modal/DeleteForm";
import Switch from "@mui/material/Switch";
import {
  getDeactivateForms,
  statusForm,
  ArchivedForms,
} from "../../../api/candidate/candidate.class";
import EmailForm from "../modal/EmailForm";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import { useDispatch } from "react-redux";
import { ShowAlert } from "../../../store/actions/alertActions";

const theme = createTheme({
  components: {
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          color: "#00CFC5", // this is working
        },
        colorPrimary: {
          "&.Mui-checked": {
            // Controls checked color for the thumb
            color: "#00CFC5",
          },
        },
        track: {
          // Controls default (unchecked) color for the track
          // opacity: 0.2,
          backgroundColor: "#000000",
          ".Mui-checked.Mui-checked + &": {
            // Controls checked color for the track
            // opacity: 0.7,
            backgroundColor: "#000000",
          },
        },
      },
    },
  },
});

const CandidateTable = ({ titles, rows, interview, setUpdate, type }) => {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [emailOpen, setEmailOpen] = useState(false);
  const [data, setdata] = useState([]);
  const [deleteId, setDeleteId] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(rows);

  const handleStatus = async (status, uuid) => {
    const response = await statusForm({
      form_builder_status: status === true ? "1" : "0",
      uuid: uuid,
    });
    // console.log(response);
    if (response.data.success) {
      dispatch(ShowAlert(response?.data?.message, "success"));
      setUpdate((old) => old + 1);
    }
  };

  const setArchived = async (uuid, archive) => {
    try {
      const response = await ArchivedForms({
        uuid: uuid,
        is_archived: archive ? "0" : "1",
      });
      console.log(response);
      if (response.data.success) {
        dispatch(ShowAlert(response?.data?.message, "success"));
        setUpdate((old) => old + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
                  <TableCell key={i} align={e == "Resend Form" ? "center" : ""}>
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
                  <TableCell>
                    {type === "submission"
                      ? row?.form_builder?.name
                      : row?.name}
                  </TableCell>

                  <TableCell>
                    {type === "submission"
                      ? row?.form_builder?.form_builder_category?.name
                      : row?.form_builder_category?.name}
                  </TableCell>

                  {type === "submission" ? (
                    <>
                      <TableCell>{row?.created_at}</TableCell>
                      <TableCell>{row?.time}</TableCell>
                    </>
                  ) : (
                    <></>
                  )}

                  {type === "All Forms" || type === "deactive" ? (
                    <TableCell>
                      <ThemeProvider theme={theme}>
                        <Switch
                          classes={{
                            switchBase: theme.switchBase,
                            track: theme.track,
                          }}
                          checked={row?.form_builder_status}
                          size="small"
                          label={
                            row?.form_builder_status ? "Active" : "Disabled"
                          }
                          onChange={(e) =>
                            handleStatus(e.target.checked, row?.uuid)
                          }
                        />
                      </ThemeProvider>
                    </TableCell>
                  ) : (
                    <></>
                  )}

                  {type === "All Forms" ? (
                    <TableCell align="center">
                      <Typography
                        style={{
                          cursor: "pointer",
                          color: "#00CFC5",
                          fontFamily: "poppins-semi-bold",
                          fontStyle: "normal",
                          fontSize: "12px",
                          lineHeight: "24px",
                        }}
                        onClick={() => {
                          setEmailOpen(true);
                          setdata(row);
                        }}
                      >
                        Resend
                      </Typography>
                    </TableCell>
                  ) : (
                    <></>
                  )}

                  {!interview && (
                    <TableCell>
                      <Box className={styles.actionsBox}>
                        <Tooltip title="Edit" className="">
                          <Edit
                            onClick={() =>
                              navigate(`/dashboard/create-new-form`, {
                                state: {
                                  data:
                                    type === "submission"
                                      ? row?.form_builder?.form_builder_json
                                      : row?.form_builder_json,
                                  uuid: row?.uuid,
                                  isDraft: row?.isDraft,
                                },
                              })
                            }
                          />
                        </Tooltip>
                        <Tooltip title="Delete" className="">
                          <Dustin
                            onClick={() => {
                              setDeleteOpen(true);
                              setDeleteId(row?.uuid);
                            }}
                          />
                        </Tooltip>

                        <Tooltip title="View" className="">
                          <Eye
                            onClick={() =>
                              navigate(`/dashboard/form/view/${row?.uuid}`, {
                                state: {
                                  data:
                                    type === "submission"
                                      ? row?.form_builder?.form_builder_json
                                      : row?.form_builder_json,
                                  type: type === "submission" ? type : "",
                                  uuid:
                                    type === "submission" ? row?.uuid : null,
                                },
                              })
                            }
                          />
                        </Tooltip>
                        {type === "archive" || type === "All Forms" ? (
                          <Tooltip title="Archive" className="">
                            <Archive
                              onClick={() => {
                                setArchived(row?.uuid, row?.is_archived);
                              }}
                            />
                          </Tooltip>
                        ) : (
                          <></>
                        )}
                      </Box>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <DeleteForm
        openModal={deleteOpen}
        setOpenModal={setDeleteOpen}
        deleteId={deleteId}
        setDeletion={setUpdate}
        type={type}
      />
      <EmailForm
        openModal={emailOpen}
        setOpenModal={setEmailOpen}
        data={data}
        setUpdate={setUpdate}
      />
    </Box>
  );
};

export default CandidateTable;
