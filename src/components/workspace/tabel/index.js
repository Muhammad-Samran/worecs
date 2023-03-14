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
} from "@mui/material";
import styles from "./styles.module.scss";
import { ReactComponent as Edit } from "../../../assets/candidates/edit.svg";
import { ReactComponent as Download } from "../../../assets/workspace/download.svg";
import {
  deleteMember,
  editMember,
  resetMember,
  StatusChangeMember,
} from "../../../store/actions/recruiterMembers";
import { useDispatch, useSelector } from "react-redux";
import DeleteModel from "../../common/DeleteModal";
import EditMemberModal from "../CreateMember";
import ModelParent from "../model";
import { ShowAlert } from "../../../store/actions/alertActions";
import { BsFillCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../routes";
import { CgMenu } from "react-icons/cg";

const CandidateTable = ({ titles, rows, interview }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const member = useSelector((state) => state?.member);
  const [selectedValue, setSelectedValue] = React.useState(null);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [editOpen, editSetOpen] = React.useState(false);
  const openDelteModal = () => {
    setDeleteOpen(true);
    setAnchorEl(null);
  };

  const auth = useSelector((state) => state?.auth);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleProfileMenuOpen = (event, el) => {
    setAnchorEl(event.currentTarget);
    setSelectedValue(el.id);
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

  // const menuId = "primary-search-account-menu";

  const deletedMember = async (row, workspaceId) => {
    dispatch(deleteMember(row?.uuid, workspaceId, row?.owner_name));
    setAnchorEl(null);
  };
  const EditMember = (item) => {
    dispatch(editMember(item?.uuid)).then(() => {
      editSetOpen(true);
    });
    setAnchorEl(null);
  };
  const resetFunction = () => {
    dispatch(resetMember());
  };
  const statusChange = async (item) => {
    if (item?.owner_name === "Owner") {
      setAnchorEl(null);
      return dispatch(
        ShowAlert(
          "As you are owner of account, you cannot change your status.",
          "error"
        )
      );
    }
    dispatch(
      StatusChangeMember(
        {
          uuid: item?.uuid,
          close_account: item?.close_account ? 0 : 1,
        },
        auth?.results?.workspace_id
      )
    );
    setAnchorEl(null);
  };

  return (
    <Box
      className={styles.candidateTable}
      style={{
        minHeight: rows === undefined && member.loading ? "300px" : "auto",
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
            {rows === undefined && member.loading ? (
              <Box className="loader">
                <CircularProgress />
              </Box>
            ) : rows === undefined && !member.loading ? (
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
                      >
                        <TableCell align="center">
                          <Box>{row?.worecs_id.toUpperCase()}</Box>
                        </TableCell>
                        {row?.name && (
                          <TableCell align="center">{row?.name}</TableCell>
                        )}
                        {row?.owner_name && (
                          <TableCell align="center">
                            {row?.owner_name}
                          </TableCell>
                        )}

                        <TableCell align="center">
                          {row?.active_candidate}
                        </TableCell>

                        <TableCell align="center">
                          {row?.total_reference}
                        </TableCell>
                        <TableCell align="center">{row?.job_count}</TableCell>
                        {/* <TableCell align="center">
                          <span>
                            <BsFillCircleFill
                              style={{
                                color:
                                  row?.close_account === 1 ? "red" : "green",
                              }}
                            />
                          </span>
                        </TableCell> */}
                        {!interview && (
                          <TableCell align="center">
                            <CgMenu
                              onClick={(e) => handleProfileMenuOpen(e, row)}
                            />

                            {selectedValue === row?.id && (
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
                                {row?.owner_name !== "Owner" && (
                                  <MenuItem onClick={() => statusChange(row)}>
                                    {/* Status Change */}
                                  </MenuItem>
                                )}
                                <MenuItem
                                  onClick={() =>
                                    row?.owner_name === "Owner"
                                      ? navigate(routes.PROFILE)
                                      : EditMember(row)
                                  }
                                >
                                  Edit
                                </MenuItem>
                                {row?.owner_name !== "Owner" && (
                                  <MenuItem onClick={() => openDelteModal()}>
                                    Delete
                                  </MenuItem>
                                )}

                                {/* <MenuItem>Logout</MenuItem> */}
                              </Menu>
                            )}

                            {/* <Box className={styles.actionsBox}>
                    <Edit />

                    <Download />
                  </Box> */}
                          </TableCell>
                        )}
                      </TableRow>
                      {selectedValue === row?.id && (
                        <DeleteModel
                          deleteOpen={deleteOpen}
                          setDeleteOpen={setDeleteOpen}
                          item={row}
                          deleteName={"member"}
                          workspaceId={auth?.results?.workspace_id}
                          deleteFunc={deletedMember}
                          deletedName={member}
                          restFucntion={resetFunction}
                        />
                      )}
                      <ModelParent open={editOpen} setOpen={editSetOpen}>
                        <EditMemberModal
                          open={editOpen}
                          setOpen={editSetOpen}
                        />
                      </ModelParent>
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

export default CandidateTable;
