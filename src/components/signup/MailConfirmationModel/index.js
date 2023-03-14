import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import TextInput from "../../common/TextInput";
import styles from "./styles.module.scss";

export default function FormDialog({ open, setOpen, setfieldss }) {
  const auth = useSelector((state) => state?.auth);
  const handleClose = (_, reason) => {
    if (reason === "backdropClick") {
      return;
    }
    setOpen(false);
    setFeilds(true);
  };

  const verifyRequest = async () => {
    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/user/verify/${auth?.token}`
    );
    return await request.data;
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} className={styles.modelMail}>
        <DialogTitle>Please Click on the bellow Link to Verify</DialogTitle>
        <DialogContent>
          <p onClick={verifyRequest}>Please Click on this link to verify</p>
          {/* <DialogContentText>
            A verification code is sent to your already provided email address,
            please enter below:
          </DialogContentText>
          <TextInput
            placeholder={"Enter Code"}
            type="text"
            name="verification"
            label={"Code:"}
          /> */}
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
