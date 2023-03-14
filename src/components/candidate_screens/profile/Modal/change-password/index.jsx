import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextInput from "../../../../common/TextInput";
import { ReactComponent as Cross } from "../../../../../assets/industries/model/x.svg";
import Modal from "@mui/material/Modal";
import styles from "./styles.module.scss";
import { Button } from "@mui/material";

import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../../../../api/candidate/candidate.class";
import { ShowAlert } from "../../../../../store/actions/alertActions";
import Alerts from "../../../../common/Alert";

export default function CustomModal({ openModal, setOpenModal }) {
  const handleClose = () => setOpenModal(false);
  const dispatch = useDispatch();
  const candidateId = useSelector((state) => state.auth.results.candidate_id);

  const initialValues = {
    current_password: "",
    new_password: "",
    confirm_password: "",
  };

  const changePasswordSchema = Yup.object().shape({
    current_password: Yup.string().required("Required"),
    new_password: Yup.string().required("Required"),
    confirm_password: Yup.string().required("Required"),
  });
  const onSubmit = async (values) => {
    // console.log(values);
    try {
      const response = await changePassword({
        ...values,
        candidate_id: candidateId,
      });
      if (response.data.success) {
        dispatch(ShowAlert(response?.data?.message, "success"));
        handleClose();
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
              Change Password
            </Typography>

            <Formik
              initialValues={initialValues}
              validationSchema={changePasswordSchema}
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
                    <TextInput
                      customClass={styles.formBox}
                      type="password"
                      name="current_password"
                      placeholder="Password"
                      onChange={handleChange}
                      value={values.current_password}
                    />
                    <TextInput
                      customClass={styles.formBox}
                      type="password"
                      name="new_password"
                      placeholder="New Password"
                      onChange={handleChange}
                      value={values.new_password}
                    />
                    <TextInput
                      customClass={styles.formBox}
                      type="password"
                      name="confirm_password"
                      placeholder="Confirm New Password"
                      onChange={handleChange}
                      value={values.confirm_password}
                    />
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
