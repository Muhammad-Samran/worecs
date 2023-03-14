import React from "react";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
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
import moment from "moment";
import { singleOrder } from "../../../store/actions/orderActions";
const JobsTable = ({ titles, rows, interview, value }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state?.auth);
  const [selectedValue, setSelectValue] = React.useState("");
  const rcandidate = useSelector((state) => state.rorders);
  const deletedJob = async (row) => {
    dispatch(deleteJobFunc(row?.uuid));
  };

  const [deleteOpen, setDeleteOpen] = React.useState(false);

  const openDelteModal = (item) => {
    setSelectValue(item?.uuid);
    setDeleteOpen(true);
  };
  // console.log(selectedValue);
  const EditJob = async (item) => {
    dispatch(editCandidateFunc(item?.uuid));
  };
  const ShowJob = async (item) => {
    dispatch(singleOrder({ plan_id: item?.id })).then(() =>
      navigate(`${routes.ORDER_DETAIL}/${item?.uuid}`, {
        state: {
          id: item?.id,
        },
      })
    );
  };
  const restFucntion = () => {
    dispatch(resetMember());
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
                {/* <TableCell>
                  <Checkbox />
                </TableCell> */}
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
                {rows?.map((row, i) => (
                  <React.Fragment key={i}>
                    <TableRow
                      key={i}
                      sx={{ "& td, & th": { border: 0 } }}
                      className={styles.contentBox}
                      onClick={() => ShowJob(row)}
                    >
                      {/* <TableCell>
                        <Checkbox />
                      </TableCell> */}
                      <TableCell>{row?.id}</TableCell>

                      {<TableCell>{row?.plan_name}</TableCell>}
                      {
                        <TableCell align="center">
                          {auth?.results?.email}
                          {/* {moment(row?.created_at).format("DD-MM-yyyy")} */}
                          {/* {moment.format(row?.created_at)} */}
                        </TableCell>
                      }
                      {/* {<TableCell>sdhjdf-4ad</TableCell>} */}

                      {/* {<TableCell>${row?.paid_discounted_price}</TableCell>} */}
                      {
                        <TableCell>
                          <div className="button-table">
                            {row?.status === 1 ? "Completed" : "Incomplete"}
                          </div>
                        </TableCell>
                      }
                      {
                        <TableCell align="center">
                          {moment(row?.created_at).format("DD-MM-yyyy")}
                          {/* {moment.format(row?.created_at)} */}
                        </TableCell>
                      }
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
      </Box>
    </Box>
  );
};

export default JobsTable;
