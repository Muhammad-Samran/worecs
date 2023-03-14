import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ReactComponent as Cross } from "../../../../../assets/industries/model/x.svg";
import Modal from "@mui/material/Modal";
import TextInput from "../../../../common/TextInput";
import CustomSelect from "../../../../common/Select";
import styles from "./styles.module.scss";
import { Button, Grid } from "@mui/material";
import { Formik } from "formik";
import moment from "moment";
import * as Yup from "yup";

import { addEducation } from "../../../../../api/candidate/candidate.class";

import { useDispatch, useSelector } from "react-redux";
import { ShowAlert } from "../../../../../store/actions/alertActions";
import Alerts from "../../../../common/Alert";
import { REGEX } from "../../../../../customHooks/utils";

export default function CustomModal({ openModal, setOpenModal, isAddition }) {
  const handleClose = () => setOpenModal(false);
  const dispatch = useDispatch();
  const options = [
    { value: "Part Time", label: "Part Time" },
    { value: "Full Time", label: "Full Time" },
    { value: "Remote", label: "Remote" },
  ];
  const candidateId = useSelector((state) => state.auth.results.candidate_id);

  const initialValues = {
    degree_name: "",
    start_date: "",
    end_date: "",
    address: "",
    study_name: "",
    company_name: "",
    // description: "",
    // activities_societies: "",
    // grade: "",
    // Field of Study
    // institution/School name
  };

  const educationSchema = Yup.object().shape({
    degree_name: Yup.string().required("Required"),
    company_name: Yup.string().required("Required"),
    study_name: Yup.string().required("Required"),
    start_date: Yup.string().required("Required"),
    end_date: Yup.string().required("Required"),
    // activities_societies: Yup.string().required("Required"),
    // description: Yup.string().required("Required"),
    // grade: Yup.string().required("Required"),
  });

  const onSubmit = async (values) => {
    // console.log("onSubmit", values);
    try {
      const response = await addEducation({
        ...values,
        candidate_id: candidateId,
        start_date: `${moment(values.start_date).format("DD-MM-yyyy")}`,
        end_date: `${moment(values.end_date).format("DD-MM-yyyy")}`,
      });
      if (response.data.success) {
        dispatch(ShowAlert(response?.data?.message, "success"));
        handleClose();
        isAddition((old) => old + 1);
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
              Add Education
            </Typography>
            <Formik
              initialValues={initialValues}
              validationSchema={educationSchema}
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
                      <Grid item xs={12}>
                        <TextInput
                          customClass={styles.boxForm}
                          type="text"
                          name="company_name"
                          label="Education Institution"
                          onChange={handleChange}
                          value={values.company_name}
                          sx={{ minWidth: "auto" }}
                        />
                        <span className="error-inputfield">
                          {errors.company_name &&
                            touched.company_name &&
                            errors.company_name}
                        </span>

                        <TextInput
                          customClass={styles.boxForm}
                          type="text"
                          name="degree_name"
                          label="Qualification Name"
                          onChange={handleChange}
                          value={values.degree_name}
                          sx={{ minWidth: "auto" }}
                        />
                        <span className="error-inputfield">
                          {errors.degree_name &&
                            touched.degree_name &&
                            errors.degree_name}
                        </span>
                        <TextInput
                          customClass={styles.boxForm}
                          type="text"
                          name="study_name"
                          label="Field of Study"
                          onChange={handleChange}
                          value={values.study_name}
                          sx={{ minWidth: "auto" }}
                        />
                        <span className="error-inputfield">
                          {errors.study_name &&
                            touched.study_name &&
                            errors.study_name}
                        </span>
                        <TextInput
                          customClass={styles.boxForm}
                          type="text"
                          name="address"
                          label="Institution Address"
                          onChange={handleChange}
                          value={values.address}
                          sx={{ minWidth: "auto" }}
                        />
                        <span className="error-inputfield">
                          {errors.address && touched.address && errors.address}
                        </span>
                      </Grid>
                      <Grid item xs={6} md={6}>
                        <TextInput
                          customClass={styles.boxForm}
                          type="date"
                          sx={{ maxWidth: "initial" }}
                          label="Start Date*"
                          name="start_date"
                          onChange={handleChange}
                          value={values.start_date}
                        />
                        <span className="error-inputfield">
                          {errors.start_date &&
                            touched.start_date &&
                            errors.start_date}
                        </span>
                      </Grid>
                      <Grid item xs={6} md={6}>
                        <TextInput
                          customClass={styles.boxForm}
                          type="date"
                          sx={{ maxWidth: "initial" }}
                          label="End Date*"
                          name="end_date"
                          onChange={handleChange}
                          value={values.end_date}
                        />
                        <span className="error-inputfield">
                          {errors.end_date &&
                            touched.end_date &&
                            errors.end_date}
                        </span>
                      </Grid>
                      {/* <Grid item xs={12}>
                        <TextInput
                          customClass={styles.boxForm}
                          type="number"
                          min="0"
                          onKeyPress={(e) => {
                            if (
                              e.code === "Minus" ||
                              e.code === "NumpadSubtract" ||
                              e.code === "Comma" ||
                              e.code === "NumpadAdd" ||
                              e.code === "Period" ||
                              e.key === "e" ||
                              e.key === "E"
                            ) {
                              e.preventDefault();
                            }
                          }}
                          name="grade"
                          label="Grade*"
                          onChange={handleChange}
                          value={values.grade}
                          // placeholder="4.0"
                          sx={{ minWidth: "auto" }}
                        />
                        <span className="error-inputfield">
                          {errors.grade && touched.grade && errors.grade}
                        </span>
                        <TextInput
                          customClass={styles.boxForm}
                          type="text"
                          name="activities_societies"
                          onChange={handleChange}
                          value={values.activities_societies}
                          label="Activities & Societies"
                          textarea={true}
                          sx={{ minWidth: "auto" }}
                        />
                        <span className="error-inputfield">
                          {errors.activities_societies &&
                            touched.activities_societies &&
                            errors.activities_societies}
                        </span>
                        <TextInput
                          customClass={styles.boxForm}
                          type="text"
                          name="description"
                          label="Description"
                          onChange={handleChange}
                          value={values.description}
                          textarea={true}
                          sx={{ minWidth: "auto" }}
                        />
                        <span className="error-inputfield">
                          {errors.description &&
                            touched.description &&
                            errors.description}
                        </span>
                      </Grid> */}
                    </Grid>
                    <Box className={`${styles.button} button-primary`}>
                      <Button className="secondary-btn" onClick={handleClose}>
                        Cancel
                      </Button>
                      <Button onClick={handleSubmit}>Save</Button>
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
