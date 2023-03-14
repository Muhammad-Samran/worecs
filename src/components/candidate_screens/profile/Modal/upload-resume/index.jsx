import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ReactComponent as Cross } from "../../../../../assets/industries/model/x.svg";
import { ReactComponent as UploadIcon } from "../../../../../assets/candidates/uploadfile.svg";
import Modal from "@mui/material/Modal";
import styles from "./stylesUpload.module.scss";
import { Button } from "@mui/material";
import {
  uploadFiles,
  uploadResume,
} from "../../../../../api/uploadFile/uploadFile.class";
import { useDispatch, useSelector } from "react-redux";
import { ShowAlert } from "../../../../../store/actions/alertActions";
import Alerts from "../../../../common/Alert";
import { useNavigate } from "react-router-dom";

export default function CustomModal({ openModal, setOpenModal, setUpdation }) {
  const handleClose = () => setOpenModal(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const candidateId = useSelector((state) => state.auth.results.candidate_id);

  const [file, setFile] = useState({ resume_path: "" });

  const handleSubmit = async () => {
    // console.log(file?.resume_path);
    try {
      const payload = {
        resume_path: file?.resume_path ? file?.resume_path : "",
        candidate_id: candidateId,
      };
      // console.log(payload);
      const response = await uploadResume(payload);
      if (response?.data?.success == true) {
        dispatch(ShowAlert(response?.data?.message, "success"));
        setUpdation((old) => old + 1);
        navigate("/dashboard/profile-candidate");
        handleClose();
      } else {
        dispatch(ShowAlert(response?.data?.message, "success"));
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
              Upload Resume
            </Typography>
            <Box className={styles.statusbox}>
              <Box className={styles.fileUpload}>
                <label className={styles.customFileUpload}>
                  <input
                    accept="application/pdf, application/vnd.ms-excel, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    className={styles.fileUploadInput}
                    style={{ display: "none" }}
                    id="raised-button-file"
                    multiple
                    type="file"
                    onChange={(e) =>
                      setFile({ ...file, resume_path: e?.target?.files[0] })
                    }
                  />
                  <UploadIcon />
                  <span className={styles.uploadLabel}>Upload Files</span>
                </label>
              </Box>
              <Box></Box>
              <Box>
                <Typography variant="h4" className={styles.heading}>
                  {file?.resume_path?.name ? file?.resume_path?.name : ""}
                </Typography>
              </Box>
              <Box className={`${styles.button} button-primary`}>
                <Button className="secondary-btn" onClick={handleClose}>
                  Cancel
                </Button>
                <Button onClick={handleSubmit}>Save</Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
