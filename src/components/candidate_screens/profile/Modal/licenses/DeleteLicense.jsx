import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ReactComponent as Cross } from "../../../../../assets/industries/model/x.svg";
import Modal from "@mui/material/Modal";
import styles from "./styles.module.scss";
import { Button } from "@mui/material";
import { deleteProfileLicense } from "../../../../../api/candidate/candidate.class";

export default function CustomModal({
  openModal,
  setOpenModal,
  setDeletion,
  uuid,
}) {
  const handleClose = () => setOpenModal(false);

  const handleSubmit = async () => {
    try {
      const response = await deleteProfileLicense({ uuid: uuid });
      // console.log(response);
      if (response.data.success) {
        handleClose();
        setDeletion((old) => old + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
              Delete License
            </Typography>
            <Box className={styles.licensepara}>
              <Typography variant="h5">
                Are you sure you want to delete this license?
              </Typography>
              <Box>
                <Box
                  className={`button-primary`}
                  style={{ display: "flex", width: "100%" }}
                >
                  <Button
                    style={{ marginRight: "20px" }}
                    className="secondary-btn"
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" onClick={handleSubmit}>
                    Delete
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
