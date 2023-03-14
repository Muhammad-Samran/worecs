import React from "react";
import {
  Box,
  Button,
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
import { CgMenu } from "react-icons/cg";
import { GrStatusDisabled } from "react-icons/gr";
const JobsTable = ({ titles, rows, interview, value }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedValue, setSelectValue] = React.useState("");
  const rjobs = useSelector((state) => state.rjobs);
  const deletedJob = async (row) => {
    dispatch(deleteJobFunc(row?.uuid));
  };
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

  const [deleteOpen, setDeleteOpen] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleProfileMenuOpen = (event, el) => {
    setAnchorEl(event.currentTarget);
    setSelectValue(el.uuid);
  };

  const openDelteModal = (item) => {
    setSelectValue(item?.uuid);
    setDeleteOpen(true);
    setAnchorEl(null);
  };
  // console.log(selectedValue);
  const EditJob = async (item) => {
    setAnchorEl(null);
    await dispatch(isCompanyExisit()).then(() => {
      dispatch(editJobFunc(item?.uuid)).then(() => {
        navigate(routes.JOBS_CREATE);
      });
    });
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
    setAnchorEl(null);
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
    setAnchorEl(null);
  };

  return (
    <Box
      className={styles.candidateTable}
      style={{ minHeight: rows === undefined && rjobs.loading ? "300px" : "" }}
    >
      <Box className={styles.customBox}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
            {rows === undefined && rjobs.loading ? (
              <div className="loader">
                <CircularProgress />{" "}
              </div>
            ) : rows === undefined && !rjobs.loading ? (
              <div>Something Went Wrong</div>
            ) : rows?.length === 0 ? (
              <>
                <div></div>
              </>
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
                      >
                        <TableCell>{row?.job_title}</TableCell>

                        {<TableCell>{row?.company_name}</TableCell>}
                        {/* {<TableCell>{row?.min_salary}</TableCell>} */}
                        {<TableCell>{row?.created_at}</TableCell>}
                        {value !== 1 && (
                          <TableCell>
                            <Button
                              variant="contained"
                              onClick={() => statusChange(row, value)}
                              sx={{ fontSize: "9px" }}
                              color={`${
                                row?.job_status === 1 ? "success" : "error"
                              }`}
                            >
                              {row?.job_status === 1 ? "Active" : "Deactivate"}
                            </Button>
                          </TableCell>
                        )}

                        {!interview && (
                          <TableCell>
                            <Box className={styles.actionsBox}>
                              <CgMenu
                                onClick={(e) => handleProfileMenuOpen(e, row)}
                                style={{ marginLeft: "15px", fontSize: "15px" }}
                              />
                            </Box>
                            {selectedValue === row?.uuid && (
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
                                <MenuItem onClick={() => EditJob(row)}>
                                  Edit
                                </MenuItem>
                                {value !== 2 && (
                                  <MenuItem
                                    onClick={() => statusChangeArch(row, value)}
                                  >
                                    {row?.is_archived === 1
                                      ? "Unarchived"
                                      : "Archived"}
                                  </MenuItem>
                                )}
                                {/* <MenuItem onClick={() => statusChange(row)}>
                                Status Change
                              </MenuItem> */}
                                {/* <MenuItem
                                onClick={() => statusChange(row, value)}
                              >
                                {row?.job_status === 1
                                  ? "Deactivate"
                                  : "Activate"}
                              </MenuItem> */}
                                <MenuItem onClick={() => openDelteModal(row)}>
                                  Delete
                                </MenuItem>

                                {/* <MenuItem>Logout</MenuItem> */}
                              </Menu>
                            )}
                          </TableCell>
                        )}
                      </TableRow>
                      {selectedValue === row?.uuid && (
                        <DeleteModel
                          deleteOpen={deleteOpen}
                          setDeleteOpen={setDeleteOpen}
                          deleteName={"job"}
                          item={row}
                          // workspaceId={auth?.results?.workspace_id}
                          deleteFunc={deletedJob}
                          deletedName={rjobs}
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
