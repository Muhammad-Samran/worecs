import React from "react";
import {
  Box,
  Button,
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
import { ReactComponent as Edit } from "../../../assets/jobs/edit.svg";
import { ReactComponent as Download } from "../../../assets/workspace/download.svg";
import { ReactComponent as Delete } from "../../../assets/jobs/deleteAction.svg";
import {
  deleteJobFunc,
  editJobFunc,
  resetJob,
  StatusJobFunc,
  StatusJobFuncArchived,
} from "../../../store/actions/recruiterJobsActions";
import DeleteModel from "../../common/DeleteModal";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../routes";
import { isCompanyExisit } from "../../../store/actions/companyActions";
import { resetMember } from "../../../store/actions/recruiterMembers";
import { BsArchive } from "react-icons/bs";
import { GrStatusDisabled } from "react-icons/gr";
import {
  editCandidateFunc,
  ShowCandidateFunc,
} from "../../../store/actions/recruiterCandidateActions";
const JobsTable = ({ titles, rows, interview, value }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedValue, setSelectValue] = React.useState("");
  const rcandidate = useSelector((state) => state.rcandidate);
  const deletedJob = async (row) => {
    dispatch(deleteJobFunc(row?.uuid));
  };

  const [deleteOpen, setDeleteOpen] = React.useState(false);

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

  const openDelteModal = (item) => {
    setSelectValue(item?.uuid);
    setDeleteOpen(true);
  };
  // console.log(selectedValue);
  const EditJob = async (item) => {
    dispatch(editCandidateFunc(item?.uuid));
  };
  const ShowJob = async (item) => {
    dispatch(ShowCandidateFunc(item?.uuid)).then(() =>
      navigate(`${routes.SINGLE_CANDIDATE}/${item?.uuid}`)
    );
  };
  const restFucntion = () => {
    dispatch(resetMember());
  };
  const statusChange = async (item, value) => {
    dispatch(
      StatusJobFunc(
        {
          uuid: item?.uuid,
          job_status: item?.job_status ? 0 : 1,
        },
        value
      )
    );
  };
  const statusChangeArch = async (item, value) => {
    // console.log(item);
    dispatch(
      StatusJobFuncArchived(
        {
          uuid: item?.uuid,
          is_archived: item?.is_archived ? 0 : 1,
        },
        value
      )
    );
  };

  // //    {sortDataCreate === undefined &&
  // adminIndustryList.createdLoading ? (
  //   <Box className="loader">
  //     <CircularProgress />
  //   </Box>
  // ) : sortDataCreate === undefined &&
  //   !adminIndustryList.createdLoading ? (
  //   <Box className="loader">Somthing Went Worng</Box>
  // ) : sortDataCreate?.length === 0 ? (
  //   <Box className="loader"></Box>
  // ) :

  return (
    <Box
      className={styles.candidateTable}
      style={{
        minHeight: rows === undefined && rcandidate.loading ? "300px" : "auto",
      }}
    >
      <Box className={styles.customBox}>
        <TableContainer>
          <Table sx={{}} aria-label="simple table">
            <TableHead>
              <TableRow
                sx={{ "& td, & th": { border: 0 } }}
                className={styles.headingBox}
              >
                {titles.map((e, i) => (
                  <TableCell key={i}>{e}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            {rows === undefined && rcandidate.loading ? (
              <Box className="loader">
                <CircularProgress />
              </Box>
            ) : rows === undefined && !rcandidate.loading ? (
              <Box>Something Went Wrong</Box>
            ) : rows?.length === 0 ? (
              <Box></Box>
            ) : (
              <TableBody>
                {rows
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.map((row, i) => (
                    <React.Fragment key={i}>
                      <TableRow
                        key={i}
                        sx={{ "& td, & th": { border: 0 } }}
                        className={styles.contentBox}
                        onClick={() => ShowJob(row)}
                      >
                        <TableCell>{row?.worecs_id.toUpperCase()}</TableCell>

                        {
                          <TableCell>
                            {row?.first_name + " " + row?.last_name}
                          </TableCell>
                        }
                        {<TableCell>{row?.email}</TableCell>}
                        {
                          <TableCell align="center">
                            {row?.candidate_reference_count}
                          </TableCell>
                        }
                        {
                          <TableCell align="center">
                            {row?.job_offer_letter_count}
                          </TableCell>
                        }
                        {
                          <TableCell align="center">
                            {row?.application_form_count}
                          </TableCell>
                        }

                        {/* {!interview && (
                        <TableCell>
                          <Box className={styles.actionsBox}>
                            <Tooltip title="Delete">
                              <Delete onClick={() => openDelteModal(row)} />
                            </Tooltip>
                            <Tooltip title="Edit">
                              <Edit
                                style={{ marginLeft: "8px" }}
                                // sx={{ color: "#6C6A6A" }}
                                onClick={() => EditJob(row)}
                              />
                            </Tooltip>
                          </Box>
                        </TableCell>
                      )} */}
                      </TableRow>
                      {selectedValue === row?.uuid && (
                        <DeleteModel
                          deleteOpen={deleteOpen}
                          setDeleteOpen={setDeleteOpen}
                          item={row}
                          deleteName={"job"}
                          // workspaceId={auth?.results?.workspace_id}
                          deleteFunc={deletedJob}
                          // deletedName={rjobs}
                          restFucntion={restFucntion}
                        />
                      )}
                    </React.Fragment>
                  ))}
              </TableBody>
            )}
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

export default JobsTable;
