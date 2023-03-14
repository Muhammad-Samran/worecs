import React from "react";
import {
  Box,
  CircularProgress,
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
import { ReactComponent as Verification } from "../../../assets/new-icons/verification.svg";
import { ReactComponent as Candidate } from "../../../assets/new-icons/candidate.svg";
import { ReactComponent as Resend } from "../../../assets/new-icons/resend.svg";
import { ReactComponent as Notification } from "../../../assets/dashboard/bell.svg";

import { FaSync } from "react-icons/fa";

import DeleteModel from "../../common/DeleteModal/index";
import { AiOutlinePlus } from "react-icons/ai";
import { MdVerifiedUser } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteInterviewFucntion,
  editSingleCandidateCertificate,
  editSingleCandidateInterview,
  getAllRecruiterCandidateReff,
  resendSingleCandidateInterview,
  resendSingleCertificateFunc,
  resendSingleReffFunc,
  resetSingleCandidateReff,
  StatusShowSingleCertificateFunc,
  StatusShowSingleReffFunc,
  verifySingleCandidateCertificate,
} from "../../../store/actions/singleCandidateScreenActions";
import ShowReff from "../showRefference/index";
import CustomModel from "../single-candidate-model/index";
import { useState } from "react";
import { useEffect } from "react";

import ResendModel from "../resend-form";
import {
  resendFormCandidate5,
  viewForm,
} from "../../../store/actions/applyJobActions";
import { routes } from "../../../routes";
import { useNavigate } from "react-router-dom";

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

const CandidateTable = ({ titles, rows, interview, value, uuid }) => {
  const navigate = useNavigate();
  const singleCandidate = useSelector((state) => state?.singleCandidate);
  const candidate = useSelector((state) => state?.rcandidate);
  const auth = useSelector((state) => state?.auth);
  const [openReff, setOpenReff] = useState(false);
  const [openCertificate, setOpenCertificate] = useState(false);
  const candidateID = JSON.parse(localStorage.getItem("candidateID"));
  const [selectedValue, setSelectedValue] = useState("");
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const applyjobs = useSelector((state) => state?.applyJob);
  const [open3, setOpen3] = useState(false);
  const [resend, setResend] = useState("");
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
    if (singleCandidate?.loading) return;
    dispatch(
      editSingleCandidateCertificate(item?.uuid, {
        candidate_id: candidate?.showCandidate?.results?.id || candidateID,
      })
    );
  };
  const resendInterVieww = (item) => {
    if (singleCandidate?.loading) return;
    dispatch(resendSingleCandidateInterview(item?.uuid));
  };

  const editSingleInterView = (item) => {
    if (singleCandidate?.loading) return;
    dispatch(editSingleCandidateInterview(item?.uuid));
  };

  const showStatusCertificates = (item) => {
    dispatch(StatusShowSingleCertificateFunc(item?.uuid)).then(() => {
      setOpenCertificate(true);
    });
  };
  const verifycertificate = (item) => {
    if (singleCandidate?.loading) return;
    dispatch(verifySingleCandidateCertificate(item?.uuid));
  };

  const resendReff = (item, name) => {
    if (singleCandidate?.loading) return;
    dispatch(resendSingleReffFunc(item?.uuid, name)).then(() => {});
  };
  const resendSingleCertificate = (item) => {
    if (singleCandidate?.loading) return;
    dispatch(resendSingleCertificateFunc(item?.uuid)).then(() => {});
  };

  const resetFunction = () => {
    dispatch(resetSingleCandidateReff());
  };

  const applyJobs = useSelector((state) => state?.applyJob);

  const reminderReference = (item) => {
    const array =
      item?.candidate_form_reference[
        item?.candidate_form_reference?.length - 1
      ];
    const local_data = {
      uuid: uuid,
      recruiter_id: auth?.results?.recruiter_id,
      candidate_id: candidate?.showCandidate?.results?.id || candidateID,
      workspace_id: auth?.results?.workspace_id,
      form_category_name: array?.form_builder_category?.name,

      form_builder_id: array?.form_builder?.id,
      candidate_reference_id: item?.id,
    };
    dispatch(resendFormCandidate5(local_data)).then(() => {
      dispatch(
        getAllRecruiterCandidateReff({
          candidate_id: candidate?.showCandidate?.results?.id || candidateID,
          workspace_id: auth?.results?.workspace_id,
        })
      );
    });
  };

  const viewData = (item) => {
    const array =
      item?.candidate_form_reference[
        item?.candidate_form_reference?.length - 1
      ];
    if (array?.response === "completed") {
      dispatch(viewForm(array?.submit_data?.uuid)).then(() => {
        navigate(`${routes.FORM_VIEW}/${array?.submit_data?.uuid}`, {
          state: {
            type: "submission",
            uuid: array?.submit_data?.uuid,
            data: array?.form_builder?.form_builder_json,
          },
        });
      });
    }
  };

  //
  // resendSingleReffFunc
  // statusReff
  // resendReff

  //   singleCandidateReffLoading
  //
  // singleCandidateInterviewLoading

  const RendoronValue =
    value === 1 ? (
      rows === undefined && singleCandidate.singleCandidateReffLoading ? (
        <Box className="loader">
          <CircularProgress />
        </Box>
      ) : rows === undefined && !singleCandidate.singleCandidateReffLoading ? (
        <Box>Something Went Wrong</Box>
      ) : rows?.length === 0 ? (
        <Box></Box>
      ) : (
        <TableBody>
          <>
            {rows
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((row, i) => (
                <>
                  <TableRow
                    key={i}
                    sx={{ "& td, & th": { border: 0 } }}
                    className={styles.contentBox}
                  >
                    <TableCell align="center">
                      <Box>{row?.id || "John"}</Box>
                    </TableCell>
                    <TableCell align="center">
                      <Box>{row?.full_name || "John"}</Box>
                    </TableCell>
                    <TableCell align="center">
                      {row?.contact_number || "030023242"}
                    </TableCell>

                    <TableCell align="center">
                      {row?.email || "abc@gmail.com"}
                    </TableCell>

                    <TableCell align="center">
                      {row?.job_title || "Software Eng"}
                    </TableCell>
                    <TableCell align="center">
                      {row?.response || "Pending"}
                    </TableCell>

                    {!interview && (
                      <TableCell align="center">
                        <Box className={styles.actionsBox}>
                          {/* <Tooltip title="Edit">
                      <Edit />
                    </Tooltip> */}
                          <Tooltip title="Show">
                            <Eye onClick={() => showStatusReff(row)} />
                          </Tooltip>

                          {row?.candidate_response === "completed" &&
                            row?.candidate_form_reference?.length < 1 && (
                              <Box style={{ marginLeft: "8px" }}>
                                <Tooltip title="Verify">
                                  <Verification
                                    // onClick={() => resendReff(row, "verify")}
                                    onClick={() => {
                                      setResend(row?.id);
                                      setOpen3(true);
                                    }}
                                  />
                                </Tooltip>
                              </Box>
                            )}
                          {row?.candidate_form_reference[
                            row?.candidate_form_reference?.length - 1
                          ]?.response === "pending" && (
                            <>
                              <Tooltip title="Reminder">
                                <Notification
                                  onClick={() => reminderReference(row)}
                                />
                              </Tooltip>
                            </>
                          )}
                          {row?.candidate_form_reference[
                            row?.candidate_form_reference?.length - 1
                          ]?.response === "completed" && (
                            <>
                              <Tooltip title="View form">
                                <Eye onClick={() => viewData(row)} />
                              </Tooltip>
                              {/* <Tooltip title="Resend">
                                <Box style={{ marginLeft: "8px" }}>
                                  <Resend
                                    color="#00CFC5"
                                    onClick={() => {
                                      setResend(row?.id);
                                      setOpen3(true);
                                    }}
                                  />
                                </Box>
                              </Tooltip> */}
                            </>
                          )}

                          {row?.candidate_response === "completed" && (
                            <>
                              {/* <Tooltip title="Show">
                                <Eye />
                              </Tooltip>

                              <Tooltip title="Download">
                                <Download />
                              </Tooltip> */}
                              {/* <Tooltip title="Send">
                                <Box style={{ marginLeft: "8px" }}>
                                  {" "}
                                  <Resend
                                    color="#00CFC5"
                                   
                                    onClick={() => {
                                      setResend(row?.id);
                                      setOpen3(true);
                                    }}
                                  />
                                </Box>
                              </Tooltip> */}
                            </>
                          )}
                        </Box>
                      </TableCell>
                    )}
                  </TableRow>
                  {resend === row?.id && (
                    <CustomModel open={open3} setOpen={setOpen3}>
                      <ResendModel
                        open={open3}
                        setOpen={setOpen3}
                        candidate_reference_id={row?.id}
                        uuid={uuid}
                        id={5}
                        cata={"Reference Form"}
                        results={applyjobs?.candidateForm5}
                      />
                    </CustomModel>
                  )}
                </>
              ))}
          </>
        </TableBody>
      )
    ) : value === 2 ? (
      rows === undefined &&
      singleCandidate.singleCandidateCertificatesLoading ? (
        <Box className="loader">
          <CircularProgress />
        </Box>
      ) : rows === undefined &&
        !singleCandidate.singleCandidateCertificatesLoading ? (
        <Box>Something Went Wrong</Box>
      ) : rows?.length === 0 ? (
        <Box></Box>
      ) : (
        <TableBody>
          {rows
            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            ?.map((row, i) => (
              <TableRow
                key={i}
                sx={{ "& td, & th": { border: 0 } }}
                className={styles.contentBox}
              >
                <TableCell align="center">
                  <Box>
                    <Box>{row?.recruiter_industry?.name || "Industy"}</Box>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  {row?.industry_certification_license?.name || "License name"}
                </TableCell>
                <TableCell align="center">
                  {row?.issue_date || "5/5/2022"}
                </TableCell>

                <TableCell align="center">
                  {row?.response || "Pending"}
                </TableCell>

                {!interview && (
                  <TableCell align="center">
                    <Box className={styles.actionsBox}>
                      <Tooltip title="Edit">
                        <Edit onClick={() => editSingleCertificate(row)} />
                      </Tooltip>
                      <Tooltip title="Show">
                        <Eye onClick={() => showStatusCertificates(row)} />
                      </Tooltip>
                      {row?.candidate_response === "pending" && (
                        <Tooltip title="Resend">
                          <Resend
                            onClick={() => resendSingleCertificate(row)}
                          />
                        </Tooltip>
                      )}
                      <Tooltip title="Candidate">
                        <Candidate />
                      </Tooltip>
                      {row?.candidate_response === "completed" && (
                        <Tooltip title="Verify">
                          <Verification
                            onClick={() => verifycertificate(row)}
                          />
                        </Tooltip>
                      )}
                    </Box>
                  </TableCell>
                )}
              </TableRow>
            ))}
        </TableBody>
      )
    ) : value === 3 ? (
      rows === undefined && singleCandidate.singleCandidateInterviewLoading ? (
        <Box className="loader">
          <CircularProgress />
        </Box>
      ) : rows === undefined &&
        !singleCandidate.singleCandidateInterviewLoading ? (
        <Box>Something Went Wrong</Box>
      ) : rows?.length === 0 ? (
        <Box></Box>
      ) : (
        <TableBody>
          {rows
            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                  <TableCell align="center">
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
                  </TableCell>
                </TableRow>
                {selectedValue === row?.id && (
                  <DeleteModel
                    deleteOpen={deleteOpen}
                    setDeleteOpen={setDeleteOpen}
                    item={row}
                    deleteName={"interview"}
                    workspaceId={auth?.results?.workspace_id}
                    candidateId={
                      candidate?.showCandidate?.results?.id || candidateID
                    }
                    deleteFunc={deleteInterviewTable}
                    deletedName={singleCandidate}
                    restFucntion={resetFunction}
                    interviewSection={true}
                  />
                )}
              </>
            ))}
        </TableBody>
      )
    ) : (
      ""
    );

  return (
    <Box
      className={styles.candidateTable}
      style={{
        minHeight:
          rows === undefined && singleCandidate?.singleCandidateReffLoading
            ? "300px"
            : rows === undefined &&
              singleCandidate?.singleCandidateCertificatesLoading
            ? "300px"
            : rows === undefined &&
              singleCandidate?.singleCandidateInterviewLoading
            ? "300px"
            : "auto",
      }}
    >
      <CustomModel open={openReff} setOpen={setOpenReff}>
        <ShowReff
          open={openReff}
          setOpen={setOpenReff}
          data={singleCandidate?.statusReff?.results}
        />
      </CustomModel>

      <CustomModel open={openCertificate} setOpen={setOpenCertificate}>
        <ShowReff
          open={openCertificate}
          setOpen={setOpenCertificate}
          name={"License and Certificate Information"}
          data={singleCandidate?.statusCertificate?.results}
          certificate={true}
        />
      </CustomModel>

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
            {RendoronValue}
          </Table>
        </TableContainer>
        {rows?.length > 5 && (
          <TablePagination
            rowsPerPageOptions={[]}
            component="Box"
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
