import { Typography, Box, Button } from "@mui/material";

import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.scss";
import SingleCandidateTabel from "../tabel/index";
import { resetSingleCandidateReff } from "../../../store/actions/singleCandidateScreenActions";
import PopupForm from "../single-candidate-model";
import Interview from "../popup-interview";
import CustomModel from "../popup-interview/model/index";
import { useEffect } from "react";
const Main = () => {
  const singleCandidate = useSelector((state) => state?.singleCandidate);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  useEffect(() => {
    if (singleCandidate?.editInterView?.success) {
      setOpen(true);
    }
  }, [singleCandidate?.editInterView]);
  return (
    <>
      {" "}
      <Box className={styles.calendarBox}>
        <Box className={styles.header}>
          <Typography variant="h4">Requested Interviews</Typography>

          <Box className={`button-primary ${styles.button}`}>
            <Button
              onClick={() => {
                dispatch(resetSingleCandidateReff());
                setOpen(true);
              }}
            >
              Schedule Interview
            </Button>
          </Box>
        </Box>
        <SingleCandidateTabel
          titles={["Subject", "Time", "Date", "Location", "Status", "Actions"]}
          rows={singleCandidate?.singleCandidateInterview?.results?.data}
          value={3}
          interview={true}
        />

        {/* <PopupForm open={open} setOpen={setOpen} disableCross={true}>
          <Interview open={open} setOpen={setOpen} />
        </PopupForm> */}
        <CustomModel open={open} setOpen={setOpen}>
          <Interview setOpen2={setOpen2} setOpen={setOpen} />
        </CustomModel>
        <CustomModel open={open2} setOpen={setOpen2}>
          <Interview setOpen={setOpen2} />
        </CustomModel>
      </Box>
    </>
  );
};

export default Main;
