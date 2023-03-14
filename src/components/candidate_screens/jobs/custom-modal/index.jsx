import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ReactComponent as CloseBtn } from "../../../../assets/candidates/closebtn.svg";
import Modal from "@mui/material/Modal";
import styles from "./styles.module.scss";
import { IconButton } from "@mui/material";

export default function CustomModal() {
  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box class={styles.modalParent}>
          <Box className={styles.modalwapper}>
            <IconButton className={styles.closeBtn} onClick={handleClose}>
              <CloseBtn />
            </IconButton>
            <Typography variant="h4" className={styles.heading}>
              Job Offer Review
            </Typography>
            <Box className={styles.statusbox}>
              <Typography variant="h4">Status:</Typography>
              <Typography variant="p">Job offer accepted</Typography>
            </Box>
            <Box className={styles.statusbox}>
              <Typography variant="h4">Letter of offer:</Typography>
              <Typography variant="p" className={styles.link}>
                Job Offer Document.pdf
              </Typography>
            </Box>
            <Box className={styles.statusbox}>
              <Typography variant="h4">Last Update:</Typography>
              <Typography variant="p">12:47 am, July 7, 2022</Typography>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
