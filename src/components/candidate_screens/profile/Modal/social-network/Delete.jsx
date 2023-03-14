import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ReactComponent as Cross } from "../../../../../assets/industries/model/x.svg";
import Modal from "@mui/material/Modal";
import styles from "./styles.module.scss";
import { Button } from "@mui/material";
import { deleteSocialNetwork } from "../../../../../api/candidate/candidate.class";
import { useDispatch, useSelector } from "react-redux";
import { ShowAlert } from "../../../../../store/actions/alertActions";
import Alerts from "../../../../common/Alert";

export default function CustomModal({
  openModal,
  setOpenModal,
  SocialNetwork,
  setProfileUpdate,
}) {
  const handleClose = () => setOpenModal(false);
  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    try {
      const res = await deleteSocialNetwork({
        uuid: SocialNetwork?.uuid,
      });
      console.log(res);
      if (res.data.success === true) {
        dispatch(ShowAlert(res?.data?.message, "success"));
        handleClose();
        setProfileUpdate((old) => old + 1);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Alerts />
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
              Delete Social Network
            </Typography>
            <Typography variant="p">
              Are you sure you want to Delete Social Network?
            </Typography>
            <Box className={`${styles.button} button-primary`}>
              <Button className="secondary-btn" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" onClick={onSubmit}>
                Delete
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
