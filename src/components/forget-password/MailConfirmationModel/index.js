import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import TextInput from "../../common/TextInput";
import styles from "./styles.module.scss";

export default function FormDialog({ open, setOpen, setFeilds }) {
  const handleClose = (_, reason) => {
    if (reason === "backdropClick") {
      return;
    }
    setOpen(false);
    setFeilds(true);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} className={styles.modelMail}>
        <DialogTitle>Please verify your account to reset password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            A verification code is sent to your already provided email address,
            please enter below:
          </DialogContentText>
          <TextInput
            placeholder={"Enter Code"}
            type="text"
            name="verification"
            label={"Code:"}
          />
        </DialogContent>
        <DialogActions className={styles.buttonSection}>
          <Box className={`button-primary ${styles.button1}`}>
            <Button className={"secondary-btn"} onClick={handleClose}>
              Close
            </Button>
          </Box>

          <Box className={` button-primary ${styles.button}`}>
            <Button onClick={handleClose}>Verify</Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
}
