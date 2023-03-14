import React from "react";
import {
  Box,
  CircularProgress,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
} from "@mui/material";
import styles from "./styles.module.scss";
import { ReactComponent as Edit } from "../../../assets/candidates/edit.svg";
import { ReactComponent as Download } from "../../../assets/candidates/download.svg";
import { ReactComponent as Eye } from "../../../assets/candidates/eye.svg";
import { ReactComponent as Delete } from "../../../assets/candidates/delete.svg";
import { ReactComponent as Resend } from "../../../assets/new-icons/resend.svg";

import { AiOutlinePlus } from "react-icons/ai";
import DeleteModel from "../../common/DeleteModal";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteInterviewFucntion,
  editSingleCandidateCertificate,
  editSingleCandidateInterview,
  resendSingleCandidateInterview,
  resendSingleCertificateFunc,
  resendSingleReffFunc,
  resetSingleCandidateReff,
  StatusShowSingleCertificateFunc,
  StatusShowSingleReffFunc,
} from "../../../store/actions/singleCandidateScreenActions";
// import ShowReff from "../showRefference/index";
// import CustomModel from "../single-candidate-model/index";
import { useState } from "react";
import { useEffect } from "react";
import { CgMenu } from "react-icons/cg";
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

const CandidateTable = ({ titles, rows, interview, value }) => {
  const singleCandidate = useSelector((state) => state?.singleCandidate);
  const candidate = useSelector((state) => state?.rcandidate);
  const auth = useSelector((state) => state?.auth);
  const [openReff, setOpenReff] = useState(false);
  const [openCertificate, setOpenCertificate] = useState(false);
  const candidateID = JSON.parse(localStorage.getItem("candidateID"));
  const [selectedValue, setSelectedValue] = useState("");
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [ham, setHam] = useState();
  // console.log(rows);

  // tabel
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // tabel close

  const openDelteModal = (e) => {
    setSelectedValue(e?.id);
    setDeleteOpen(true);
  };

  const deleteInterviewTable = (uuid, body2) => {
    dispatch(deleteInterviewFucntion(uuid, body2));
  };

  const dispatch = useDispatch();
  const showStatusReff = (item) => {
    dispatch(StatusShowSingleReffFunc(item?.uuid)).then(() => {
      setOpenReff(true);
    });
  };
  const editSingleCertificate = (item) => {
    dispatch(
      editSingleCandidateCertificate(item?.uuid, {
        candidate_id: candidate?.showCandidate?.results?.id || candidateID,
      })
    );
  };

  const editSingleInterView = (item) => {
    if (singleCandidate?.loading) return;
    dispatch(editSingleCandidateInterview(item?.uuid));
    setAnchorEl(null);
  };

  const showStatusCertificates = (item) => {
    dispatch(StatusShowSingleCertificateFunc(item?.uuid)).then(() => {
      setOpenCertificate(true);
    });
    setAnchorEl(null);
  };

  const resendReff = (item) => {
    dispatch(resendSingleReffFunc(item?.uuid)).then(() => {});
  };
  const resendInterVieww = (item) => {
    if (singleCandidate?.loading) return;
    dispatch(resendSingleCandidateInterview(item?.uuid));
    setAnchorEl(null);
  };
  const resendSingleCertificate = (item) => {
    dispatch(resendSingleCertificateFunc(item?.uuid)).then(() => {});
  };

  const resetFunction = () => {
    dispatch(resetSingleCandidateReff());
  };

  // table

  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleProfileMenuOpen = (event, el) => {
    setAnchorEl(event.currentTarget);
    setHam(el.id);
  };

  //
  // resendSingleReffFunc
  // statusReff
  // resendReff

  //   singleCandidateReffLoading
  //
  // singleCandidateInterviewLoading

  const RendoronValue =
    value === 3 ? (
      rows === undefined && singleCandidate.singleCandidateInterviewLoading ? (
        <div className="loader">
          <CircularProgress />
        </div>
      ) : rows === undefined &&
        !singleCandidate.singleCandidateInterviewLoading ? (
        <div>Something Went Wrong</div>
      ) : rows?.length === 0 ? (
        <div></div>
      ) : (
        rows
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          ?.map((row, i) => (
            <>
              <TableRow
                key={i}
                sx={{ "& td, & th": { border: 0 } }}
                className={styles.contentBox}
              >
                <TableCell align="center">
                  <Box>
                    <Box>{row?.title || "title"}</Box>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  {row?.start_time || "time"}
                </TableCell>
                <TableCell align="center">
                  {row?.date || "20/20/2022"}
                </TableCell>

                <TableCell align="center">
                  {row?.type === "online" ? (
                    <a
                      href={row?.zoom_link}
                      target="_blank"
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

                <TableCell align="center">
                  {row?.response || "Pending"}
                </TableCell>

                {/* <TableCell align="center">
                  <Box className={styles.actionsBox}>
                    <Tooltip title="Edit">
                      <Edit onClick={() => editSingleInterView(row)} />
                    </Tooltip>
                    {row?.response !== "completed" && (
                      <Tooltip title="Resend">
                        <Resend
                          onClick={() => resendInterVieww(row)}
                          style={{ maxWidth: "15px", maxHeight: "17px" }}
                        />
                      </Tooltip>
                    )}
                    <Tooltip title="Delete">
                      <Delete
                        style={{ maxWidht: "17px", maxHeight: "17px" }}
                        onClick={() => openDelteModal(row)}
                      />
                    </Tooltip>
                  </Box>
                </TableCell> */}
                <TableCell align="center">
                  <CgMenu
                    onClick={(e) => handleProfileMenuOpen(e, row)}
                    style={{ marginLeft: "14px" }}
                  />

                  {ham === row?.id && (
                    <Menu
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                      }}
                      // id={menuId}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                      }}
                      open={isMenuOpen}
                      onClose={handleMenuClose}
                    >
                      <MenuItem onClick={() => editSingleInterView(row)}>
                        Edit
                      </MenuItem>
                      <MenuItem onClick={() => resendInterVieww(row)}>
                        Resend
                      </MenuItem>
                      <MenuItem onClick={() => openDelteModal(row)}>
                        Delete
                      </MenuItem>
                    </Menu>
                  )}
                </TableCell>
              </TableRow>
              {selectedValue === row?.id && (
                <DeleteModel
                  deleteOpen={deleteOpen}
                  setDeleteOpen={setDeleteOpen}
                  item={row}
                  deleteName={"interview"}
                  workspaceId={auth?.results?.workspace_id}
                  candidateId={""}
                  deleteFunc={deleteInterviewTable}
                  deletedName={singleCandidate}
                  restFucntion={resetFunction}
                  interviewSection={true}
                />
              )}
            </>
          ))
      )
    ) : (
      ""
    );

  return (
    <Box
      className={styles.candidateTable}
      sx={{
        minHeight:
          rows === undefined && singleCandidate.singleCandidateInterviewLoading
            ? "300px"
            : "auto",
      }}
    >
      <Box className={styles.customBox}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow
                sx={{ "& td, & th": { border: 0 } }}
                className={styles.headingBox}
              >
                {titles?.map((e, i) => (
                  <TableCell align="center" key={i}>
                    {e}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>{RendoronValue}</TableBody>
          </Table>
        </TableContainer>
        {rows?.length > 5 && (
          <TablePagination
            rowsPerPageOptions={[]}
            component="div"
            count={rows?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </Box>
    </Box>
  );
};

export default CandidateTable;
