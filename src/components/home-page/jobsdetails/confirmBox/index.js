import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  ApplyJob,
  getSingleJob,
} from "../../../../store/actions/homeJobActions";
import styles from "./styles.module.scss";

export default function FormDialog({ open, setOpen }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const auth = useSelector((state) => state?.auth);
  const hjob = useSelector((state) => state?.hjob);

  const handleClose = (_, reason) => {
    if (reason === "backdropClick") {
      return;
    }
    setOpen(false);
  };

  const appplyJob = () => {
    dispatch(
      ApplyJob({
        candidate_id: auth?.results?.candidate_id,
        uuid: hjob?.singleJob?.results?.uuid,
      })
    ).then(() => {
      dispatch(getSingleJob(location?.state?.slug));
      setOpen(false);
    });
  };

  // useEffect(() => {
  //   if (hjob?.jobApply?.success) {
  //     setOpen(false);
  //   }
  // }, [hjob?.jobApply?.success]);
  return (
    <>
      <Dialog open={open} onClose={handleClose} className={styles.modelMail}>
        <DialogTitle>Please confirm, If You want To Apply for job </DialogTitle>

        <DialogActions className={styles.buttonSection}>
          <Box className={`button-primary ${styles.button1}`}>
            <Button className={"secondary-btn"} onClick={handleClose}>
              Close
            </Button>
          </Box>

          <Box className={` button-primary ${styles.button}`}>
            <Button disabled={auth?.isLoading} onClick={appplyJob}>
              {auth?.isLoading ? (
                <CircularProgress style={{ color: "white" }} />
              ) : (
                " Confirm"
              )}
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
}
