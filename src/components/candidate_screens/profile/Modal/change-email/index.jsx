import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextInput from "../../../../common/TextInput";
import { ReactComponent as Cross } from "../../../../../assets/industries/model/x.svg";
import Modal from "@mui/material/Modal";
import styles from "./styles.module.scss";
import { Button, IconButton } from "@mui/material";

export default function CustomModal({ openModal, setOpenModal }) {
  const handleClose = () => setOpenModal(false);
  return (
    <>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={`${styles.industryModel}`}
      >
        <Box className={`${styles.boxModel} xym1`}>
          <Box className={styles.modalwapper}>
            <Box className={styles.cross} onClick={handleClose}>
              <Cross />
            </Box>
            <Typography variant="h4" className={styles.heading}>
              Change Email
            </Typography>
            <Box className={styles.statusbox}>
              <TextInput
                customClass={styles.boxForm}
                type="password"
                name="password"
                placeholder="Password"
              />
              <TextInput
                customClass={styles.boxForm}
                type="email"
                name="email"
                placeholder="New Email Address"
              />
              <Box className={`${styles.button} button-primary`}>
                <Button className="secondary-btn" onClick={handleClose}>
                  Cancel
                </Button>
                <Button onClick={handleClose}>Save</Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
