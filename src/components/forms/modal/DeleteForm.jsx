import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ReactComponent as Cross } from "../../../assets/industries/model/x.svg";
import Modal from "@mui/material/Modal";
import styles from "./styles.module.scss";
import { Button, Grid } from "@mui/material";
import {
  deleteForm,
  deleteSubmission,
} from "../../../api/candidate/candidate.class";
import { useDispatch } from "react-redux";
import { ShowAlert } from "../../../store/actions/alertActions";

export default function DeleteForm({
  openModal,
  setOpenModal,
  setDeletion,
  deleteId,
  type,
}) {
  const handleClose = () => setOpenModal(false);
  const dispatch = useDispatch();
  const handleSubmit = async () => {
    // console.log("Submit button", deleteId);
    try {
      let response;
      if (type === "submission") {
        response = await deleteSubmission({ uuid: deleteId });
      } else {
        response = await deleteForm({ uuid: deleteId });
      }

      // console.log(response);
      if (response.data.success) {
        dispatch(ShowAlert(response?.data?.message, "success"));
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
      >
        <Box class={styles.modalParent}>
          <Box className={styles.modalwapper}>
            <Box className={styles.cross} onClick={handleClose}>
              <Cross />
            </Box>
            <Typography variant="h4" className={styles.heading}>
              Delete Form
            </Typography>
            <Box className={styles.parent}>
              <Typography variant="body1">
                Are you sure you want to delete this Form?
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
