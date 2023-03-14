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
import styles from "./styles.module.scss";
import { getTrail } from "../../../../store/actions/pricingActions";

export default function FormDialog({ open, setOpen }) {
  const dispatch = useDispatch();
  const pricing = useSelector((state) => state?.pricing?.trail);
  const price = useSelector((state) => state?.pricing);

  const handleClose = (_, reason) => {
    if (reason === "backdropClick") {
      return;
    }

    setOpen(false);
  };
  useEffect(() => {
    if (pricing?.success) {
      setOpen(false);
    }
  }, [pricing]);
  return (
    <>
      <Dialog open={open} onClose={handleClose} className={styles.modelMail}>
        <DialogTitle>
          Please confirm, If You want To activate trial{" "}
        </DialogTitle>

        <DialogActions className={styles.buttonSection}>
          <Box className={`button-primary ${styles.button1}`}>
            <Button className={"secondary-btn"} onClick={handleClose}>
              Close
            </Button>
          </Box>

          <Box className={` button-primary ${styles.button}`}>
            <Button
              disabled={price?.isLoading}
              onClick={() => dispatch(getTrail())}
            >
              {price?.isLoading && pricing === null ? (
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
