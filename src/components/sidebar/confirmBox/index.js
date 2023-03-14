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
import { deleteImage } from "../../../store/actions/profileActions";
import styles from "./styles.module.scss";

export default function FormDialog({ open, setOpen, setImage }) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state?.auth);
  const profile = useSelector((state) => state?.rprofile);

  const handleClose = (_, reason) => {
    if (reason === "backdropClick") {
      return;
    }
    setOpen(false);
  };
  useEffect(() => {
    if (profile?.deleteUpload?.success) {
      setOpen(false);
      setImage({});
    }
  }, [profile?.deleteUpload]);
  return (
    <>
      <Dialog open={open} onClose={handleClose} className={styles.modelMail}>
        <DialogTitle>Please confirm, if to remove the Profile</DialogTitle>

        <DialogActions className={styles.buttonSection}>
          <Box className={`button-primary ${styles.button1}`}>
            <Button className={"secondary-btn"} onClick={handleClose}>
              Close
            </Button>
          </Box>

          <Box className={` button-primary ${styles.button}`}>
            <Button
              disabled={profile?.loading}
              onClick={() =>
                dispatch(
                  deleteImage(auth?.results?.uuid, {
                    uuid: auth?.results?.uuid,
                    customer_id:
                      auth?.user === "candidate"
                        ? auth?.results?.candidate_id
                        : auth?.results?.recruiter_id,
                  })
                )
              }
            >
              {profile?.loading ? (
                <CircularProgress style={{ color: "white" }} />
              ) : (
                "  Confirm"
              )}
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
}
