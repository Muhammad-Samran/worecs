import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ReactComponent as Cross } from "../../../../../assets/industries/model/x.svg";
import Modal from "@mui/material/Modal";
import TextInput from "../../../../common/TextInput";
import styles from "./styles.module.scss";
import { Button, Grid } from "@mui/material";
import {
  addSocialNetwork,
  updateSocialNetwork,
} from "../../../../../api/candidate/candidate.class";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { ShowAlert } from "../../../../../store/actions/alertActions";
import Alerts from "../../../../common/Alert";

export default function CustomModal({
  openModal,
  setOpenModal,
  SocialNetwork,
  type,
  setProfileUpdate,
}) {
  const handleClose = () => setOpenModal(false);
  const dispatch = useDispatch();
  const candidateId = useSelector((state) => state.auth.results.candidate_id);
  const initialValues = {
    linkedin: SocialNetwork?.linkedin ? SocialNetwork.linkedin : "",
  };

  const socialSchema = Yup.object().shape({
    linkedin: Yup.string().required("Required"),
  });
  const onSubmit = async (values) => {
    try {
      if (type === "create") {
        const res = await addSocialNetwork({
          ...values,
          candidate_id: candidateId,
        });
        // console.log(res);
        if (res.data.success === true) {
          dispatch(ShowAlert(res?.data?.message, "success"));
          handleClose();
          setProfileUpdate((old) => old + 1);
        }
      } else if (type === "update") {
        const res = await updateSocialNetwork({
          ...values,
          candidate_id: candidateId,
          uuid: SocialNetwork?.uuid,
        });
        // console.log(res);
        if (res.data.success === true) {
          dispatch(ShowAlert(res?.data?.message, "success"));
          handleClose();
          setProfileUpdate((old) => old + 1);
        }
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
              Social Network
            </Typography>
            <Formik
              initialValues={initialValues}
              validationSchema={socialSchema}
              onSubmit={onSubmit}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleSubmit,
                isSubmitting,
              }) => (
                <form onSubmit={handleSubmit} className={styles.formsBox}>
                  <Box className={styles.statusbox}>
                    <Grid>
                      <TextInput
                        customClass={styles.boxForm}
                        type="text"
                        name="linkedin"
                        label="LinkedIn"
                        value={values.linkedin}
                        sx={{ minWidth: "auto" }}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Box className={`${styles.button} button-primary`}>
                      <Button className="secondary-btn" onClick={handleClose}>
                        Cancel
                      </Button>
                      <Button type="submit">Save</Button>
                    </Box>
                  </Box>
                </form>
              )}
            </Formik>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
