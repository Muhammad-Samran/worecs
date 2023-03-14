import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ReactComponent as Cross } from "../../../../../assets/industries/model/x.svg";
import Modal from "@mui/material/Modal";
import TextInput from "../../../../common/TextInput";
import styles from "./styles.module.scss";
import { Button, IconButton, Grid } from "@mui/material";

import { Formik } from "formik";
import * as Yup from "yup";

import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../../../../api/candidate/candidate.class";
import { ShowAlert } from "../../../../../store/actions/alertActions";
import Alerts from "../../../../common/Alert";

export default function CustomModal({
  openModal,
  setOpenModal,
  profile,
  setProfileUpdate,
}) {
  const handleClose = () => setOpenModal(false);
  const dispatch = useDispatch();
  const candidateId = useSelector((state) => state.auth.results.candidate_id);

  const initialValues = {
    first_name: profile ? profile?.first_name : "",
    last_name: profile ? profile?.last_name : "",
    contact_number: profile ? profile?.contact_number : "",
    profile_image: "",
    country_code: "au",
  };

  const profileSchema = Yup.object().shape({
    first_name: Yup.string().required("Required"),
    last_name: Yup.string().required("Required"),
    contact_number: Yup.string().required("Required"),
    country_code: Yup.string().required("Required"),
  });
  const onSubmit = async (values) => {
    try {
      const response = await updateProfile({
        ...values,
        candidate_id: candidateId,
        uuid: profile?.uuid,
      });
      if (response.data.success) {
        dispatch(ShowAlert(response?.data?.message, "success"));
        handleClose();
        setProfileUpdate(true);
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
              Edit Profile
            </Typography>
            {/* <Typography className={styles.desc}>
              Get access to world-class employers
            </Typography> */}
            <Formik
              initialValues={initialValues}
              validationSchema={profileSchema}
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
                    <Grid
                      container
                      rowSpacing={1}
                      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    >
                      <Grid item xs={12} md={6}>
                        <TextInput
                          customClass={styles.boxForm}
                          type="text"
                          name="first_name"
                          label="First Name"
                          onChange={handleChange}
                          value={values.first_name}
                          sx={{ minWidth: "auto" }}
                        />
                        <TextInput
                          customClass={styles.boxForm}
                          type="text"
                          name="last_name"
                          label="Last Name"
                          onChange={handleChange}
                          value={values.last_name}
                          sx={{ minWidth: "auto" }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextInput
                          customClass={styles.boxForm}
                          type="text"
                          name="contact_number"
                          label="Contact Number"
                          onChange={handleChange}
                          value={values.contact_number}
                          sx={{ minWidth: "auto" }}
                        />
                      </Grid>
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
