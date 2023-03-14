import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ReactComponent as Cross } from "../../../../../assets/industries/model/x.svg";
import Modal from "@mui/material/Modal";
import TextInput from "../../../../common/TextInput";
import styles from "./styles.module.scss";
import { Button, Grid, CircularProgress } from "@mui/material";

import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { updateReferences } from "../../../../../api/candidate/candidate.class";
import PhoneFeild from "../../../../common/phoneFeild";
import moment from "moment";
import { ShowAlert } from "../../../../../store/actions/alertActions";
import Alerts from "../../../../common/Alert";

export default function CustomModal({
  openModal,
  setOpenModal,
  isUpdation,
  data,
}) {
  const handleClose = () => setOpenModal(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const candidateId = useSelector((state) => state.auth.results.candidate_id);
  const initialValues = {
    full_name: data ? data?.full_name : "",
    job_title: data ? data?.job_title : "",
    email: data ? data?.email : "",
    contact_number: data ? data?.contact_number : "",
    reference_relationship: data ? data?.reference_relationship : "",
    reference_company_name: data ? data?.reference_company_name : "",
    company_specialty_title: data ? data?.company_specialty_title : "",
    reference_signature: data ? data?.reference_signature : "",
    company_start_date: data
      ? moment(data?.company_start_date).format("YYYY-MM")
      : "",
    company_end_date: data
      ? moment(data?.company_end_date).format("YYYY-MM")
      : "",
  };
  const referenceSchema = Yup.object().shape({
    full_name: Yup.string().required("Required"),
    job_title: Yup.string().required("Required"),
    email: Yup.string().required("Required"),
    contact_number: Yup.string().required("Required"),
    reference_relationship: Yup.string().required("Required"),
    reference_company_name: Yup.string().required("Required"),
    // company_specialty_title: Yup.string().required("Required"),
    // reference_signature: Yup.string().required("Required"),
    company_start_date: Yup.string().required("Required"),
    company_end_date: Yup.string().required("Required"),
  });
  const [country_code, setCountryCode] = useState(data?.country_code || "");

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const payload = {
        candidate_references: {
          reference_0: {
            ...values,
            country_code: country_code.trim() === "" ? "AU" : country_code,
          },
        },
      };
      const response = await updateReferences({
        ...payload,
        candidate_id: candidateId,
        uuid: data?.uuid,
      });
      if (response.data.success) {
        setLoading(false);
        dispatch(ShowAlert(response?.data?.message, "success"));
        handleClose();
        isUpdation(true);
      }
    } catch (e) {
      console.log(e);
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
              Update Reference
            </Typography>
            <Formik
              initialValues={initialValues}
              validationSchema={referenceSchema}
              onSubmit={onSubmit}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleSubmit,
                isSubmitting,
                handleBlur,
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
                          name="full_name"
                          label="Full Name"
                          sx={{ minWidth: "auto" }}
                          value={values.full_name}
                          onChange={handleChange}
                        />
                        <TextInput
                          customClass={styles.boxForm}
                          type="text"
                          name="job_title"
                          label="Job Title"
                          sx={{ minWidth: "auto" }}
                          value={values.job_title}
                          onChange={handleChange}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextInput
                          customClass={styles.boxForm}
                          type="email"
                          name="email"
                          label="Email address"
                          sx={{ minWidth: "auto" }}
                          value={values.email}
                          onChange={handleChange}
                        />
                        <PhoneFeild
                          customClass={styles.input}
                          name="contact_number"
                          type="tel"
                          placeholder={"+614 234 678"}
                          label="Contact Number"
                          country="AU"
                          onCountryChange={(e) => setCountryCode(e)}
                          value={values.contact_number}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextInput
                          customClass={styles.boxForm}
                          type="text"
                          name="reference_relationship"
                          label="Relationship"
                          sx={{ minWidth: "auto" }}
                          value={values.reference_relationship}
                          onChange={handleChange}
                        />
                        <TextInput
                          customClass={styles.boxForm}
                          type="text"
                          name="reference_company_name"
                          label="Company Name"
                          sx={{ minWidth: "auto" }}
                          value={values.reference_company_name}
                          onChange={handleChange}
                        />
                      </Grid>
                      {/* <Grid item xs={12}>
                        <TextInput
                          customClass={styles.boxForm}
                          type="text"
                          name="company_specialty_title"
                          label="Company Specialty Title"
                          sx={{ minWidth: "auto" }}
                          value={values.company_specialty_title}
                          onChange={handleChange}
                        />
                        <TextInput
                          customClass={styles.boxForm}
                          type="text"
                          name="reference_signature"
                          label="Reference Signature"
                          sx={{ minWidth: "auto" }}
                          value={values.reference_signature}
                          onChange={handleChange}
                        />
                      </Grid> */}
                      <Grid item xs={12} md={6}>
                        <TextInput
                          customClass={styles.boxForm}
                          type="month"
                          sx={{ maxWidth: "initial" }}
                          label="Start Date*"
                          name="company_start_date"
                          onChange={handleChange}
                          value={values.company_start_date}
                        />
                        <span>
                          {errors.company_start_date &&
                            touched.company_start_date &&
                            errors.company_start_date}
                        </span>
                        <TextInput
                          customClass={styles.boxForm}
                          type="month"
                          sx={{ maxWidth: "initial" }}
                          label="End Date*"
                          name="company_end_date"
                          onChange={handleChange}
                          value={values.company_end_date}
                        />
                        <span>
                          {errors.company_end_date &&
                            touched.company_end_date &&
                            errors.company_end_date}
                        </span>
                      </Grid>
                    </Grid>
                    <Box className={`${styles.button} button-primary`}>
                      <Button className="secondary-btn" onClick={handleClose}>
                        Cancel
                      </Button>
                      <Button type="submit">
                        {" "}
                        {loading ? (
                          <CircularProgress style={{ color: "white" }} />
                        ) : (
                          "Save"
                        )}
                      </Button>
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
