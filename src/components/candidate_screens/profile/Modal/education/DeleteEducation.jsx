import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ReactComponent as Cross } from "../../../../../assets/industries/model/x.svg";
import Modal from "@mui/material/Modal";
import styles from "./styles.module.scss";
import { Button } from "@mui/material";
import { deleteEducation } from "../../../../../api/candidate/candidate.class";
import { useDispatch } from "react-redux";
import { ShowAlert } from "../../../../../store/actions/alertActions";
import Alerts from "../../../../common/Alert";

export default function CustomModal({
  openModal,
  setOpenModal,
  setDeletion,
  uuid,
}) {
  const handleClose = () => setOpenModal(false);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    try {
      const response = await deleteEducation({ uuid: uuid });
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
              Delete Education
            </Typography>
            <Box className={styles.parent}>
              <Typography variant="p">
                Are you sure you want to delete this education?
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
